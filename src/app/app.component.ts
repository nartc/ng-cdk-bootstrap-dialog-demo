import { Component } from '@angular/core';
import { CdkDialogService } from './cdk-dialog/cdk-dialog.service';
import { TestDialogContentComponent } from './test-dialog-content/test-dialog-content.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-cdk-dialog';

  constructor(private readonly dialogService: CdkDialogService) {
  }

  openDialog() {
    const config = {
      header: TestDialogContentComponent.name
    };
    const ref = this.dialogService.open(TestDialogContentComponent, config);
    ref.afterClosed
      .subscribe(data => {
        console.log('dialog closed', data);
      });
  }
}
