import loginAction from "../actions/login-action"
import { useActionState } from "react"

// TODO: Add a 'forget password' function

const initialState = {
  message: "Enter your password"
}

export default function LoginForm() {
  const [ state, formAction ] = useActionState(loginAction, initialState) 

  return (
    <div className="flex flex-col w-full h-[84vh] justify-center items-center">

      <form action={formAction} id="login-form" className="flex flex-col w-full h-full p-4 gap-5">
        <input id="email" name="email" type="email" placeholder="Enter your email" required 
          className="input w-full underline-offset-1 input-ghost basis-full text-8xl font-bold focus:outline-none"/>
        
        {/* // TODO: Assumes sign in error is in regards to password. */}
        <input id="password" name="password" type="password" placeholder={state?.message} required
          className={`input w-full underline-offset-1 input-ghost basis-full text-8xl font-bold focus:outline-none
                    ${state?.message == "invalid_credentials" ? "" : ""}`}/>

        <button 
          className="btn btn-primary font-bold text-xl">
          Log In
        </button>
      </form>

      <div className="flex flex-row bg-info-content rounded-md">
        <h1 className="font-bold p-2">Not an intern?</h1>
        <p className="py-2">Email</p>
        <p className="italic p-2">irvineurgentcareinterns@gmail.com</p>
      </div>
    </div>
  )
}
