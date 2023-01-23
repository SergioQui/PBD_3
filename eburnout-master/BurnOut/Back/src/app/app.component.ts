import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {

    constructor(
        private _route: ActivatedRoute,
        private _router: Router
        ){

    }

    ngOnInit() {
    }

}
