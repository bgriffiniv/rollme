import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkedinAuthService {
redirectURL = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78mvuuw5w4j74y&redirect_uri=http://localhost:8100/home&state=arigatou&scope=r_emailaddress';


  constructor(private httpClient: HttpClient, private afAuth: AngularFireAuth, private router: Router) {

  }

  getRedirectURL() {
    return this.httpClient.get(this.redirectURL);
  }

}
