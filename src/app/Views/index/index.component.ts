import { Component, OnInit } from '@angular/core';
import {filter, map} from 'rxjs/internal/operators';
import {of, pipe} from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {

      // EXEMPLE D'utilisation pipe/of/subscription/observable
      const nums = of(1, 2, 3, 4, 5);

      // Create a function that accepts an Observable.
      const squareOddVals = pipe(
          filter((n: number) => n % 2 !== 0),
          map(n => n * n)
      );

      // Create an Observable that will run the filter and map functions
      const squareOdd = squareOddVals(nums);

      // Suscribe to run the combined functions
      squareOdd.subscribe(x => console.log(x));
  }

}
