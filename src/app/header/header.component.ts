import { Component, OnInit } from '@angular/core';
import { Sysusuario } from '../sysusuario/sysusuario';
import { UserService } from '../login/user.service';

declare var $: any;
declare var Gestor: any;
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    public usserLogged: Sysusuario = null;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.usserLogged = this.userService.getUserLoggedIn();
    }

    public fullscreen(): void {
        Gestor.Util.fullScreen();
    }
}