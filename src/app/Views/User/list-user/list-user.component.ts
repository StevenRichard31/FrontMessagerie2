import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../Models/User.model';
import {Subscription} from 'rxjs';
import {UserService} from '../../../Services/user.service';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit, OnDestroy {

    users: User[];
    userSubscription: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
      this.userSubscription = this.userService.userSubject.subscribe(
          (users: User[]) => {
              this.users = users;
          }
      );
      this.userService.getAllUsers();
  }

  ngOnDestroy(): void {
      this.userSubscription.unsubscribe();
  }

}
