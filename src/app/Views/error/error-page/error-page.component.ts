
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit , OnDestroy {

    error: HttpErrorResponse;

  constructor(private route: Router) {
      const navigation = this.route.getCurrentNavigation();
      // récupération de la liste des objets envoyer qui sont de type "STRING"
      const state = navigation.extras.state as {error: string};
      // stocker chaque objet
      const error = state.error;
      // transformer chaque objet de type "STRING" en JSON et passer à la variable
      this.error = JSON.parse(error);
  }

  ngOnInit() {
      // si je ne met pas de timeOut this.error est lu alors qu'il n'a pas encore été rempli par le JSON.parse(error)
      setTimeout(
          () => {
              console.log(this.error);
          }, 1000
      );
  }

  ngOnDestroy(): void {
  }

}
