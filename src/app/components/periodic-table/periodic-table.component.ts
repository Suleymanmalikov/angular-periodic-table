import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { debounceTime } from 'rxjs/operators';
import { NgIf, NgForOf, AsyncPipe, CommonModule } from '@angular/common';
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
    MatCheckboxModule,
    NgIf,
    NgForOf,
    AsyncPipe,
    CommonModule,
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
  filterForm: FormGroup;
  columnVisibility: { [key: string]: boolean } = {
    position: true,
    name: true,
    weight: true,
    symbol: true,
    actions: true,
  };

  constructor(
    private elementDataService: ElementDataService,
    public dialog: MatDialog
  ) {
    this.filterForm = new FormGroup({
      name: new FormControl(''),
      weight: new FormControl(''),
      symbol: new FormControl(''),
    });
  }

  get allColumnsVisible(): boolean {
    return Object.values(this.columnVisibility).every((value) => value);
  }

  get columnNames(): string[] {
    return ['position', 'name', 'weight', 'symbol', 'actions'];
  }

  ngOnInit(): void {
    this.elementDataService.getElements().subscribe((data) => {
      this.dataSource = data;
    });

    this.filterForm.valueChanges
      .pipe(debounceTime(2000))
      .subscribe((filterValues) => {
        this.applyFilter(filterValues);
      });
  }

  applyFilter(filterValues: any): void {
    const { name, weight, symbol } = filterValues;
    const lowercaseName = name.toLowerCase();
    const lowercaseSymbol = symbol.toLowerCase();

    this.elementDataService.getElements().subscribe((data) => {
      this.dataSource = data.filter((element) => {
        const matchesName = element.name.toLowerCase().includes(lowercaseName);
        const matchesWeight = element.weight.toString().includes(weight);
        const matchesSymbol = element.symbol
          .toLowerCase()
          .includes(lowercaseSymbol);

        return matchesName && matchesWeight && matchesSymbol;
      });
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

  toggleColumn(column: string, checked: boolean): void {
    if (column === 'all') {
      const allChecked = checked;
      Object.keys(this.columnVisibility).forEach((key) => {
        this.columnVisibility[key] = allChecked;
      });
      this.displayedColumns = allChecked
        ? Object.keys(this.columnVisibility)
        : [];
    } else {
      this.columnVisibility[column] = checked;
      this.displayedColumns = Object.keys(this.columnVisibility).filter(
        (key) => this.columnVisibility[key]
      );
      if (!this.displayedColumns.length) {
        this.displayedColumns = [
          'position',
          'name',
          'weight',
          'symbol',
          'actions',
        ];
      }
    }
  }
}
