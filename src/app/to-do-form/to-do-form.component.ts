import { Component, OnInit } from '@angular/core';
import {forkJoin, Observable} from "rxjs";
import {ItemService} from "../services/to-do.service";
import {FormBuilder, Validators} from "@angular/forms";
import {BackendService} from "../services/backend.service";
import {Items} from "../interfaces/items";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-to-do-form',
  templateUrl: './to-do-form.component.html',
  styleUrls: ['./to-do-form.component.css']
})
export class ToDoFormComponent {

  form = this.fb.group({
    item: ['']
  })
  itemList$!: Observable<Items[]>;

  constructor(private itemService: ItemService, private fb: FormBuilder) {
    this.itemList$ = this.itemService.getAll();
  }

  async add() {
    this.itemService.add({item: this.form.controls['item'].value});
    this.itemList$ = await this.itemService.getAll();
  }

  async delete(item: any) {
    this.itemService.delete(item._id);
    this.itemList$ = await this.itemService.getAll();
  }

}
