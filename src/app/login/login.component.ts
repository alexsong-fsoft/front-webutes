import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Sysusuario } from '../sysusuario/sysusuario';
import { UserService } from './user.service';

declare var JQuery: any;
declare var $: any;
declare var Gestor: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private sysusuario: Sysusuario = new Sysusuario();
  constructor(private loginService: LoginService, private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    Gestor.fn.initLogin();
  }

  logIn(email: string, password: string, event: Event) {
    event.preventDefault(); // Avoid default action for the submit button of the login form
    //Calls service to login user to the api rest
    this.sysusuario.usrUsuario = email;
    this.sysusuario.usrClave = password;
    this.loginService.login(this.sysusuario).subscribe(
      response => {
        let user: Sysusuario = response; 
        if(user != null){
          this.userService.setUserLoggedIn(user);
          this.navigate();
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  navigate() {
    this.router.navigateByUrl('/dashboard');
  }

}
