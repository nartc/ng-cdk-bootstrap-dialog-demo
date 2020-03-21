import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkContentDialogDirective } from './cdk-content-dialog.directive';
import { CdkDialogContainerComponent } from './cdk-dialog-container.component';

@NgModule({
  declarations: [CdkContentDialogDirective, CdkDialogContainerComponent],
  imports: [
    CommonModule, OverlayModule
  ]
})
export class CdkDialogModule {
}
