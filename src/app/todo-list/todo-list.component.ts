import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoListService } from '../todo-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
  todoList: { task: string, completed: boolean }[] = [];
  newTask: string = '';
  private subscription: Subscription = new Subscription();

  constructor(private todoListService: TodoListService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.todoListService.todoList$.subscribe(todoList => {
        this.todoList = todoList;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addTask(task: string): void {
    if (task.trim() !== "") {
      this.todoListService.addTask(task.trim());
      this.newTask = ''; // Réinitialisez le champ de saisie après avoir ajouté une tâche
    }
  }

  deleteTask(index: number): void {
    this.todoListService.deleteTask(index);
  }

  toggleCompleted(index: number): void {
    this.subscription.add(
      this.todoListService.toggleCompleted(index).subscribe(todoList => {
        this.todoList = todoList;
      })
    );
  }
}
