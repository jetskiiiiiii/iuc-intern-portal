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

export interface LogInEntry {
  email: string;
  password: string;
}

export interface SetAccountInfoEntry {
  user_ID: string,
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
}
