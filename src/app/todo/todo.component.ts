import { Component, Input, OnInit } from '@angular/core';
import { Todo } from './model/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  @Input() title: string = 'titulo padrão';
  model: Todo = { descricao: '', concluido: false, id: 0 };
  todoList: Todo[] = [];
  constructor() {}

  ngOnInit(): void {}

  salvar() {
    if (!this.model.descricao) {
      alert('preencha o campo descricao corretamente');
      return;
    }

    alert('registro inserido com sucesso');
    let newTodo: Todo = {
      descricao: this.model.descricao,
      concluido: false,
      id: 0,
    };
    this.todoList.push(newTodo);
    this.model.descricao = '';
  }
}
