import { TodoService } from './../../services/todo.service';
import { ITodo } from './../../models/todo';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TodoTableDataSource } from './todo-table-datasource';

@Component({
  selector: 'ac-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.css']
})
export class TodoTableComponent implements AfterViewInit {

  todos: ITodo[];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title', 'completed'];

  constructor(private todoService: TodoService) {}

  ngAfterViewInit() {
    this.todoService.getAllTodos().subscribe(todos => {
        this.todos = todos;
        console.log(this.todos);
    });
  }
}
