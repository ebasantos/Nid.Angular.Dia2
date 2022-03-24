import { environment } from './../../environments/environment';
import { Todo } from './../todo/model/todo';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { Observable, of, map } from 'rxjs';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  todoList$: Observable<Todo[]> = of();
  todoForm = new FormGroup({
    descricao: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
  });
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.obterDados();
  }

  concluirTarefa(item: Todo): void {
    item.concluido = !item.concluido;
    this.todoService.concluirTarefa(item).subscribe(
      (resposta) => this.obterDados(),
      (erro) => this.tratarErro(erro)
    );
  }

  removerTarefa(id: number): void {
    this.todoService.removerTarefa(id).subscribe(
      (resposta) => this.obterDados(),
      (erro) => this.tratarErro(erro)
    );
  }

  private tratarErro(erro: any): void {
    console.log('ops... não foi possível obter os dados');
    this.obterDados();
  }

  obterDados(): void {
    this.todoList$ = this.todoService.obterDados().pipe(map((res) => res));
  }

  salvar() {
    if (this.todoForm.invalid) {
      alert('preencha o campo descricao corretamente');
      return;
    }

    alert('registro inserido com sucesso');
    let newTodo = {
      descricao: this.todoForm.controls['descricao'].value,
    };

    this.todoService.salvar(newTodo).subscribe(
      (resposta) => this.obterDados(),
      (erro) => this.tratarErro(erro)
    );

    this.todoForm.reset();
  }
}
