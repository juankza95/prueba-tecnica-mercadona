import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { debounceTime, finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { ModalDeleteComponent } from '../_modals/delete/delete.component';
import { ModalUpdateComponent } from '../_modals/update/update.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnDestroy, OnInit {

  private destroy$ = new Subject<void>();

  public data: User | null = null;
  public dataId: string | null = null;
  public forceRefresh = new BehaviorSubject<MouseEvent | undefined>(undefined);
  public loading = false;

  constructor(
    private aRoute: ActivatedRoute,
    private ngbModal: NgbModal,
    private api: ApiService,
  ) { }

  private refresh({ id }: Params) {
    this.dataId = id;
    this.loading = true;
    return this.api.readUser(id).pipe(
      this.api.catchErrorAndReturn<User | null>(null),
      tap((data) => this.data = data),
      finalize(() => this.loading = false),
    );
  }

  ngOnDestroy() {
    this.ngbModal.dismissAll();
    this.destroy$.next();
  }

  ngOnInit(): void {
    combineLatest([this.aRoute.params, this.forceRefresh]).pipe(
      takeUntil(this.destroy$),
      debounceTime(60),
      map(([params]) => params),
      switchMap((params) => this.refresh(params)),
    ).subscribe();
  }

  public isObject(value: any) {
    return typeof value === 'object';
  }

  public async showModalUpdate() {
    const modalRef = this.ngbModal.open(ModalUpdateComponent, { backdrop: 'static', ariaLabelledBy: 'modal-update-title' });
    modalRef.componentInstance.data = { ...this.data };
    modalRef.componentInstance.dataId = this.dataId;

    try {
      this.data = await modalRef.result;
    } catch (e) {
      // dismiss
    }
  }

  public async showModalDelete() {
    const modalRef = this.ngbModal.open(ModalDeleteComponent, { backdrop: 'static', ariaLabelledBy: 'modal-delete-title' });
    modalRef.componentInstance.dataId = this.dataId;
  }

}
