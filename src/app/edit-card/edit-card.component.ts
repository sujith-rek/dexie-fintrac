import { Component, Output } from '@angular/core';
import { DexieService } from '../DexieService/dexie.service';
import { Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss'],
  standalone: true,
  imports: [MatIconModule, FormsModule, CommonModule]
})
export class EditCardComponent {

  constructor(
    private dexieService : DexieService,
  ){}

  @Input() id : number = 0;
  @Input() name: string = '';
  @Input() amount: number = 0;
  @Input() category: string = '';
  @Input() date: string = '';
  @Input() mode: string = '';
  @Input() showEdit: boolean = false;
  @Output() showEditChange = new EventEmitter<boolean>();

  editCard : boolean = true;

  showEditCard : boolean = false;

  closeCard(){
    this.showEditCard = false;
    this.showEditChange.emit(this.showEditCard);
  }

  updateValues(){
    this.editCard = false;
  }


  


}
