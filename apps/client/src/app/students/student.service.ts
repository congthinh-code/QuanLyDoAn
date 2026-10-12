import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Student } from './student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {

  private apiUrl =
    'http://localhost:3003/sinhvien';

  constructor(
    private http: HttpClient
  ) {}

  // Lấy tất cả sinh viên
  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(
      this.apiUrl
    );
  }

  // Lấy một sinh viên
  getById(
    masv: string
  ): Observable<Student> {

    return this.http.get<Student>(
      `${this.apiUrl}/${masv}`
    );
  }

  // Thêm sinh viên
  create(
    student: Student
  ): Observable<Student> {

    return this.http.post<Student>(
      this.apiUrl,
      student
    );
  }

  // Sửa sinh viên
  update(
    masv: string,
    student: Student
  ): Observable<Student> {

    // Không gửi masv trong body
    const {
      masv: _,
      ...updateData
    } = student;

    return this.http.put<Student>(
      `${this.apiUrl}/${masv}`,
      updateData
    );
  }

  // Xóa sinh viên
  delete(
    masv: string
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${masv}`
    );
  }
}