// src/db.ts
import Dexie from "dexie"
import type { Table } from "dexie" 
 
 
export type User = {
  id?: number
  nombre: string
  apellidos: string
  email: string
  passwordHash: string
  createdAt: string
}
 
 
class AppDB extends Dexie {
  users!: Table<User, number>
  constructor() {
    super("AppDB")
    this.version(1).stores({
      // email indexado y único
      users: "++id,&email,createdAt",
    })
  }
}
 
 
export const db = new AppDB()