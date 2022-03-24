import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  todoList: { descricao: string }[] = [];
  todoForm = new FormGroup({
    descricao: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
  });
  constructor() {}

  ngOnInit(): void {}

  salvar() {
    if (this.todoForm.invalid) {
      alert('preencha o campo descricao corretamente');
      return;
    }

    alert('registro inserido com sucesso');
    let newTodo = {
      descricao: this.todoForm.controls['descricao'].value,
    };
    this.todoList.push(newTodo);
    this.todoForm.reset();
  }
}
