export interface ClockInEntry {
  clock_in_time: Date;
  is_clocked_in: boolean;
}

export interface ClockOutEntry {
  clock_out_time: Date;
  is_clocked_in: boolean;
}

export interface HoursWorkedEntry {
  hoursWorked: number;
}

export interface LogInWithEmailEntry {
  email: string;
  password: string;
}

export interface LogInWithUsernameEntry {
  username: string;
  password: string;
}

export interface SetAccountInfoEntry {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
}

export interface SetAccountInfoEntryProps {
  type: string;
  placeholder: string;
  name: ValidFieldNames;

}

export type ValidFieldNames = 
  | "firstName"
  | "lastName"
  | "username"
  | "email"
  | "phoneNumber"
  | "password"


export interface PreSetAccountInfoEntry {
  form?: {
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
  }
  errors?: {
    firstName?: string[];
    lastName?: string[];
    username?: string[];
    email?: string[];
    phoneNumber?: string[];
    password?: string[];
  }
  dbError?: string;
}

export interface UsernameEntry {
  username: string;
}

export interface NavBarTypes {
  pageTitle?: string;
  showAccount?: boolean;
  showSignOut?: boolean;
  showClockIn?: boolean;
}

// emailError for invalid email format
export interface PreLoginEntry {
  form?: {
    email?: string;
    username?: string;
    password?: string;
  }
  errors?: {
    email?: string[];
    username?: string[];
    password?: string[];
  }
  dbError?: string;
}

export interface PreForgotPasswordEntry {
  form?: {
    email?: string;
  }
  errors?: {
    email?: string[];
  }
  dbError?: string;
  success?: boolean;
}
