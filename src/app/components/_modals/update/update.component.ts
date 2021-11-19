import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-modal-update',
  templateUrl: './update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalUpdateComponent implements OnInit {

  @Input('data')
  public data: User | null = null;
  @Input('dataId')
  public dataId: string | null = null;
  public loading = false;

  constructor(
    private ngbActiveModal: NgbActiveModal,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
  }

  public dismiss() {
    this.ngbActiveModal.dismiss();
  }

  public submit() {
    if (this.dataId !== null && this.data != null) {
      this.loading = true;
      this.api.updateUser(this.dataId, this.data).pipe(
        tap((data) => this.ngbActiveModal.close(data)),
        finalize(() => this.loading = false),
      ).subscribe();
    }
  }

}
