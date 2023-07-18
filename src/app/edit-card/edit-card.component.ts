import { Component } from '@angular/core';
import { DexieService } from '../DexieService/dexie.service';
import { Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  showEditCard : boolean = false;

  closeCard(){
    this.showEditCard = false;
  }


  


}
