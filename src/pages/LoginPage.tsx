// asegúrate de que es export default
import { LoginForm } from "../components/login-form"
 
 
export default function LoginPage() {
  return (
    <main className="min-h-svh grid place-items-center px-4">
      <section className="w-full max-w-sm">
        <LoginForm />
      </section>
    </main>
  )
}