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

  constructor(private httpClient: HttpClient, private afAuth: AngularFireAuth, private router: Router) {
    // This sample code will make a request to LinkedIn's API to retrieve and print out some
    // basic profile information for the user whose access token you provide.

    const https = require('https');

    // Replace with access token for the r_liteprofile permission
    const accessToken = 'YOUR_ACCESS_TOKEN';
    const options = {
      host: 'api.linkedin.com',
      path: '/v2/me',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'cache-control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    };

    const profileRequest = https.request(options, function(res) {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const profileData = JSON.parse(data);
        console.log(JSON.stringify(profileData, 0, 2));
      });
    });
    profileRequest.end();

    redirectURL = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78mvuuw5w4j74y&redirect_uri=http://localhost:8100/home&state=arigatou&scope=r_emailaddress';
  }

  getRedirectURL() {
    return this.http.get(this.redirectURL);
  }

}
