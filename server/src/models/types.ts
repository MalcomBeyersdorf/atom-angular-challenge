export interface User {
  email: string; // ID will be the email for simplicity
  createdAt: Date;
}

export interface Task {
  id?: string;
  userEmail: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
}
