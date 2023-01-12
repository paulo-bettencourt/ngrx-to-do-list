import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {ItemService} from "../services/to-do.service";
import {FormBuilder, Validators} from "@angular/forms";
import {BackendService} from "../services/backend.service";
import {Items} from "../interfaces/items";

@Component({
  selector: 'app-to-do-form',
  templateUrl: './to-do-form.component.html',
  styleUrls: ['./to-do-form.component.css']
})
export class ToDoFormComponent implements OnInit {

  form = this.fb.group({
    item: ['']
  })
  itemList$!: Observable<any>;

  constructor(private itemService: ItemService, private fb: FormBuilder, private backendService: BackendService) {
    this.itemList$ = this.itemService.getAll();
  }

  ngOnInit() {
    this.getHeroes();
  }

  add(item: any) {
    this.itemService.add(item);
  }

  delete(hero: any) {
    this.itemService.delete(hero.id);
  }

  getHeroes() {
    this.itemService.getAll();
  }

  update(hero: any) {
    this.itemService.update(hero);
  }

  async onSubmit() {

    const itemData = this.form.controls['item'].value;

    this.add({item: itemData});

    this.itemList$ = await this.itemService.getAll();

    console.log('ok')

  }

  onDelete(_id: any) {
    this.delete(_id);

  }
}
