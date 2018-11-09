import { LinkedIn, LinkedInLoginScopes } from '@ionic-native/linkedin';
import {Events} from 'ionic-angular'
import { Directive, Component, NgModule } from '../../../node_modules/@angular/core';

 @NgModule({
    providers: [LinkedIn]
  })

export class LinkedInManager {
    private linkedinCtrl;
    private connections;

    constructor(private linkedin: LinkedIn, private event:Events) { 
        this.event.subscribe('signIn_LinkedIn',() => {
            console.log("Signing In...")
            this.login();
        })
    }

    hasActiveSession() {
        return this.linkedin.hasActiveSession();
    }

    public login(){
        const scopes:LinkedInLoginScopes[] = ['r_basicprofile', 'r_emailaddress', 'rw_company_admin', 'w_share'];
        this.linkedin.login(scopes, true)
        .then(() => console.log('[LinkedIn]Logged In'))
        .catch(e => console.log('Error Logging In', e));
        
    }

    getConnections(){
        
        this.linkedin.getRequest('people/~')
        .then(res => {this.connections = res; this.debugLog("Connections : " + res)})
        .catch(e => this.debugLog('Error Retreiving Connections', e));
        
    }

    share(shareData){
        
        this.linkedin.postRequest('~/shares', shareData)
            .then(res => this.debugLog("Shared Content: " + res))
            .catch(e => this.debugLog("Error Sharing",e));
    
    }

    debugLog(message, exception = ""){
        const output = "[ LinkedIn ] " + message;
        console.log(exception ? output + " " + exception : output);
    }
}