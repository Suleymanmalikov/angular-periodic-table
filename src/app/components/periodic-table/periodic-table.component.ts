import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { debounceTime } from 'rxjs/operators';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { ElementDataService } from '../../services/element-data.service';
import { PeriodicElement } from '../../models/periodic-element';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  standalone: true,
  selector: 'app-periodic-table',
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.css'],
  imports: [
    MatTableModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
    AsyncPipe,
  ],
})
export class PeriodicTableComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'actions',
  ];
  dataSource: PeriodicElement[] = [];
  filterControl = new FormControl('');

  constructor(
    private elementDataService: ElementDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.elementDataService.getElements().subscribe((data) => {
      this.dataSource = data;
    });

    this.filterControl.valueChanges
      .pipe(debounceTime(2000))
      .subscribe((filterValue) => {
        this.applyFilter(filterValue || '');
      });
  }

  applyFilter(filterValue: string): void {
    const lowercaseFilter = filterValue.toLowerCase();
    this.elementDataService.getElements().subscribe((data) => {
      this.dataSource = data.filter(
        (element) =>
          element.name.toLowerCase().includes(lowercaseFilter) ||
          element.weight.toString().includes(lowercaseFilter) ||
          element.symbol.toLowerCase().includes(lowercaseFilter)
      );
    });
  }

  openEditDialog(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '250px',
      data: { ...element },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.elementDataService.updateElement(result);
      }
    });
  }
}
