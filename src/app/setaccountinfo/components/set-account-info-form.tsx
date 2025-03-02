import setAccountInfoAction from "../actions/set-account-info-action"

export default function SetAccountInfoForm() {
  return (
    <section>
      <form>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" required />
        
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" name="firstName" type="text" required />

        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" required />
        
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="text" required />

        <label htmlFor="phoneNumber">Phone Number</label>
        <input id="phoneNumber" name="phoneNumber" type="text" required />

        <button formAction={setAccountInfoAction}>Save Info</button>
      </form>
    </section>
  )
}
