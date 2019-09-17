import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  user:any;

  constructor() {
    console.log("DataService constructor")
    this.user = {
      name: "Burnest Griffin IV",
      company: "House of Ease",
      role: "Ninjaneer",
      email: "bgriffiniv@gmail.com",
      contacts: [
        {
          name: "Sam",
          company: "IdeaLogic",
          role: "Artist",
          email: ""
        },{
          name: "Mario Banks",
          company: "IdeaLogic",
          role: "Developer",
          email: ""
        },{
          name: "Glenn Supris",
          company: "Mitre",
          role: "Engineer",
          email: ""
        },{
          name: "Justin Jones",
          company: "House of Ease",
          role: "Designer",
          email: ""
        },{
          name: "Shannon Shird",
          company: "House of Ease",
          role: "Creator",
          email: ""
        },{
          name: "Brandon Stuart",
          company: "IdeaLogic",
          role: "Founder",
          email: ""
        }
      ]
    };

    console.log("user:", this.user);
  }

  setUser(id: string, updated) {
    console.log("set user:",id,updated);
    this.user.name = updated.name;
    this.user.company = updated.company;
    this.user.role = updated.role;
    this.user.email = updated.email;
  }

  getUser(id: string) {
    console.log("get user:",this.user);
    return this.user;
  }

  setContact(id: string, index: number, updated) {
    console.log("set contact:",id,index,updated);
    this.user.contacts[index] = updated;
  }

  deleteContact(id: string, index: number) {
    console.log("delete contact:",id,index);
    this.user.contacts.splice(index,1);
  }
}
