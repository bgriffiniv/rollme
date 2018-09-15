import { LinkedIn } from '@ionic-native/linkedin';

const scopes = ['r_basicprofile', 'r_emailaddress', 'w_share'];

export class LinkedInManager {
    private linkedinCtrl;
    private connections;

    constructor(private linkedin: LinkedIn) { 
        this.linkedinCtrl = linkedin;
    }

    hasActiveSession() {
        if(this.linkedinCtrl)
            return this.linkedinCtrl.hasActiveSession();
    }

    login(){
        if(this.linkedinCtrl) {
            this.linkedinCtrl.login(scopes, true)
            .then(() => console.log('[LinkedIn]Logged In'))
            .catch(e => console.log('Error Logging In', e));
        }
    }

    getConnections(){
        if(this.linkedinCtrl) {
            this.linkedinCtrl.getRequest('people/~')
            .then(res => {this.connections = res; this.debugLog("Connections : " + res)})
            .catch(e => this.debugLog('Error Retreiving Connections', e));
        }
    }

    share(shareData){
        if(this.linkedinCtrl) {
        this.linkedinCtrl.postRequest('~/shares', shareData)
            .then(res => this.debugLog("Shared Content: " + res))
            .catch(e => this.debugLog("Error Sharing",e));
        }
    }

    debugLog(message, exception = ""){
        const output = "[ LinkedIn ] " + message;
        console.log(exception ? output + " " + exception : output);
    }
}