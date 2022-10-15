import { Injectable } from '@angular/core';

import { Observable } from "rxjs";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  apiUrlBase: string = environment.userBaseUrl;
  userMapping : string[] = ["SALES_CASHIER", "SALES_ADMIN", "SALES_SELLER"];

  constructor(private http: HttpClient, private cookies: CookieService, 
    private router: Router) { }

  postLogin(user: string, pass: string): Observable<any> {
    const comando = {
          "userName": user,
          "password": pass
    }
    const url = this.apiUrlBase + "/login";
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(comando);

    return this.http.post(url, body, { 'headers': headers })
  }

  getUser(id: string): Observable<any> {
    return this.http.get(this.apiUrlBase + "/" + id);
  }

  /* TOKEN SERVICES */
  setToken(token: string, userName: string, rol: string) {
    this.cookies.set("token", token);
    this.cookies.set("userName", userName);
    this.cookies.set("userRol", rol);
  }

  getToken() {
    return this.cookies.get("token");
  }

  getRol() {
    return this.cookies.get("userRol");
  }

  getUserName() {
    return this.cookies.get("userName");
  }

  /* AUTHENTICATION SERVICES */
  authenticateUser(view: string) {
    let token = this.getToken();
    if(token != "" && token != null) {
      let rol = this.getRol();
      let viewRol = view.concat('_').concat(rol);
      if(this.userMapping.includes(viewRol)) {
        return true;
      }
      return false;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
