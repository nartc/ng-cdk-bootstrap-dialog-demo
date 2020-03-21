import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CdkDialogRef } from '../cdk-dialog/cdk-dialog-ref';
import { CdkDialogConfig } from '../cdk-dialog/cdk-dialog.config';

@Component({
  selector: 'app-test-dialog-content',
  template: `
    <p>
      test-dialog-content works!
    </p>
    <button class="btn btn-success btn-sm" (click)="onSave()">Save</button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestDialogContentComponent implements OnInit {

  constructor(private readonly dialogRef: CdkDialogRef, private readonly dialogConfig: CdkDialogConfig) {
  }

  ngOnInit(): void {
  }

  onSave() {
    this.dialogRef.close('I saved');
  }
}
