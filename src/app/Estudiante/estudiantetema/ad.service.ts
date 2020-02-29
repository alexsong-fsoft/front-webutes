import { Injectable } from '@angular/core';

import { HeroJobAdComponent } from './hero-job-ad.component';
import { HeroProfileComponent } from './hero-profile.component';
import { AdItem } from './ad-item';
import { Tema } from 'src/app/tema/tema';

@Injectable()
export class AdService {   

    getAds() {
        return [
            new AdItem(HeroProfileComponent, { name: 'Bombasto', bio: 'Brave as they come' }),
            new AdItem(HeroProfileComponent, { name: 'Dr IQ', bio: 'Smart as they come' }),
            new AdItem(HeroJobAdComponent, { idTema: 145, body: 'Submit your resume today!' }),
            new AdItem(HeroJobAdComponent, { idTema: 146, body: 'Apply today' }),
        ];
    }

    setAds(temas: Tema[], ads: AdItem[]) {
        for(let i = 0; i < temas.length; i++) {
            ads.push(new AdItem(HeroJobAdComponent, { idTema: temas[i].idTem }));
        };
        return ads;
    }

}