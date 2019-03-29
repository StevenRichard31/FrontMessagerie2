import {User} from '../Models/User.model';
import { Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ProcessHTTPMsgService} from './process-httpmsg.service';
import {Router} from '@angular/router';

@Injectable()
export class UserService {

    IPlocal = 'http://192.168.43.228:3000';

    constructor(private httpClient: HttpClient, private processHttpMsgService: ProcessHTTPMsgService, private router: Router) {}

    private users: User[] = [];
    userSubject = new Subject<User[]>();

    // demande à l'observable d'émettre la liste des utilisateurs
    emitUsers() {
        this.userSubject.next(this.users.slice());
    }

    // ajoute un utilisateur a la bdd
    addUserGET() {
        return this.httpClient.get(this.IPlocal + '/user/register');
    }
    addUserPOST(newUser: User, token) {
        return this.httpClient
            .post(this.IPlocal + '/user/register', newUser , {
            headers: new HttpHeaders({
                'CSRF-Token': token,
                'Content-Type': 'application/json'
            }),
            withCredentials: true});

        // REQUETE utilisant Fetch API
        // fetch(this.IPlocal + '/user/register', {
        //     credentials: 'same-origin', // <-- includes cookies in the request
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'CSRF-Token': token // <-- is the csrf token as a header
        //     },
        //     body: JSON.stringify(newUser)
        // })
        // .then((res) => this.router.navigate(['user/list']))
        // .then((data) =>  console.log('data: ' + data))
        // .catch((err) => console.log('err: ' + err));
    }

    // récupère la liste de tous les utilisateurs
    getAllUsers() {
        this.httpClient
            .get<User[]>(this.IPlocal + '/user/test')
            .subscribe(
                (response) => {
                    this.users = response;
                    this.emitUsers();
                    console.log('récup user');
                },
                (error) => {
                    console.log(error);
                    this.processHttpMsgService.handleError(error);
                }
            );
    }

    createUser(formValue) {
        return new User(
            formValue.userName,
            formValue.email,
            formValue.password
        );
    }

    /*FAUX
    getUserIds(): Observable<number[] | any> {
        return this.getAllUsers2().pipe(map(users => users.map(user => user.id)))
            .pipe(catchError(error => error));
    }*/
}
