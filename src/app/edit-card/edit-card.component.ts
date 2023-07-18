import { Component } from '@angular/core';
import { DexieService } from '../DexieService/dexie.service';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent {

  constructor(
    private dexieService : DexieService,
  ){}

  


}
