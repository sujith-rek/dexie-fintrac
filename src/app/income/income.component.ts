import { DbService } from '../DbService/db.service';
import { Income } from '../DexieService/dexie.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IncomeCardComponent } from '../income-card/income-card.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { EditCardComponent } from '../edit-card/edit-card.component';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    EditCardComponent,
    IncomeCardComponent]
})
export class IncomeComponent implements AfterViewInit {
  dataSource: MatTableDataSource<Income>;
  showIncomeCard: boolean = false;
  showEditCard: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  id : number = 0;
  name: string = '';
  amount: number = 0;
  category: string = '';
  date: string = '';
  mode: string = '';

  constructor(
    private dbService: DbService,
  ) {
    const income: Income[] = [];
    this.dbService.getIncomes().then(expenses => {
      expenses = expenses;
    });
    this.dataSource = new MatTableDataSource(income);
  }

  displayedColumns: string[] = ['id', 'name', 'amount', 'category', 'date', 'mode'];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.dbService.getIncomes().then(expenses => {
      this.dataSource.data = expenses;
    });
  }

  addIncome() {
    this.showIncomeCard = !this.showIncomeCard;
  }

  closeIncomeCard(card: boolean) {
    this.showIncomeCard = false;
    window.location.reload();
  }

  closeEditCard(card: boolean) {
    this.showEditCard = false;
    window.location.reload();
  }

  showExp() {
    this.dbService.exportIncomes().then(exportData => {
      const blob = new Blob([exportData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', 'income.csv');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });

  }

  onRowClicked(row: any) {
    this.showEditCard = true;
    this.id = row.id;
    this.name = row.name;
    this.amount = row.amount;
    this.category = row.category;
    this.date = row.date;
    this.mode = row.mode;
    
  }


}
