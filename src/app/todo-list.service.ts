import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Todo {
  task: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private todoListSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  todoList$: Observable<Todo[]> = this.todoListSubject.asObservable();

  addTask(task: string): void {
    const currentList = this.todoListSubject.value;
    this.todoListSubject.next([...currentList, { task, completed: false }]);
  }

  deleteTask(index: number): void {
    const currentList = this.todoListSubject.value;
    currentList.splice(index, 1);
    this.todoListSubject.next([...currentList]);
  }

  toggleCompleted(index: number): Observable<Todo[]> {
    const currentList = this.todoListSubject.value;
    currentList[index].completed = !currentList[index].completed;
    this.todoListSubject.next([...currentList]);
    return this.todoList$;
  }
}
