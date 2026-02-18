import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-measure-modify-dialog.component',
  imports: [ReactiveFormsModule],
  templateUrl: './measure-modify-dialog.component.html',
  styleUrl: './measure-modify-dialog.component.scss',
})
export class MeasureModifyDialogComponent {
  form = new FormGroup({
    value: new FormControl<number>(0),
  });
}
