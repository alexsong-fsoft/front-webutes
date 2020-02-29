import { Component, OnInit, Input } from '@angular/core';
import { PageRender } from '../Page/pagerender';

@Component({
  //selector: 'app-paginator',
  templateUrl: './paginator.component.html'
  //styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() pageRender: PageRender<any>;

  constructor() { }

  ngOnInit() {
  }

}
