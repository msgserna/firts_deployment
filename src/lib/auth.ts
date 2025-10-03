// src/lib/auth.ts
import { db, type User } from "../db"
import bcrypt from "bcryptjs"
 
const SALT_ROUNDS = 10
const SESSION_KEY = "session:userId"
 
export async function signUp(input: {
  nombre: string
  apellidos: string
  email: string
  password: string
}) {
  const email = input.email.trim().toLowerCase()
  const exists = await db.users.where("email").equals(email).first()
  if (exists) throw new Error("Ese email ya está registrado.")
 
  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS)
  const id = await db.users.add({
    nombre: input.nombre,
    apellidos: input.apellidos,
    email,
    passwordHash,
    createdAt: new Date().toISOString(),
  } as User)
 
  // crea sesión sencilla
  localStorage.setItem(SESSION_KEY, String(id))
  return id
}
 
export async function login(input: { email: string; password: string }) {
  const email = input.email.trim().toLowerCase()
  const user = await db.users.where("email").equals(email).first()
  if (!user) throw new Error("Usuario o contraseña incorrectos.")
 
  const ok = await bcrypt.compare(input.password, user.passwordHash)
  if (!ok) throw new Error("Usuario o contraseña incorrectos.")
 
  localStorage.setItem(SESSION_KEY, String(user.id))
  return user
}
 
export async function currentUser() {
  const idStr = localStorage.getItem(SESSION_KEY)
  if (!idStr) return null
  const user = await db.users.get(Number(idStr))
  return user ?? null
}
 
export function logout() {
  localStorage.removeItem(SESSION_KEY)
}