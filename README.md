TODO:
x redirect users to clock in/out form after logging in / signing up
x change clockinoutform to only be clock in/out button (since user is always known)
x create dashboard
    - where users are redirected if signed in
    - see hours worked
x create login form (multi-step form)
    - all users will be manually invited (for now)
    - send invite (edit email)
    - set password that users can use to login
    - if users try to login without being invited, tell them to send email to iuc intern email
x delete /private
x /setaccountinfo should update if info exists, not insert
- logging in with username / email
x button for setting account info
x navbar / header component
    x make sign out a prop (so it can be hidden on login)
x form validation
- more comprehensive auth error handling
x field error shows up if automatically populated and touched
x confirm email if changed
x make error page
x check if any email works for forgot pw

RESOURCES:
https://asharibali.medium.com/building-a-stop-watch-app-with-next-js-1127c23085a2
https://mdobekidis.medium.com/timer-sync-across-clients-with-supabase-realtime-and-reactjs-6ca3c7730d66
https://github.com/orgs/supabase/discussions/4400
https://github.com/vercel/next.js/blob/canary/examples/next-forms/app/add-form.tsx
https://react.dev/reference/react/useActionState
https:/https://stackoverflow.com/questions/23389098/fill-remaining-vertical-space-only-css/www.reddit.com/r/Supabase/comments/1bzjkr2/recommended_approach_to_accessing_user_data_in/
https://www.reddit.com/r/nextjs/comments/1ezremq/what_is_the_best_way_to_handle_forms/
https://stackoverflow.com/questions/74193093/zod-validation-for-phone-numbers
https://dev.to/bookercodes/nextjs-form-validation-on-the-client-and-server-with-zod-lbc
https://colinhacks.com/essays/reasonable-email-regex
https://stackoverflow.com/questions/54884488/how-can-i-solve-the-error-ts2532-object-is-possibly-undefined
https://supabase.com/docs/guides/auth/passwords?queryGroups=language&language=js&queryGroups=flow&flow=pkce#resetting-a-password
https://www.reddit.com/r/Supabase/comments/1agh2eg/password_recovery_auth_event_is_not_emitted/

EMAIL TEMPLATE:
<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Verify Your Email</title>

<style>

body {

font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

margin: 0;

padding: 0;

background-color: oklch(82.901% 0.031 222.959);

color: oklch(82.901% 0.031 222.959);

line-height: 1.6;

}

.container {

width: 100%;

max-width: 600px;

margin: 30px auto;

background-color: oklch(24.73% 0.02 264.094);

padding: 40px;

border-radius: 8px;

box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

}

h1 {

color: oklch(82.901% 0.031 222.959);

margin-bottom: 20px;

text-align: center;

}

p {

margin-bottom: 25px;

text-align: center;

}

.button {

display: inline-block;

padding: 12px 24px;

background-color: oklch(86.133% 0.141 139.549);

color: oklch(17.226% 0.028 139.549);

text-decoration: none;

border-radius: 6px;

font-weight: 600;

transition: background-color 0.3s ease;

text-align: center;

margin: 20px auto;

display: block;

}

.button:hover {

background-color: oklch(73.375% 0.165 35.353);

}

.footer {

text-align: center;

margin-top: 30px;

color: #777;

font-size: 0.8em;

}

.logo {

display: block;

margin: 0 auto 20px;

max-width: 150px;

}

</style>

</head>

<body>

<div class="container">

<h1>Verify Your Email Address</h1>

<p>Welcome to Irvine Urgent Care!</p>

<p><strong>You can use this web application to clock in and out of your shifts.</strong></p>

<p>Please click the button below to verify your email address and activate your account.</p>

<a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/setaccountinfo" class="button">Verify Email</a>

<p>If you are not an IUC intern, please ignore this email.</p>

</div>

<div class="footer">

<p>&copy; [2025] Irvine Urgent Care Interns. All rights reserved.</p>

</div>

</body>

</body>

</html>
