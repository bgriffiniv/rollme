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
      contacts: {
        "justin-jones": {
          name: "Justin Jones",
          company: "House of Ease",
          role: "Designer"
        },
        "shannon-shird": {
          name: "Shannon Shird",
          company: "House of Ease",
          role: "Creator"
        },
        "brandon-stuart": {
          name: "Brandon Stuart",
          company: "IdeaLogic",
          role: "Founder"
        }
      }
    };

    console.log("user:", this.user);
  }

  setUser(id: string, updated) {
    console.log("saving user",id,updated);
    this.user = {
      name: updated.name,
      company: updated.company,
      role: updated.role
    }
  }

  getUser(id: string) {
    return this.user;
  }
}
