import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="login-container">
      <div class="login-card glass">
        <h2 class="form-title">Welcome Back</h2>
        <p class="form-subtitle">Log in to your dashboard and manage your account</p>

        <form (ngSubmit)="onLogin()" #loginForm="ngForm" class="auth-form">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              [(ngModel)]="username"
              required
              placeholder="e.g. johndoe"
              class="form-input"
              #u="ngModel"
            />
            <div *ngIf="u.invalid && u.touched" class="error-msg">Username is required</div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="password"
              required
              placeholder="••••••••"
              class="form-input"
              #p="ngModel"
            />
            <div *ngIf="p.invalid && p.touched" class="error-msg">Password is required</div>
          </div>

          <button type="submit" [disabled]="loginForm.invalid" class="btn btn-primary btn-block">
            Sign In
          </button>
        </form>

        <div *ngIf="error" class="alert error">
          <span class="alert-icon">⚠️</span> {{ error }}
        </div>

        <div *ngIf="success" class="alert success">
          <span class="alert-icon">✨</span> {{ success }}
        </div>

        <div class="form-footer">
          Don't have an account? <a routerLink="/register" class="link">Create one</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 80px);
      padding: 1.5rem;
    }
    .login-card {
      width: 100%;
      max-width: 420px;
      padding: 2.5rem;
      border-radius: 20px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .form-title {
      font-size: 2rem;
      font-weight: 700;
      color: #1e1b4b;
      margin-bottom: 0.5rem;
      text-align: center;
      letter-spacing: -0.5px;
    }
    .form-subtitle {
      font-size: 0.95rem;
      color: #64748b;
      margin-bottom: 2rem;
      text-align: center;
    }
    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #4338ca;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .form-input {
      padding: 0.8rem 1rem;
      border-radius: 12px;
      border: 1.5px solid #e2e8f0;
      background: rgba(255, 255, 255, 0.8);
      font-size: 1rem;
      color: #0f172a;
      transition: all 0.2s ease;
    }
    .form-input:focus {
      outline: none;
      border-color: #4f46e5;
      background: #ffffff;
      box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.15);
    }
    .error-msg {
      font-size: 0.8rem;
      color: #ef4444;
      margin-top: 0.2rem;
    }
    .btn {
      cursor: pointer;
      padding: 0.85rem 1.5rem;
      border-radius: 12px;
      font-weight: 600;
      font-size: 1rem;
      transition: all 0.2s ease;
      border: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .btn-primary {
      background: linear-gradient(135deg, #4f46e5, #4338ca);
      color: white;
      box-shadow: 0 4px 12px rgba(67, 56, 202, 0.25);
    }
    .btn-primary:not(:disabled):hover {
      background: linear-gradient(135deg, #4338ca, #3730a3);
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(67, 56, 202, 0.35);
    }
    .btn-block {
      width: 100%;
      margin-top: 0.5rem;
    }
    .alert {
      padding: 0.85rem 1rem;
      border-radius: 12px;
      margin-top: 1.25rem;
      font-size: 0.9rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .alert-icon {
      font-size: 1.1rem;
    }
    .alert.error {
      background: #fef2f2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }
    .alert.success {
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
    }
    .form-footer {
      margin-top: 1.5rem;
      font-size: 0.9rem;
      color: #64748b;
      text-align: center;
    }
    .link {
      color: #4f46e5;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.2s ease;
    }
    .link:hover {
      color: #3730a3;
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  success = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.error = '';
    this.success = '';
    const res = this.authService.login(this.username, this.password);
    if (res.success) {
      this.success = res.message;
      setTimeout(() => this.router.navigate(['/profile']), 1000);
    } else {
      this.error = res.message;
    }
  }
}
