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

  hide = true;
  userForm: FormGroup;
  // Errors HTTP REQUEST Catch
  errors;
  // Form object
  userName =  new FormControl('', [Validators.required, Validators.minLength(5)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);

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
        userName :  this.userName,
        email : this.email,
        password: this.password
    });
  }

  onSubmitForm() {
    // prend les valeurs du formulaire
    const newUser = this.userService.createUser(this.userForm.value);
    this.userService.addUser2(newUser)
        .subscribe(
        () => {
            console.log('Enregistrement terminé !');
            // redirection vers la liste des "users"
            this.router.navigate(['user/list']);
        },
        (error) => {
            this.errors = this.processHttpMsgService.handleError(error);
            console.log(this.errors);
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
              '';
      } else if (field === 'password') {
          return this.password.hasError('required') ? 'You must enter a Password' :
              this.password.hasError('minlength') ? 'Le pseudo doit être composé de 8 caractères minimum ' :
                  '';
      }
  }

}
