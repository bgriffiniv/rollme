import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  user:any;

  constructor() {
    console.log("DataService constructor")
    this.user = {
      data: [
        {key: "name", value: "Burnest Griffin IV"},
        {key: "company", value: "House of Ease"},
        {key: "role", value: "Ninjaneer"},
        {key: "email", value: "bgriffiniv@gmail.com"},
      ],
      contacts: [
        {
          data: [
            {key: "name", value: "Sam Bass"},
            {key: "company", value: "IdeaLogic"},
            {key: "role", value: "Artist"},
            {key: "email", value: ""}
          ]
        },{
          data: [
            {key: "name", value: "Mario Banks"},
            {key: "company", value: "IdeaLogic"},
            {key: "role", value: "Developer"},
            {key: "email", value: ""}
          ]
        },{
          data: [
            {key: "name", value: "Glenn Supris"},
            {key: "company", value: "Mitre"},
            {key: "role", value: "Engineer"},
            {key: "email", value: ""}
          ]
        },{
          data: [
            {key: "name", value: "Justin Jones"},
            {key: "company", value: "House of Ease"},
            {key: "role", value: "Designer"},
            {key: "email", value: ""}
          ]
        },{
          data: [
            {key: "name", value: "Shannon Shird"},
            {key: "company", value: "House of Ease"},
            {key: "role", value: "Creator"},
            {key: "email", value: ""}
          ]
        },{
          data: [
            {key: "name", value: "Brandon Stuart"},
            {key: "company", value: "IdeaLogic"},
            {key: "role", value: "Founder"},
            {key: "email", value: ""}
          ]
        }
      ]
    };

    console.log("user:", this.user);
  }

  setUser(id: string, updated) {
    console.log("set user:",id,updated);
    this.user.data = updated;
  }

  getUser(id: string) {
    console.log("get user:",this.user);
    return this.user;
  }

  setContact(id: string, index: number, updated) {
    console.log("set contact:",id,index,updated);
    this.user.contacts[index].data = updated;
  }

  deleteContact(id: string, index: number) {
    console.log("delete contact:",id,index);
    this.user.contacts.splice(index,1);
  }
}
