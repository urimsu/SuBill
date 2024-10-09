import { Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { HeaderComponent } from './header/header.component';
import { BillreaderComponent } from './billreader/billreader.component';

export const paths={
    calculator:'calculator',
    billreader:'billreader'
};

export const routes: Routes = [
{path:paths.calculator, component:CalculatorComponent},
{path:paths.billreader,component:BillreaderComponent},
{path:'**',redirectTo:paths.calculator}

];
