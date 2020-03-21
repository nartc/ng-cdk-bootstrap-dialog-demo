import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCdkContentDialog]'
})
export class CdkContentDialogDirective {

  constructor(public viewContainerRef: ViewContainerRef) { // contentInsertionPoint
  }

}
