import { Component } from '@angular/core';

import { PeriodicTableComponent } from './components/periodic-table/periodic-table.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [PeriodicTableComponent],
})
export class AppComponent {
  title = 'Periodic Table App';
}
