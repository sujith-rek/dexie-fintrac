import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ExpenseComponent } from './expense/expense.component';
import { ExpenseCardComponent } from './expense-card/expense-card.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'expense', component: ExpenseComponent},
  {path: 'expense-card', component: ExpenseCardComponent},
  {path: '**', component: AppComponent}
];

@NgModule({
  declarations: [],
  imports: [CommonModule ,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
