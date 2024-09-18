import { Component } from '@angular/core';
import { PeriodicTableComponent } from './components/periodic-table/periodic-table.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [PeriodicTableComponent], // Import the standalone PeriodicTableComponent
})
export class AppComponent {
  title = 'Periodic Table App';
}
