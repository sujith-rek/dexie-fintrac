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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

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
    MatSnackBarModule,
    ExpenseCardComponent]
})
export class ExpenseComponent implements AfterViewInit {
  dataSource: MatTableDataSource<Expense>;
  showExpenseCard: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private dbService: DbService,
    private snackBar: MatSnackBar
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
      console.log(expenses);
    });
  }

  addExpense() {
    this.showExpenseCard = !this.showExpenseCard;
  }

  closeExpenseCard(card: boolean) {
    this.showExpenseCard = false;
    this.openSnackBar("Expense Added", "Close");
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

  openSnackBar(message: string, action: string) {

    this.snackBar.open(message, action);

  }

}
