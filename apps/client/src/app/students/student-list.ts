import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { StudentService } from './student.service';
import { Student } from './student.model';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList implements OnInit {

  students: Student[] = [];

  searchText = '';

  isEditing = false;

  formStudent: Student = this.createEmptyStudent();

  constructor(
    private studentService: StudentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  // Tạo form rỗng
  createEmptyStudent(): Student {
    return {
      masv: '',
      hoten: '',
      lop: '',
      khoa: 'Công nghệ thông tin',
      email: '',
      trangthai: true,
    };
  }

  // ==========================
  // TẢI DANH SÁCH TỪ DATABASE
  // ==========================
  async loadStudents(): Promise<void> {
    try {

      const data = await firstValueFrom(
        this.studentService.getAll()
      );

      this.students = [...data].sort((a, b) =>
        a.masv.localeCompare(
          b.masv,
          undefined,
          {
            numeric: true,
            sensitivity: 'base',
          }
        )
      );

      this.cdr.detectChanges();

    } catch (error) {

      console.error(
        'Lỗi tải danh sách:',
        error
      );

      alert(
        'Không thể tải danh sách sinh viên'
      );
    }
  }

  // ==========================
  // TÌM KIẾM
  // ==========================
  get filteredStudents(): Student[] {

    const keyword = this.searchText
      .trim()
      .toLowerCase();

    if (!keyword) {
      return this.students;
    }

    return this.students.filter((student) =>

      student.masv
        .toLowerCase()
        .includes(keyword) ||

      student.hoten
        .toLowerCase()
        .includes(keyword) ||

      student.lop
        .toLowerCase()
        .includes(keyword) ||

      student.email
        .toLowerCase()
        .includes(keyword)

    );
  }

  // ==========================
  // THÊM / SỬA
  // ==========================
  async saveStudent(): Promise<void> {

    // Chuẩn hóa dữ liệu
    this.formStudent.masv =
      this.formStudent.masv
        .trim()
        .toUpperCase();

    this.formStudent.hoten =
      this.formStudent.hoten.trim();

    this.formStudent.lop =
      this.formStudent.lop.trim();

    this.formStudent.khoa =
      this.formStudent.khoa.trim();

    this.formStudent.email =
      this.formStudent.email.trim();

    // Kiểm tra nhập đủ
    if (
      !this.formStudent.masv ||
      !this.formStudent.hoten ||
      !this.formStudent.lop ||
      !this.formStudent.khoa ||
      !this.formStudent.email
    ) {

      alert(
        'Vui lòng nhập đầy đủ thông tin'
      );

      return;
    }

    // Kiểm tra mã sinh viên
    const studentCodePattern = /^SV\d{3}$/;

    if (
      !studentCodePattern.test(
        this.formStudent.masv
      )
    ) {

      alert(
        'Mã sinh viên phải có dạng SV + 3 số. Ví dụ: SV013'
      );

      return;
    }

    // ==========================
    // SỬA SINH VIÊN
    // ==========================
    if (this.isEditing) {

      try {

        await firstValueFrom(
          this.studentService.update(
            this.formStudent.masv,
            this.formStudent
          )
        );

        // Đọc lại dữ liệu thật từ database
        await this.loadStudents();

        this.resetForm();

        alert(
          'Cập nhật sinh viên thành công'
        );

      } catch (error) {

        console.error(
          'Lỗi cập nhật:',
          error
        );

        alert(
          'Cập nhật sinh viên thất bại'
        );
      }

      return;
    }

    // ==========================
    // KIỂM TRA TRÙNG MÃ KHI THÊM
    // ==========================
    const studentExists =
      this.students.some(
        (student) =>
          student.masv.toUpperCase() ===
          this.formStudent.masv
      );

    if (studentExists) {

      alert(
        'Mã sinh viên đã tồn tại'
      );

      return;
    }

    // ==========================
    // THÊM SINH VIÊN
    // ==========================
    try {

      await firstValueFrom(
        this.studentService.create(
          this.formStudent
        )
      );

      // Đọc lại dữ liệu thật từ database
      await this.loadStudents();

      this.resetForm();

      alert(
        'Thêm sinh viên thành công'
      );

    } catch (error) {

      console.error(
        'Lỗi thêm:',
        error
      );

      alert(
        'Thêm sinh viên thất bại'
      );
    }
  }

  // ==========================
  // CHỌN SINH VIÊN ĐỂ SỬA
  // ==========================
  editStudent(student: Student): void {

    this.isEditing = true;

    this.formStudent = {
      ...student,
    };

    this.cdr.detectChanges();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // ==========================
  // XÓA SINH VIÊN
  // ==========================
  async deleteStudent(
    masv: string
  ): Promise<void> {

    const confirmDelete = confirm(
      `Bạn có chắc muốn xóa sinh viên ${masv}?`
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await firstValueFrom(
        this.studentService.delete(masv)
      );

      // Nếu đang sửa đúng SV vừa xóa
      if (
        this.isEditing &&
        this.formStudent.masv === masv
      ) {
        this.resetForm();
      }

      // Đọc lại dữ liệu thật từ database
      await this.loadStudents();

      alert(
        'Xóa sinh viên thành công'
      );

    } catch (error) {

      console.error(
        'Lỗi xóa:',
        error
      );

      alert(
        'Xóa sinh viên thất bại'
      );
    }
  }

  // ==========================
  // RESET FORM
  // ==========================
  resetForm(): void {

    this.isEditing = false;

    this.formStudent =
      this.createEmptyStudent();

    this.cdr.detectChanges();
  }
}