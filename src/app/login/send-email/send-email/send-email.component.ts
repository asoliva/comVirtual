import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from 'firebase';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css'],
  providers: [AuthService]
})
export class SendEmailComponent implements OnInit {
  public user$: Observable<User> = this.authService.afAuth.user;
  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
  onSendEmail(): void {
    this.authService.sendVerificationEmail();
  }
}
