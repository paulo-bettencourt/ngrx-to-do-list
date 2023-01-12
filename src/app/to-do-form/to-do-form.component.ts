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

  loading$: Observable<boolean>;
  heroes$: Observable<any[]>;
  form = this.fb.group({
    item: ['']
  })
  itemList$!: Observable<any>;

  constructor(private itemService: ItemService, private fb: FormBuilder, private backendService: BackendService) {
    this.heroes$ = itemService.entities$;
    this.loading$ = itemService.loading$;
    console.log("componente")
    this.itemList$ = this.backendService.getAllItems();
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

  onSubmit() {

    const itemData = this.form.controls.item.value;

    this.add(itemData);

   // this.heroes$.subscribe(data =>console.log("ENTIDADES", data))

    let item = {
      item: itemData
    }
    console.log("ITEM É ESTE", item)

    this.backendService.postItem(item).subscribe(data => {
      console.log(data)
    })
  }
}
