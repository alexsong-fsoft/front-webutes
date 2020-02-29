import { Component, OnInit } from '@angular/core';
import { Sysusuario } from '../sysusuario/sysusuario';
import { UserService } from '../login/user.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    public usserLogged: Sysusuario = null;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.usserLogged = this.userService.getUserLoggedIn();
    }

}