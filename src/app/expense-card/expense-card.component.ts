import { Component } from '@angular/core';
import { DbService } from '../DbService/db.service';
import { Expense } from '../DexieService/dexie.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-expense-card',
  templateUrl: './expense-card.component.html',
  styleUrls: ['./expense-card.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
     MatDividerModule, 
     MatIconModule, 
     FormsModule, 
     CommonModule,
     MatSnackBarModule]
})
export class ExpenseCardComponent {
  constructor(
    private dbService: DbService,
    private snackBar: MatSnackBar
  ) { }

  @Input() showCard: boolean = false;
  @Output() showCardChange = new EventEmitter<boolean>();

  show: boolean = false;
  name: string = '';
  amount: number = 0;
  category: string = '';
  date: Date = new Date();
  mode: string = '';
  expenses: Expense[] = [];

  onSubmit() {

    const expense: Expense = {
      name: this.name,
      amount: this.amount,
      category: this.category,
      date: this.date,
      mode: this.mode
    }

    this.dbService.addExpense(expense);
    this.closeCard();
    this.openSnackBar("Expense Added", "Close");


  }

  closeCard() {
    this.showCardChange.emit(this.showCard);
  }

  openSnackBar(message: string, action: string) {

    this.snackBar.open(message, action);

  }

}
