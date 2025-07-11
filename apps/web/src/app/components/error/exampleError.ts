import { Component, inject, model } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  err: Error;
}

@Component({
  templateUrl: './exampleError.html',
})
export class ExampleErrorDialog {
  readonly dialogRef = inject(MatDialogRef<ExampleErrorDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly error = model(this.data.err);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
