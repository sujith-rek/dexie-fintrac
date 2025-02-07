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

  async updateExpense(id: number, name: string, amount: number, category: string, date: any, mode: string){
    const expense: Expense = {
      id: id,
      name: name,
      amount: amount,
      category: category,
      date: date,
      mode: mode
    }
    await db.expenses.update(id, expense);
  }

  async updateIncome(id: number, name: string, amount: number, category: string, date: any, mode: string){
    const income: Income = {
      id: id,
      name: name,
      amount: amount,
      category: category,
      date: date,
      mode: mode
    }
    await db.incomes.update(id, income);
  }

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

  async exportIncomes(){
    const incomes = await this.getIncomes();
    let csv = 'id,name,amount,category,date,mode\n';
    incomes.forEach(income => {
      csv += `${income.id},${income.name},${income.amount},${income.category},${income.date},${income.mode}\n`;
    }
    );
    return csv;
  }

}
