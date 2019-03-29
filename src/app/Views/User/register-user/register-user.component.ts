import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../Services/user.service';
import {Router} from '@angular/router';
import {ProcessHTTPMsgService} from '../../../Services/process-httpmsg.service';




@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  csrf;
  hide = true;
  userForm: FormGroup;
  // Errors HTTP REQUEST Catch
  errors;
  // Form object
  userName =  new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private processHttpMsgService: ProcessHTTPMsgService) { }

  ngOnInit() {
    // get CSRF Token
       this.userService.addUserGET()
          .subscribe(
              (response) => {
                  const res = response as {csrfToken: string};
                  this.csrf = res.csrfToken;
              },
              (error) => {console.log(error); this.processHttpMsgService.handleError(error); }
          );
    // création du formulaire avec validateur
       this.initForm();
  }

  // function créer formulaire
  initForm() {
    this.userForm = this.formBuilder.group({
        userName :  this.userName,
        email : this.email,
        password: this.password,
    });
  }

  onSubmitForm() {
    // prend les valeurs du formulaire
    const newUser = this.userService.createUser(this.userForm.value);
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    this.userService.addUserPOST(newUser, token)
    .subscribe(
        () => {
            // redirection vers la liste des "users"
            this.router.navigate(['user/list']);
        },
        (error) => {
            console.log(error);
            this.errors = this.processHttpMsgService.handleError(error);
        }
    );
  }

  // ERRORS MESSAGES
  getErrorMessage(field: string) {
      if (field === 'email') {
          return this.email.hasError('required') ? 'You must enter a Email' :
              this.email.hasError('email') ? 'Email non valid' :
                  '';
      } else if (field === 'userName') {
          return this.userName.hasError('required') ? 'You must enter a User Name' :
              this.userName.hasError('minlength') ? 'Le pseudo doit être composé de 5 caractères minimum ' :
              this.userName.hasError('maxlength') ? 'Le pseudo ne doit pas dépasser 10 caractères ' :
              '';
      } else if (field === 'password') {
          return this.password.hasError('required') ? 'You must enter a Password' :
              this.password.hasError('minlength') ? 'Le mot de passe doit être composé de 8 caractères minimum ' :
                  '';
      }
  }

}
