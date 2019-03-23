import {User} from '../Models/User.model';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/internal/operators';
import {ProcessHTTPMsgService} from './process-httpmsg.service';

@Injectable()
export class UserService {

    private users: User[] = [];
    userSubject = new Subject<User[]>();

    constructor(private httpClient: HttpClient, private processHttpMsgService: ProcessHTTPMsgService) {}

    // demande à l'observable d'émettre la liste des utilisateurs
    emitUsers() {
        this.userSubject.next(this.users.slice());
    }

    // ajoute un utilisateur a la bdd
    /*
    addUser(user: User) {
        this.httpClient
            .post('http://192.168.1.41:3000/user/register', user)
            .subscribe(
                () => {
                    console.log('Enregistrement terminé !');
                    // redirection vers la liste des "users"
                    this.router.navigate(['user/list']);
                },
                (error) => {
                    return this.processHttpMsgService.handleError(error);
                    // console.log(this.error);
                }
            );
    }*/

    addUser2(user: User) {
        return this.httpClient.post('http://192.168.1.41:3000/user/register', user);
    }

    // récupère la liste de tous les utilisateurs
    /*
    getAllUsers() {
        this.httpClient
            .get<any[]>('http://192.168.1.41:3000/user/test')
            .subscribe(
                (response) => {
                    this.users = response;
                    this.emitUsers();
                    console.log(response);
                    console.log('Récupération de la list utilisateur terminé !');
                },
                (error) => {
                    console.log(error);
                    throw error;
                }
            );
    }*/

    // récupère la liste de tous les utilisateurs
    getAllUsers2() {
        this.httpClient
            .get<User[]>('http://192.168.1.41:3000/user/test')
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
