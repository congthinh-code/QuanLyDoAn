import { Component, OnInit, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="max-width: 450px; margin: 50px auto; padding: 20px; border: 1px solid #28a745; border-radius: 8px;">
      <h2>Trang Cá Nhân</h2>

      <div *ngIf="userInfo; else loading">
        <p><strong>Mã SV:</strong> {{ userInfo.username }}</p>
        <p><strong>Vai trò:</strong> {{ userInfo.role }}</p>
      </div>

      <ng-template #loading>
        <p>Đang tải thông tin cá nhân...</p>
      </ng-template>

      <hr style="margin: 20px 0;">

      <button (click)="testAdminRoute()" style="padding: 8px 15px; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Test API Admin-Only
      </button>

      <p *ngIf="adminMessage" style="color: green; margin-top: 10px;">{{ adminMessage }}</p>
      <p *ngIf="adminError" style="color: red; margin-top: 10px;">{{ adminError }}</p>

      <br><br>
      <button (click)="onLogout()" style="padding: 6px 12px; background-color: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Đăng xuất
      </button>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  userInfo: any = null;
  adminMessage = '';
  adminError = '';

  @Output() loggedOut = new EventEmitter<void>();
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (res) => {
        this.userInfo = res.user;
      },
      error: (err) => {
        console.error('Không thể lấy profile:', err);
      }
    });
  }

  testAdminRoute(): void {
    this.adminMessage = '';
    this.adminError = '';

    this.authService.getAdminData().subscribe({
      next: (res) => {
        this.adminMessage = res.message;
      },
      error: (err) => {
        if (err.status === 403) {
          this.adminError = 'Bị chặn (403 Forbidden): Bạn chỉ là STUDENT, không có quyền Admin!';
        } else {
          this.adminError = 'Lỗi truy cập API Admin!';
        }
      }
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.loggedOut.emit();
  }
}