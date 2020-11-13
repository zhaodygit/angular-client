import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OpenIdConnectService } from '../open-id-connect.service';

@Component({
  selector: 'ac-signin-oidc',
  templateUrl: './signin-oidc.component.html',
  styleUrls: ['./signin-oidc.component.scss']
})
export class SigninOidcComponent implements OnInit {

  constructor(private oidc: OpenIdConnectService, private router: Router) { }

  ngOnInit() {
    this.oidc.userLoaded$.subscribe(userLoaded => {
      if (userLoaded) {
        this.router.navigate(['./dashboard']);
      } else {
        console.log('err login');
      }
    });

    this.oidc.handleCallback();
  }

}
