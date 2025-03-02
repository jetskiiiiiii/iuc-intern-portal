import { loginAction } from "../actions/login-form-actions"

export default function LoginForm() {
  return (
    <div>
      <form>
        <label htmlFor='email'>Email:</label>
        <input id="email" name="email" type="email" required />

        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />

        <button formAction={loginAction}>Log In</button>
      </form>

      <div>
        <p>Not an intern? Email irvineurgentcareinterns@gmail.com</p>
      </div>
    </div>
  )
}
