import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-app';
  tasks: string[] = [];
  newTask: string = '';
  editIndex: number | null = null;

  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push(this.newTask);
      this.newTask = '';
    }
  }

  editTask(index: number) {
    this.newTask = this.tasks[index];
    this.editIndex = index;
  }

  updateTask() {
    if (this.editIndex !== null && this.newTask.trim() !== '') {
      this.tasks[this.editIndex] = this.newTask;
      this.newTask = '';
      this.editIndex = null;
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }
}
