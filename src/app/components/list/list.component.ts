import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { ModalCreateComponent } from '../_modals/create/create.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnDestroy, OnInit {

  private destroy$ = new Subject<void>();

  public datalist: User[] = [];
  public forceRefresh = new BehaviorSubject<MouseEvent | undefined>(undefined);
  public loading = false;
  public query$ = new BehaviorSubject<string>('');

  constructor(
    private aRoute: ActivatedRoute,
    private router: Router,
    private ngbModal: NgbModal,
    private api: ApiService,
  ) { }

  private refresh(queryParams: Params) {
    this.loading = true;
    const query: string | undefined = queryParams.query?.toLowerCase();
    return this.api.listUsers().pipe(
      this.api.catchErrorAndReturn<User[]>([]),
      map((data) => query === undefined ? data : data.filter(
        (u) => u.username.toLowerCase().includes(query) || u.email.toLowerCase().includes(query)
      )),
      tap((data) => this.datalist = data),
      finalize(() => this.loading = false),
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  ngOnInit(): void {
    const { query } = this.aRoute.snapshot.queryParams;
    if (query) {
      this.query$.next(query);
    }

    combineLatest([this.aRoute.queryParams, this.forceRefresh]).pipe(
      takeUntil(this.destroy$),
      debounceTime(60),
      map(([queryParams]) => queryParams),
      switchMap((queryParams) => this.refresh(queryParams)),
    ).subscribe();

    this.query$.pipe(
      takeUntil(this.destroy$),
      map((query) => query.trim()),
      distinctUntilChanged(),
      debounceTime(500),
      map((query) => query !== '' ? query : null),
      tap((query) => this.router.navigate([], { queryParams: { query }, relativeTo: this.aRoute })),
    ).subscribe();
  }

  public async showModalCreate() {
    const modalRef = this.ngbModal.open(ModalCreateComponent, { backdrop: 'static', ariaLabelledBy: 'modal-create-title' });

    try {
      const data: User = await modalRef.result;
      this.datalist = [...this.datalist, data];
    } catch (e) {
      // dismiss
    }
  }

}
