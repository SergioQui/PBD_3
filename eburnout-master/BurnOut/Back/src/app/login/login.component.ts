import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	user = {
    	email: '',
    	password: ''
  	};

    error: string = "";

  	constructor(
  		private authService: AuthService,
  		private router: Router) {
  
  	}

    ngOnInit() {

        if(this.authService.isLoggedIn()){
            return this.router.navigate(['home']);
        }


    }

  	signInWithEmail() {

      this.authService.signInRegular(this.user.email, this.user.password)
        .then((res) => {
          console.log(res);
          this.router.navigate(['home']);
        })
        .catch((err) => this.error = err);
    }

}
