import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Area } from './area';
import { AreaService } from './area.service';
import swal from 'sweetalert2'
import Lang from '../../assets/app.lang.json';
import { PageRender } from '../Page/pagerender';
import { ActivatedRoute } from '@angular/router';
import { AdDirective } from '../Estudiante/estudiantetema/ad.directive';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html'
})
export class AreaComponent implements OnInit {
  titulo: string = "Listado de Areas";
  areas : Area[];
  
  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;
  
  constructor(private areaService: AreaService, 
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.load();
  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let page = params['page']
      page = page ? page : 0;
      this.areaService.getAllPageable(page).subscribe(
        response => {
          this.areas = response.content;
          let pageRender: PageRender<Area> = new PageRender("/dashboard/area", response);
          const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PaginatorComponent);
          const viewContainerRef = this.adHost.viewContainerRef;
          viewContainerRef.clear();
          const componentRef = viewContainerRef.createComponent(componentFactory);
          (componentRef.instance).pageRender = pageRender;
        }
      );
    })
  }


  delete(area: Area): void {
    swal.fire(Lang.Swal.confirmDelete).then((result) => {
      if (result.value) {
        this.areaService.delete(area.idAre).subscribe(
          response => {
            swal.fire(Lang.messages.register_delete, Lang.messages.register_delete, 'success');
            this.ngOnInit();
          }
        )
      }
    })
  }


}
