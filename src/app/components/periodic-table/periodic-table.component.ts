import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { debounceTime, delay } from 'rxjs/operators';
import { NgIf, NgForOf, AsyncPipe, CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

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
    MatSelectModule,
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
  selectedColumns: string[] = [];
  columnNames: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  loading = false;

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

  ngOnInit(): void {
    this.loadData();
    this.filterForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe((filterValues) => {
        this.applyFilter(filterValues);
      });

    this.selectedColumns = this.columnNames.filter(
      (column) => this.columnVisibility[column]
    );
  }

  loadData(): void {
    this.loading = true;
    this.elementDataService
      .getElements()
      .pipe(delay(1000))
      .subscribe((data) => {
        this.dataSource = data;
        this.loading = false;
      });
  }

  applyFilter(filterValues: any): void {
    this.loading = true;
    const { name, weight, symbol } = filterValues;
    const lowercaseName = name.toLowerCase();
    const lowercaseSymbol = symbol.toLowerCase();

    this.elementDataService
      .getElements()
      .pipe(delay(1000))
      .subscribe((data) => {
        this.dataSource = data.filter((element) => {
          const matchesName = element.name
            .toLowerCase()
            .includes(lowercaseName);
          const matchesWeight = element.weight.toString().includes(weight);
          const matchesSymbol = element.symbol
            .toLowerCase()
            .includes(lowercaseSymbol);

          return matchesName && matchesWeight && matchesSymbol;
        });
        this.loading = false;
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

  onColumnSelectionChange(columns: string[]): void {
    this.selectedColumns = columns;
    this.columnVisibility = this.columnNames.reduce((acc, column) => {
      acc[column] = columns.includes(column);
      return acc;
    }, {} as { [key: string]: boolean });

    this.displayedColumns = columns;
  }
}
