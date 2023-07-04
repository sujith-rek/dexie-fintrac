import { Component } from '@angular/core';
import { DbService } from '../DbService/db.service';
import { Expense,Income } from '../DexieService/dexie.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private dbService: DbService) { }

  name: string = '';
  amount: number = 0;
  category: string = '';
  date: Date = new Date();
  mode: string = '';
  expenses: Expense[] = [];

  ngOnInit(): void {
    this.dbService.getExpenses().then(expenses => {
      this.expenses = expenses;
    });
  }


  onSubmit() {

    const expense : Expense = {
      name: this.name,
      amount: this.amount,
      category: this.category,
      date: this.date,
      mode: this.mode
    }

    this.dbService.addExpense(expense);

    window.location.reload();

  }




  

}
