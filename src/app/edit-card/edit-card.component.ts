import { Component, Output } from '@angular/core';
import { Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { DbService } from '../DbService/db.service';


@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss'],
  standalone: true,
  imports: [MatIconModule, FormsModule, CommonModule]
})
export class EditCardComponent {

  constructor(
    private dexieService : DbService
  ){}

  @Input() id : number = 0;
  @Input() name: string = '';
  @Input() amount: number = 0;
  @Input() category: string = '';
  @Input() date: string = '';
  @Input() mode: string = '';
  @Input() type: boolean = true;
  @Input() showEdit: boolean = false;
  @Output() showEditChange = new EventEmitter<boolean>();

  editCard : boolean = true;

  showEditCard : boolean = false;

  closeCard(){
    this.showEditCard = false;
    this.showEditChange.emit(this.showEditCard);
  }

  updateIncome(){
    this.editCard = true;
    this.dexieService.updateIncome(this.id, this.name, this.amount, this.category, this.date, this.mode);
    this.closeCard();
  }

  updateExpense(){
    this.editCard = true;
    this.dexieService.updateExpense(this.id, this.name, this.amount, this.category, this.date, this.mode);
    this.closeCard();
  }


  deleteIncome(){
    this.dexieService.deleteIncome(this.id);
    this.closeCard();
  }

  deleteExpense(){
    this.dexieService.deleteExpense(this.id);
    this.closeCard();
  }


  deleteVal(){
    if(this.type){
      this.deleteIncome();
    } else {
      this.deleteExpense();
    }
  }

  update(){
    if(this.type){
      this.updateIncome();
    } else {
      this.updateExpense();
    }
  }


}
