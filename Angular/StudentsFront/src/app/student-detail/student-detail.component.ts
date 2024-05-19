import { Component } from '@angular/core';
import { Student } from '../student';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';
import { CommonModule, Location, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [NgIf, CommonModule, FormsModule],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.css',
})
export class StudentDetailComponent {
  student?: Student;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location
  ) {}

  getStudent(): void {
    const pathId = this.route.snapshot.paramMap.get('id');
    if (pathId) {
      this.studentService
        .getStudent(+pathId)
        .subscribe((student) => (this.student = student));
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.studentService
      .updateStudent(this.student!)
      .subscribe(() => this.goBack());
  }

  ngOnInit() {
    this.getStudent();
  }
}
