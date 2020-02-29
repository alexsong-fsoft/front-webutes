import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ad-host-paginator]',
})
export class AdDirectivePaginator {
  constructor(public viewContainerRef: ViewContainerRef) { }
}