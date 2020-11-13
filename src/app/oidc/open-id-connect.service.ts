import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { User, UserManager } from 'oidc-client';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenIdConnectService {
  private userManager = new UserManager(environment.openIdConnectSettings);
  private currentUser: User;

  // 判断用户是否登录
  get userAvailable(): boolean {
    return !!this.currentUser;
  }

  get user(): User {
    return this.currentUser;
  }

  // 发布订阅
  userLoaded$ = new ReplaySubject<boolean>(1);

  constructor() {
    // 清除上次访问的缓存信息
    this.userManager.clearStaleState();

    this.userManager
      .getUser()
      .then(user => {
        if (user) {
          this.currentUser = user;
          this.userLoaded$.next(true);
        } else {
          this.currentUser = null;
          this.userLoaded$.next(false);
      }
    }).then(err => {
        this.currentUser = null;
        this.userLoaded$.next(false);
    });

    this.userManager.events.addUserLoaded(user => {
      console.log('user loaded:', user);
      this.currentUser = user;
      this.userLoaded$.next(true);
    });

    this.userManager.events.addUserUnloaded(() => {
      console.log('user unloaded');
      this.currentUser = null;
      this.userLoaded$.next(false);
    });
  }

  triggerSignIn() {
    this.userManager.signinRedirect().then(() => {
       console.log('triggerSignIn');
    });
  }

  handleCallback() {
    this.userManager.signinRedirectCallback().then(user => {
      this.currentUser = user;
      console.log('handleCallback');
    });
  }

  // 自动刷新回掉函数
  handleSilentCallback() {
    this.userManager.signinSilentCallback().then(user => {
      this.currentUser = user;
      console.log('handleSilentCallback');
    });
  }

  // 登出回掉
  triggerSignOut() {
    this.userManager.signoutRedirect().then(res => {
      console.log('triggerSignOut');
    });
  }
}
