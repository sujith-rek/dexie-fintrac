import { DbService } from '../DbService/db.service';
import { Expense } from '../DexieService/dexie.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ExpenseCardComponent } from '../expense-card/expense-card.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { EditCardComponent } from '../edit-card/edit-card.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
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
    ExpenseCardComponent]
})
export class ExpenseComponent implements AfterViewInit {
  dataSource: MatTableDataSource<Expense>;
  showExpenseCard: boolean = false;
  showEditCard: boolean = false;

  id : number = 0;
  name: string = '';
  amount: number = 0;
  category: string = '';
  date: string = '';
  mode: string = '';
  type: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private dbService: DbService,
  ) {
    const expenses: Expense[] = [];
    this.dbService.getExpenses().then(expenses => {
      expenses = expenses;
    });
    this.dataSource = new MatTableDataSource(expenses);
  }

  displayedColumns: string[] = ['id', 'name', 'amount', 'category', 'date', 'mode'];
  // 💵

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
    this.dbService.getExpenses().then(expenses => {
      this.dataSource.data = expenses;
    });
  }

  addExpense() {
    this.showExpenseCard = !this.showExpenseCard;
  }

  closeExpenseCard(card: boolean) {
    this.showExpenseCard = false;
    window.location.reload();
  }

  closeEditCard(card: boolean) {
    this.showEditCard = false;
    window.location.reload();
  }

  showExp() {
    this.dbService.exportExpenses().then(exportData => {
      const blob = new Blob([exportData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', 'expenses.csv');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });

  }

  editCard(row:any){
    this.showEditCard = true;
    this.id = row.id;
    this.name = row.name;
    this.amount = row.amount;
    this.category = row.category;
    this.date = row.date;
    this.mode = row.mode;
  }

}
