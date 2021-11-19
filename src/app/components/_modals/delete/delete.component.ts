import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './delete.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDeleteComponent implements OnInit {

  @Input('dataId')
  public dataId: string | null = null;
  public loading = false;

  constructor(
    private router: Router,
    private ngbActiveModal: NgbActiveModal,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
  }

  public dismiss() {
    this.ngbActiveModal.dismiss();
  }

  public submit() {
    if (this.dataId !== null) {
      this.loading = true;
      this.api.deleteUser(this.dataId).pipe(
        tap(() => {
          this.router.navigate(['/', 'list']);
          this.ngbActiveModal.close();
        }),
        finalize(() => this.loading = false),
      ).subscribe();
    }
  }

}
