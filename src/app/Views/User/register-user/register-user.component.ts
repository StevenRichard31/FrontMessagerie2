import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../Services/user.service';
import {Router} from '@angular/router';
import {ProcessHTTPMsgService} from '../../../Services/process-httpmsg.service';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  userForm: FormGroup;
  protected error = null;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private processHttpMsgService: ProcessHTTPMsgService) { }

  ngOnInit() {
    // création du formulaire avec validateur
    this.initForm();
  }

  // function créer formulaire
  initForm() {
    this.userForm = this.formBuilder.group({
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    });
  }

  onSubmitForm() {
    // prend les valeurs du formulaire
    const newUser = this.userService.createUser(this.userForm.value);
    this.userService.addUser2(newUser).subscribe(
        () => {
            console.log('Enregistrement terminé !');
            // redirection vers la liste des "users"
            this.router.navigate(['user/list']);
        },
        (error) => {
            this.error = this.processHttpMsgService.handleError(error);
            console.log(this.error);
        }
    );
  }

}
