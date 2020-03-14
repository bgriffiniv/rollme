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

redirectURL = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78mvuuw5w4j74y&redirect_uri=http://localhost:8100/home&state=arigatou&scope=scope=r_liteprofile%20r_emailaddress%20w_member_social';

  constructor(private httpClient: HttpClient, private afAuth: AngularFireAuth, private router: Router) {

  }

  // This sample code will make a request to LinkedIn's API to retrieve and print out some
  // basic profile information for the user whose access token you provide.

  https = require('https');

  // Replace with access token for the r_liteprofile permission
  accessToken = 'AQXgoa4_UMW_LUvIcwCKkeaH8tA-ARQPnvwes7OF22A3MYbccTPEiLz6deJn0euCK8url6ZZZJ0_qkuMPPdGpxg5SqsmCJljy00j9nlroqpHT3lKY0ajom8go2Xh4LauKILp5RUGK5vvqKYtgciP_Ee4Ot5zO3G880XQY7pUuZbjvElqwkXwDzjeUD3L3kfIsXRLpwPzTZmhapOuaxj7E6GCt-kA1ci41R6-Saua5JN_ML9rATNnmH17C6SMA9hGi7_Tl6BYNWauZasgkAZ7r8cXzjebEXdzJHaWwvLI6RU2AXaQ80MbnHj3O4S1OfhPSqaOClWKMxYDhSYyYpcz8gCEdpgf1w';
  options = {
    host: 'api.linkedin.com',
    path: '/v2/me',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${this.accessToken}`,]
      'cache-control': 'no-cache',
      'X-Restli-Protocol-Version': '2.0.0'
    }
  };

  getRedirectURL() {
      return this.httpClient.get(this.redirectURL);
  }

  profileRequest = this.https.request(this.options, function(res) {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      const profileData = JSON.parse(data);
      console.log(JSON.stringify([this.profileData, 0, 2]));
    });
    this.profileRequest.end();
  });

}
