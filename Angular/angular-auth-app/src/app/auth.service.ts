import { Injectable, signal } from '@angular/core';

export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  avatarUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USERS_KEY = 'auth_users';
  private readonly CURRENT_USER_KEY = 'current_user';

  currentUser = signal<User | null>(null);

  constructor() {
    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    const userStr = localStorage.getItem(this.CURRENT_USER_KEY);
    if (userStr) {
      try {
        this.currentUser.set(JSON.parse(userStr));
      } catch (e) {
        localStorage.removeItem(this.CURRENT_USER_KEY);
      }
    }
  }

  getUsers(): User[] {
    const usersStr = localStorage.getItem(this.USERS_KEY);
    if (usersStr) {
      try {
        return JSON.parse(usersStr);
      } catch (e) {
        return [];
      }
    }
    return [];
  }

  register(newUser: User): { success: boolean; message: string } {
    const users = this.getUsers();
    if (users.find(u => u.username === newUser.username)) {
      return { success: false, message: 'Username is already taken!' };
    }
    if (users.find(u => u.email === newUser.email)) {
      return { success: false, message: 'Email is already registered!' };
    }
    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return { success: true, message: 'Registration successful!' };
  }

  login(username: string, password: string): { success: boolean; message: string } {
    const users = this.getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      return { success: false, message: 'Invalid username or password!' };
    }
    const { password: _, ...userNoPwd } = user;
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userNoPwd));
    this.currentUser.set(userNoPwd);
    return { success: true, message: 'Login successful!' };
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.currentUser.set(null);
  }
}
