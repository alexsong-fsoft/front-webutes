import { Injectable } from '@angular/core';
import { Sysusuario } from '../sysusuario/sysusuario';

@Injectable()
export class UserService {

    private isUserLoggedIn: boolean;
    public usserLogged: Sysusuario;

    constructor() {
        this.isUserLoggedIn = false;
    }

    setUserLoggedIn(user: Sysusuario) {
        this.isUserLoggedIn = true;
        this.usserLogged = user;
        localStorage.setItem('currentUser', JSON.stringify(user));

    }

    getUserLoggedIn() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

}