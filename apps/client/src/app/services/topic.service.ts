import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Topic {
  id?: number;
  madetai?: number;
  tendetai: string;
  mota: string;
  giangvien: string;
  soluongtoida: number;
  soluongdadangky?: number;
}

export interface StudentRegistration {
  id: number;
  madetai: number;
  masv: string;
  ngay_dangky?: string | Date;
}

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private apiUrl = 'http://localhost:3000/topics';

  constructor(private http: HttpClient) {}

  // 1. Lấy danh sách đề tài
  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.apiUrl);
  }

  // 2. Lấy thông tin 1 đề tài theo ID
  getTopicById(id: number): Observable<Topic> {
    return this.http.get<Topic>(`${this.apiUrl}/${id}`);
  }

  // 3. Tạo đề tài mới
  createTopic(topic: Topic): Observable<Topic> {
    return this.http.post<Topic>(this.apiUrl, topic);
  }

  // 4. Lấy danh sách sinh viên đã đăng ký đề tài theo ID
  getRegisteredStudents(topicId: number): Observable<StudentRegistration[]> {
    return this.http.get<StudentRegistration[]>(`${this.apiUrl}/${topicId}/students`);
  }
}