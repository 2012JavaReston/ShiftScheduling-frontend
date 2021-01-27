import { Availability } from './../models/availability';
import { User } from './../models/user';
import { UserApiService } from './rest/user-api.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiSetup: boolean = true;
  isSuccess: boolean = true;

  loggedInUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    private userApi: UserApiService,
    private router: Router
  ) { }

  /**
   * @returns boolean
   *  checks if user logged in is a manager
   *  used for route guards
   */
  public loggedInIsManager(): boolean {
    let user: User = JSON.parse(atob(localStorage.getItem("user")));
    if (user) {
      this.loggedInUser.next(user);
    }
    return this.loggedInUser.value.isManager;
  }

  /**
   * @param User
   *  sets logged in user
   *  Used in login/register methods
   */
  private setLoggedInUser(user: User) {
    localStorage.setItem("user", btoa(JSON.stringify(user)));
    this.loggedInUser.next(user);
    let navigateTo = 'employee';
    if (user.isManager) {
      navigateTo = 'manager';
    }
    this.router.navigate([navigateTo]);
  }

  /**
   * @param User
   *  must have username and password set on user argument
   *
   * @returns string
   *  Message - successfuly logged in or
   *            reject with error message
   */
  public login(user: User): Promise<string> {
    return new Promise((resolve, reject) => {


      // While we don't have a login endpoint...
      if (!this.apiSetup && this.isSuccess) {
        user.id = 1;
        user.isManager = false;
        user.phone = 5551234567;
        user.firstName = 'Test User';
        user.lastName = 'Test User';
        this.setLoggedInUser(user);
        return resolve('Successfully logged in!');
      }
      if(!this.apiSetup && !this.isSuccess) {
        return reject('Email/password is incorrect');
      }

      if (!user.email || !user.password) {
        return reject("Email and Passord are required.")
      }
      this.userApi.login(user)
      .then(u => {
        if(u.password == user.password) {
          resolve("Successfully logged in!");
          this.setLoggedInUser(u);
        } else {
          reject("Email/Password is incorrect")
        }
      })
      .catch(error => {
        console.log(error);
        reject("There was a problem logging in");
      })
    })
  }

  /**
   * Logs out the logged in user
   * returns you to the landing page
   */
  public logout(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.userApi.logout(this.loggedInUser.value)
      .then(res => {
        localStorage.clear();
        this.loggedInUser.next(null);
        this.router.navigate(['']);
        resolve(res);
      }).catch(error => {
        reject("There was an error logging out.")
      });

    })
  }

  register(user: User): Promise<string> {
    return new Promise((resolve, reject) => {

      let availability = new Availability();
      availability.id = 0;
      availability.sunday = false;
      availability.monday = false;
      availability.thursday = false;
      availability.wednesday = false;
      availability.thursday = false;
      availability.friday = false;
      availability.saturday = false;
      // user.availability = availability;

      if(!this.apiSetup && this.isSuccess) {
        user.id = 9001;
        user.isManager = false;
        user.firstName= 'Calvin';
        user.lastName= 'Mak';
        user.email= 'calvin@mail.com';
        user.password= null;
        user.phone= 15;
        let availability = new Availability();
        availability.id = 50;

        this.setLoggedInUser(user);
        return resolve("Successfully created your Account!");
      }
      if(!this.apiSetup && !this.isSuccess) {
        return reject("There was an error creating your user");
      }


      this.userApi.post(user)
      .then(u => {
        resolve("Successfully created your Account!");
        // this.setLoggedInUser(u);
      })
      .catch(error => {
        console.log(error);
        reject("There was an error creating your account.")
      })
    })
  }

}
