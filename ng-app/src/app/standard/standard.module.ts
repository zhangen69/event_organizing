import { ObjectToArrayPipe } from './to-array.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StandardListComponent } from './standard-list/standard-list.component';
import { StandardFormFieldComponent } from './standard-form-field/standard-form-field.component';
import { StandardFilterComponent } from './standard-filter/standard-filter.component';
import { StandardDisplayFieldComponent } from './standard-display-field/standard-display-field.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardFormComponent } from './standard-form/standard-form.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FilterOptionsPipe } from './filter-options.pipe';
import { TitleDisplayPipe } from '../pipes/title-display.pipe';



@NgModule({
  declarations: [
    StandardDisplayFieldComponent,
    StandardFilterComponent,
    StandardFormFieldComponent,
    StandardFormComponent,
    StandardListComponent,
    ObjectToArrayPipe,
    FilterOptionsPipe,
    TitleDisplayPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatSelectModule,
    MatListModule,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [
    StandardDisplayFieldComponent,
    StandardFilterComponent,
    StandardFormFieldComponent,
    StandardFormComponent,
    StandardListComponent,
    ObjectToArrayPipe,
    FilterOptionsPipe,
    TitleDisplayPipe,
  ]
})
export class StandardModule { }
