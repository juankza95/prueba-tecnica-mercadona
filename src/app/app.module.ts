import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsComponent } from './components/details/details.component';
import { ListComponent } from './components/list/list.component';
import { ModalCreateComponent } from './components/_modals/create/create.component';
import { ModalDeleteComponent } from './components/_modals/delete/delete.component';
import { ModalUpdateComponent } from './components/_modals/update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalCreateComponent,
    ModalDeleteComponent,
    ModalUpdateComponent,
    DetailsComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
