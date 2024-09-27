import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CalculatorComponent } from "./calculator/calculator.component";
import { DatenbankComponent } from './datenbank/datenbank.component';
import { DatenbankDisplayComponent } from './datenbank-display/datenbank-display.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CalculatorComponent,DatenbankComponent,DatenbankDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SuBill';
}
