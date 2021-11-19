import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-modal-create',
  templateUrl: './create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalCreateComponent implements OnInit {

  public data: Partial<User> = {};
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
    this.loading = true;
    this.api.createUser(this.data).pipe(
      tap((data) => this.ngbActiveModal.close(data)),
      finalize(() => this.loading = false),
    ).subscribe();
  }

}
