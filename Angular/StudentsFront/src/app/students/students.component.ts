import { Component } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { NgFor } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [NgFor, RouterModule, RouterOutlet],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent {
  students!: Student[];
  constructor(private studentService: StudentService) {}

  getStudents(): void {
    this.studentService
      .getStudents()
      .subscribe((students) => (this.students = students));
  }

  create(index: number, firstName: string, lastName: string): void {
    this.studentService
      .createStudent(new Student(index, firstName, lastName))
      .subscribe((student) => {
        this.students.push(student);
      });
  }

  delete(student: Student): void {
    this.students = this.students.filter((s) => s.id !== student.id);
    this.studentService.deleteStudent(student).subscribe();
  }

  ngOnInit() {
    this.getStudents();
  }
}
