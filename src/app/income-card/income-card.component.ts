import { Component } from '@angular/core';
import { DbService } from '../DbService/db.service';
import { Income } from '../DexieService/dexie.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-income-card',
  templateUrl: './income-card.component.html',
  styleUrls: ['./income-card.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule, FormsModule, CommonModule]

})
export class IncomeCardComponent {
  constructor(private dbService: DbService) { }
  @Input() showCard : boolean = false;
  @Output() showCardChange = new EventEmitter<boolean>();

  show: boolean = false;
  name: string = '';
  amount: number = 0;
  category: string = '';
  date: Date = new Date();
  mode: string = '';
  // expenses: Expense[] = [];
  incomes: Income[] = [];

  onSubmit() {

    const income : Income= {
      name: this.name,
      amount: this.amount,
      category: this.category,
      date: this.date,
      mode: this.mode
    }

    this.dbService.addIncome(income);
    this.closeCard();    

  }

  closeCard(){
    this.showCardChange.emit(this.showCard);
  }

}
