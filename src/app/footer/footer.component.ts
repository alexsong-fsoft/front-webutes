import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
    <div class="footer">
        <div class="footer-inner">
        <div class="footer-content" align="center">
            <div>
                <font color="#7c7c7c">2019 © , Universidad Politécnica Salesiana, Todos los derechos reservados.</font>
            </div>
        </div>
        </div>
    </div>
    `,
    styles: ['.footer .footer-inner .footer-content { border-top: none; }']
})
export class FooterComponent {

}
