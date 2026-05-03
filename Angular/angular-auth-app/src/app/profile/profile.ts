import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="profile-container">
      <div *ngIf="user(); else notLoggedIn" class="profile-card glass">
        <div class="profile-header">
          <div class="avatar-circle">
            {{ userInitials() }}
          </div>
          <h2 class="profile-name">{{ user()?.fullName }}</h2>
          <p class="profile-username">&#64;{{ user()?.username }}</p>
        </div>

        <div class="profile-body">
          <div class="info-row">
            <span class="info-label">Account ID</span>
            <span class="info-value code">{{ user()?.id }}</span>
          </div>

          <div class="info-row">
            <span class="info-label">Email Address</span>
            <span class="info-value">{{ user()?.email }}</span>
          </div>
        </div>

        <div class="profile-footer">
          <button (click)="logout()" class="btn btn-secondary btn-block">
            Log Out
          </button>
        </div>
      </div>

      <ng-template #notLoggedIn>
        <div class="profile-card glass not-logged-in">
          <span class="alert-icon large">🔒</span>
          <h2>Access Denied</h2>
          <p>Please log in to view your profile details and dashboard data.</p>
          <a routerLink="/login" class="btn btn-primary btn-block">Log In</a>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .profile-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 80px);
      padding: 1.5rem;
    }
    .profile-card {
      width: 100%;
      max-width: 480px;
      padding: 2.5rem;
      border-radius: 20px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .profile-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 2rem;
      text-align: center;
    }
    .avatar-circle {
      width: 84px;
      height: 84px;
      border-radius: 50%;
      background: linear-gradient(135deg, #4f46e5, #4338ca);
      color: white;
      font-size: 2.25rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.25rem;
      box-shadow: 0 8px 24px rgba(79, 70, 229, 0.35);
      border: 4px solid #ffffff;
      text-transform: uppercase;
    }
    .profile-name {
      font-size: 1.75rem;
      font-weight: 700;
      color: #1e1b4b;
      margin-bottom: 0.25rem;
      letter-spacing: -0.5px;
    }
    .profile-username {
      font-size: 1rem;
      color: #64748b;
      font-weight: 500;
    }
    .profile-body {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      margin-bottom: 2.5rem;
      background: rgba(255, 255, 255, 0.4);
      padding: 1.25rem;
      border-radius: 14px;
      border: 1px solid rgba(255, 255, 255, 0.5);
    }
    .info-row {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }
    .info-label {
      font-size: 0.75rem;
      font-weight: 700;
      color: #4338ca;
      text-transform: uppercase;
      letter-spacing: 0.75px;
    }
    .info-value {
      font-size: 1.05rem;
      color: #0f172a;
      font-weight: 500;
    }
    .info-value.code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 0.95rem;
      color: #64748b;
    }
    .profile-footer {
      width: 100%;
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
    .btn-secondary {
      background: #f1f5f9;
      color: #334155;
      border: 1.5px solid #e2e8f0;
    }
    .btn-secondary:hover {
      background: #e2e8f0;
      color: #0f172a;
    }
    .btn-primary {
      background: linear-gradient(135deg, #4f46e5, #4338ca);
      color: white;
    }
    .btn-primary:hover {
      background: linear-gradient(135deg, #4338ca, #3730a3);
      transform: translateY(-1px);
    }
    .btn-block {
      width: 100%;
    }
    .not-logged-in {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 1rem;
    }
    .alert-icon.large {
      font-size: 3rem;
      margin-bottom: 0.5rem;
    }
    .not-logged-in h2 {
      font-size: 1.75rem;
      font-weight: 700;
      color: #1e1b4b;
    }
    .not-logged-in p {
      color: #64748b;
      font-size: 0.95rem;
      margin-bottom: 1rem;
    }
  `]
})
export class ProfileComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  user = this.authService.currentUser;

  userInitials = computed(() => {
    const u = this.user();
    if (!u) return '?';
    const names = u.fullName.trim().split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return u.fullName.substring(0, 2).toUpperCase();
  });

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
