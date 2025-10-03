import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { currentUser, logout } from "../lib/auth"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"
 
type UIUser = {
  id?: number
  nombre: string
  apellidos: string
  email: string
  createdAt: string
}
 
export default function Dashboard() {
  const nav = useNavigate()
  const [user, setUser] = useState<UIUser | null>(null)
 
  useEffect(() => {
    let mounted = true
    currentUser().then((u) => {
      if (!mounted) return
      if (!u) {
        nav("/login", { replace: true })
      } else {
        setUser({
          id: u.id,
          nombre: u.nombre,
          apellidos: u.apellidos,
          email: u.email,
          createdAt: u.createdAt,
        })
      }
    })
    return () => { mounted = false }
  }, [nav])
 
  if (!user) {
    return (
      <main className="min-h-svh grid place-items-center">
        <p className="text-sm text-muted-foreground">Cargando…</p>
      </main>
    )
  }
 
  const initials = `${user.nombre?.[0] ?? ""}${user.apellidos?.[0] ?? ""}`.toUpperCase()
  const fullName = `${user.nombre} ${user.apellidos}`.trim()
  const created = new Date(user.createdAt).toLocaleString()
 
  return (
    <main className="min-h-svh grid place-items-center p-4">
      <section className="w-full max-w-2xl">
        <Card className="p-6 space-y-6">
          <header className="flex items-center gap-4">
            <div className="size-12 rounded-full grid place-items-center border text-lg font-semibold">
              {initials || "?"}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{fullName || "Usuario"}</h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => { logout(); nav("/login", { replace: true }) }}
            >
              Cerrar sesión
            </Button>
          </header>
 
          <Separator />
 
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase text-muted-foreground">Nombre</p>
              <p className="font-medium">{user.nombre}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-muted-foreground">Apellidos</p>
              <p className="font-medium">{user.apellidos}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-muted-foreground">Miembro desde</p>
              <p className="font-medium">{created}</p>
            </div>
          </div>
 
          {/* Zona para acciones futuras (editar perfil, cambiar contraseña, etc.) */}
          <div className="flex gap-2 pt-2">
            <Button onClick={() => alert("Próximamente: editar perfil")}>
              Editar perfil
            </Button>
            <Button variant="secondary" onClick={() => alert("Próximamente: cambiar contraseña")}>
              Cambiar contraseña
            </Button>
          </div>
        </Card>
      </section>
    </main>
  )
}