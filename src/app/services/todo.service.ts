import { ITodoAdd } from './../models/todo-add';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITodo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient) { }

  getAllTodos(): Observable<ITodo[]> {
    return this.httpClient.get<ITodo[]>(`http://localhost:5001/api/todo`);
  }

  addTodo(todo: ITodoAdd) {
    return this.httpClient.post<ITodo>(`http://localhost:5001/api/todo`, todo);
  }
}
