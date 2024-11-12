import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Task {
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  tasks: Task[] = [];
  newTaskTitle: string = '';
  newTaskDescription: string = '';

  // Função para adicionar uma nova tarefa
  addTask() {
    if (this.newTaskTitle.trim() && this.newTaskDescription.trim()) {
      const newTask: Task = {
        title: this.newTaskTitle.trim(),
        description: this.newTaskDescription.trim(),
        isCompleted: false,
        createdAt: new Date().toLocaleString()  // Formato de data
      };
      this.tasks.push(newTask);
      this.newTaskTitle = '';
      this.newTaskDescription = '';
    }
  }

  // Função para alternar o estado de conclusão de uma tarefa
  toggleTask(index: number) {
    this.tasks[index].isCompleted = !this.tasks[index].isCompleted;
  }

  // Função para remover uma tarefa
  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }
}
