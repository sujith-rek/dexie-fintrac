import { Injectable } from '@angular/core';
import { db,Expense,Income } from '../DexieService/dexie.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(  ) { }

  async addExpense(expense: Expense){
    await db.expenses.add(expense);
  }

  async addIncome(income: Income){
    await db.incomes.add(income);
  }

  async getExpenses(){
    return await db.expenses.toArray();
  }

  async getIncomes(){
    return await db.incomes.toArray();
  }

  async deleteExpense(id: number){
    await db.expenses.delete(id);
  }

  async deleteIncome(id: number){
    await db.incomes.delete(id);
  }

  // async updateExpense(expense: Expense){
  //   await db.expenses.update(expense.id, expense);
  // }

  // async updateIncome(income: Income){
  //   await db.incomes.update(income.id, income);
  // }

  async getExpense(id: number){
    return await db.expenses.get(id);
  }

  async getIncome(id: number){
    return await db.incomes.get(id);
  }

  async getExpenseByCategory(category: string){
    return await db.expenses.where('category').equals(category).toArray();
  }

  async getIncomeByCategory(category: string){
    return await db.incomes.where('category').equals(category).toArray();
  }

  async getExpenseByDate(date: Date){
    return await db.expenses.where('date').equals(date).toArray();
  }

  async getIncomeByDate(date: Date){
    return await db.incomes.where('date').equals(date).toArray();
  }

  async exportExpenses(){
    const expenses = await this.getExpenses();
    let csv = 'id,name,amount,category,date,mode\n';
    expenses.forEach(expense => {
      csv += `${expense.id},${expense.name},${expense.amount},${expense.category},${expense.date},${expense.mode}\n`;
    }
    );
    return csv;
  }

}
