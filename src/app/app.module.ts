import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CdkDialogModule } from './cdk-dialog/cdk-dialog.module';
import { TestDialogContentComponent } from './test-dialog-content/test-dialog-content.component';

@NgModule({
  declarations: [
    AppComponent,
    TestDialogContentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CdkDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
