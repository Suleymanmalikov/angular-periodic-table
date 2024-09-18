// import { Component, OnInit } from '@angular/core';
// import { FormControl, ReactiveFormsModule } from '@angular/forms';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { MatTableModule } from '@angular/material/table';
// import { debounceTime } from 'rxjs/operators';
// import { ElementDataService } from '../../services/element-data.service';
// import { PeriodicElement } from '../../models/periodic-element';
// // import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
// import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
// import { NgIf, AsyncPipe } from '@angular/common';

// @Component({
//   standalone: true,
//   selector: 'app-periodic-table',
//   templateUrl: './periodic-table.component.html',
//   //   styleUrls: ['./periodic-table.component.css'],
//   styleUrls: ['./periodic-table.component.css'],
//   imports: [
//     MatTableModule,
//     ReactiveFormsModule,
//     MatDialogModule,
//     NgIf,
//     AsyncPipe,
//   ],
// })
// export class PeriodicTableComponent implements OnInit {
//   displayedColumns: string[] = [
//     'position',
//     'name',
//     'weight',
//     'symbol',
//     'actions',
//   ];
//   dataSource: PeriodicElement[] = [];
//   filterControl = new FormControl('');

//   constructor(
//     private elementDataService: ElementDataService,
//     public dialog: MatDialog
//   ) {}

//   ngOnInit(): void {
//     // Fetch data initially
//     this.elementDataService.getElements().subscribe((data) => {
//       this.dataSource = data;
//     });

//     // Apply filtering with debounce
//     this.filterControl.valueChanges
//       .pipe(debounceTime(2000))
//       .subscribe((filterValue) => {
//         this.applyFilter(filterValue || '');
//       });
//   }

//   applyFilter(filterValue: string): void {
//     const lowercaseFilter = filterValue.toLowerCase();
//     this.elementDataService.getElements().subscribe((data) => {
//       this.dataSource = data.filter(
//         (element) =>
//           element.name.toLowerCase().includes(lowercaseFilter) ||
//           element.weight.toString().includes(lowercaseFilter) ||
//           element.symbol.toLowerCase().includes(lowercaseFilter)
//       );
//     });
//   }

//   openEditDialog(element: PeriodicElement): void {
//     const dialogRef = this.dialog.open(EditDialogComponent, {
//       width: '250px',
//       data: { ...element }, // Avoid mutating the original data
//     });

//     dialogRef.afterClosed().subscribe((result) => {
//       if (result) {
//         this.elementDataService.updateElement(result);
//       }
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { debounceTime } from 'rxjs/operators';
import { ElementDataService } from '../../services/element-data.service';
import { PeriodicElement } from '../../models/periodic-element';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

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
