import { Component, OnInit } from '@angular/core';
import { Sysusuario } from '../sysusuario/sysusuario';
import { UserService } from '../login/user.service';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title: string = 'webutes-app';
  public usserLogged: Sysusuario = null;
  
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.usserLogged = this.userService.getUserLoggedIn();
    try {
      setTimeout(function(){
        $('#sidebar').ace_sidebar();
      }, 1000);
    } catch (e) { }
  }

}
