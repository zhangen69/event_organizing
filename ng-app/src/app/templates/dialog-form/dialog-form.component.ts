import { Component, OnInit, Inject } from '@angular/core';
import { IStandardFormField } from 'src/app/standard/standard-form-field.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StandardService } from 'src/app/standard/standard.service';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.css']
})
export class DialogFormComponent implements OnInit {
  formData: any = {};
  fields: IStandardFormField[];

  constructor(
    private dialogRef: MatDialogRef<any>,
    private service: StandardService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.service.init('event');
    this.fields = this.data.fields;
    this.formData = this.data.event;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
