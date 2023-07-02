import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Table } from 'dexie';

export interface Expense{
  id?: number;
  name: string;
  amount: number;
  category: string;
  date: Date;
  mode: string;
}

export interface Income{
  id?: number;
  name: string;
  amount: number;
  category: string;
  date: Date;
  mode: string;
}


@Injectable({
  providedIn: 'root'
})
export class DexieService extends Dexie {

  expenses!: Table<Expense, number>;
  incomes!: Table<Income, number>;

  constructor() { 
    super('ngdexieliveQuery');
    this.version(1).stores({
      expenses: '++id, name, amount, category, date, mode',
      incomes: '++id, name, amount, category, date, mode'
    });
  }
}

export const db = new DexieService();
