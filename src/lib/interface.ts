export interface ClockInOutEntry {
  name: string;
  status: string;
}

export interface LogInEntry {
  email: string;
  password: string;
}

export interface SetAccountInfoEntry {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
}
