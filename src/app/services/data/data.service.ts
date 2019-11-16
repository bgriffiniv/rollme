import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  users:any;

  constructor() {
    console.log("DataService constructor")
    this.users = {
      bgriffiniv: {
          name: "Burnest Griffin IV",
          company: "House of Ease",
          role: "Ninjaneer",
          email: "bgriffiniv@gmail.com",
          contacts: {
            sbass: true,
            bstuart: true
          }
      },
      sbass: {
          name: "Sam Bass",
          company: "IdeaLogic",
          role: "Artist",
          email: "",
          contacts: {}
      },
      mbanks: {
          name: "Mario Banks",
          company: "IdeaLogic",
          role: "Developer",
          email: "",
          contacts: {}
      },
      gsupris: {
          name: "Glenn Supris",
          company: "Mitre",
          role: "Engineer",
          email: "",
          contacts: {}
      },
      jjones: {
          name: "Justin Jones",
          company: "House of Ease",
          role: "Designer",
          email: "",
          contacts: {}
      },
      sshird: {
          name: "Shannon Shird",
          company: "House of Ease",
          role: "Creator",
          email: "",
          contacts: {}
      },
      bstuart: {
          name: "Brandon Stuart",
          company: "IdeaLogic",
          role: "Founder",
          email: "",
          contacts: {
            bgriffin: true,
            gsupris: true,
            mbanks: true
          }
      }
    };

    console.log("users:", this.users);
  }

  setUser(id: string, updated) {
    console.log("set user:",id,updated);
    // avoid updating contacts
    delete updated.contacts;
    let user = this.users[id];
    for (let key in updated) {
        user[key] = updated[key];
    }
  }

  getUser(id: string) {
    console.log("get user:",id);
    if (!this.users[id]) {
      console.log("user not found");
    }
    return this.users[id];
  }

  setContact(id: string, index: string, isContact: boolean) {
    console.log("set contact:",id,index,isContact);
    let user = this.users[id];
    if (!isContact) {
      delete user.contacts[index];
    } else {
      user.contacts[index] = true;
    }
  }

  isContact(id: string, index: string) {
    console.log("is contact? ",id,index);
    let user = this.users[id];
    return user.contacts[index];
  }
}
