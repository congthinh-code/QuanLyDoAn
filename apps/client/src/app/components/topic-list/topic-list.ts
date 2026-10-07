import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopicService, Topic, StudentRegistration } from '../../services/topic.service';

@Component({
  selector: 'app-topic-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './topic-list.html',
  styleUrls: ['./topic-list.css']
})
export class TopicListComponent implements OnInit {
  topics: Topic[] = [];

  // Form tạo đề tài mới
  newTopic: Topic = {
    tendetai: '',
    mota: '',
    giangvien: '',
    soluongtoida: 5
  };
  showCreateModal: boolean = false;

  // Xem chi tiết đề tài
  selectedTopic: Topic | null = null;
  showDetailModal: boolean = false;

  // Xem danh sách sinh viên đăng ký
  registeredStudents: StudentRegistration[] = [];
  selectedTopicTitleForStudents: string = '';
  showStudentsModal: boolean = false;

  constructor(
    private topicService: TopicService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTopics();
  }

  // Lấy danh sách tất cả đề tài
  loadTopics(): void {
    this.topicService.getTopics().subscribe({
      next: (data) => {
        this.topics = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Lỗi lấy danh sách đề tài:', err)
    });
  }

  // Mở modal tạo đề tài
  openCreateModal(): void {
    this.newTopic = { tendetai: '', mota: '', giangvien: '', soluongtoida: 5 };
    this.showCreateModal = true;
  }

  // Submit tạo đề tài mới
  onCreateTopic(): void {
    if (!this.newTopic.tendetai || !this.newTopic.giangvien) {
      alert('Vui lòng nhập đầy đủ Tên đề tài và Giảng viên!');
      return;
    }
    this.topicService.createTopic(this.newTopic).subscribe({
      next: () => {
        alert('Tạo đề tài thành công!');
        this.showCreateModal = false;
        this.loadTopics();
      },
      error: (err) => {
        console.error('Lỗi khi tạo đề tài:', err);
        alert('Tạo đề tài thất bại!');
      }
    });
  }

  // Xem chi tiết 1 đề tài
  viewDetail(id: number): void {
    this.topicService.getTopicById(id).subscribe({
      next: (data) => {
        this.selectedTopic = data;
        this.showDetailModal = true;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Lỗi lấy chi tiết đề tài:', err)
    });
  }

  // Xem danh sách sinh viên đăng ký đề tài
  viewStudents(topic: Topic): void {
  if (!topic) return;

  const topicId = (topic as any).id || (topic as any).madetai;
  this.selectedTopicTitleForStudents = topic.tendetai;
  this.registeredStudents = [];

  this.topicService.getRegisteredStudents(topicId).subscribe({
    next: (res: any) => {
      console.log('Dữ liệu Backend:', res);
      // Lấy đúng mảng danhSachSinhVien từ response
      this.registeredStudents = res?.danhSachSinhVien || (Array.isArray(res) ? res : []);
      this.showStudentsModal = true;
      this.cdr.detectChanges(); // Ép Angular cập nhật lại UI
    },
    error: (err: any) => {
      console.error('Lỗi khi lấy danh sách sinh viên:', err);
    }
  });
}
}