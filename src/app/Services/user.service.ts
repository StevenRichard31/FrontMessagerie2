import {User} from '../Models/User.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class UserService {

    private users: User[] = [];
    userSubject = new Subject<User[]>();

    constructor(private httpClient: HttpClient) {}

    // émet la liste des utilisateurs à jour
    emitUsers() {
        this.userSubject.next(this.users.slice());
    }

    // ajoute un utilisateur a la bdd
    addUser(user: User) {
        this.httpClient
            .post('http://192.168.1.41:3000/user/register', user)
            .subscribe(
                () => {
                    console.log('Enregistrement terminé !');
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    // récupère la liste de tous les utilisateurs
    getAllUsers() {
        this.httpClient
            .get<any[]>('http://192.168.1.41:3000/user/test')
            .subscribe(
                (response) => {
                    this.users = response;
                    this.emitUsers();
                    console.log('Récupération de la list utilisateur terminé !');
                },
                (error) => {
                    console.log(error);
                }
            );
    }
}
