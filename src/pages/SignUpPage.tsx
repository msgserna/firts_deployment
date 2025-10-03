import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { signUp } from "../lib/auth"
 
export default function SignUpPage() {
  const nav = useNavigate()
  const [form, setForm] = useState({ nombre:"", apellidos:"", email:"", password:"", confirm:"" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
 
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target
    setForm((s) => ({ ...s, [id]: value }))
  }
 
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (form.password !== form.confirm) {
      setError("Las contraseñas no coinciden")
      return
    }
    setLoading(true)
    try {
      await signUp({
        nombre: form.nombre,
        apellidos: form.apellidos,
        email: form.email,
        password: form.password,
      })
      nav("/login", { replace: true })
    } catch (err: any) {
      setError(err?.message ?? "No se pudo registrar")
    } finally {
      setLoading(false)
    }
  }
 
  return (
    <main className="min-h-svh grid place-items-center px-4">
      <section className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-xl font-bold">Create your account</h1>
          <p className="text-sm text-muted-foreground">Rellena tus datos para registrarte.</p>
        </div>
 
        <form className="space-y-4" onSubmit={onSubmit}>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="grid gap-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input id="nombre" value={form.nombre} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="apellidos">Apellidos</Label>
            <Input id="apellidos" value={form.apellidos} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={form.password} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm">Confirm password</Label>
            <Input id="confirm" type="password" value={form.confirm} onChange={handleChange} required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creando cuenta..." : "Create account"}
          </Button>
        </form>
 
        <p className="text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta? <Link to="/login" className="underline underline-offset-4">Inicia sesión</Link>
        </p>
      </section>
    </main>
  )
}