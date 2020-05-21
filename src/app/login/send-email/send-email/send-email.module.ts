import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendEmailRoutingModule } from './send-email-routing.module';
import { SendEmailComponent } from './send-email.component';


@NgModule({
  declarations: [SendEmailComponent],
  imports: [
    CommonModule,
    SendEmailRoutingModule
  ]
})
export class SendEmailModule { }
