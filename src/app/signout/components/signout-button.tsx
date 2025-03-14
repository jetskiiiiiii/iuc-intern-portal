import signOutAction from "../actions/signout-action"

export default function SignOutButton() {
  return (
    <button onClick={signOutAction}
      className="btn btn-error h-[60%] m-8 ml-auto text-2xl">
      Sign Out
    </button>
  )
}
