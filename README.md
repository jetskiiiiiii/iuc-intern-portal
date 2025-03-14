TODO:
- redirect users to clock in/out form after logging in / signing up
- change clockinoutform to only be clock in/out button (since user is always known)
- create dashboard
    - where users are redirected if signed in
    - able to clock out and see hours worked
- create login form (multi-step form)
    - all users will be manually invited (for now)
    - send invite (edit email)
    - set password that users can use to login
    - if users try to login without being invited, tell them to send email to iuc intern email
- delete /private
- error handling for passwords
- /setaccountinfo should update if info exists, not insert

RESOURCES:
https://asharibali.medium.com/building-a-stop-watch-app-with-next-js-1127c23085a2
https://mdobekidis.medium.com/timer-sync-across-clients-with-supabase-realtime-and-reactjs-6ca3c7730d66
https://github.com/orgs/supabase/discussions/4400
