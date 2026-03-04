import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-measure-add-dialog.component',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './measure-add-dialog.component.html',
  styleUrl: './measure-add-dialog.component.scss',
})
export class MeasureAddDialogComponent {
  form = new FormGroup({
    value: new FormControl<number>(0),
  });
}
