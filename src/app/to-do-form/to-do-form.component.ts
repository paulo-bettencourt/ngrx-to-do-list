import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {HeroService} from "../services/to-do.service";
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
  itemList!: Observable<any>;

  constructor(private heroService: HeroService, private fb: FormBuilder, private backendService: BackendService) {
    this.heroes$ = heroService.entities$;
    this.loading$ = heroService.loading$;
    console.log("componente")
    this.itemList = this.backendService.getAllItems()
  }

  ngOnInit() {
    this.getHeroes();
  }

  add(hero: any) {
    this.heroService.add(hero);
  }

  delete(hero: any) {
    this.heroService.delete(hero.id);
  }

  getHeroes() {
    this.heroService.getAll();
  }

  update(hero: any) {
    this.heroService.update(hero);
  }

  onSubmit() {
    let item = {
      item: this.form.controls.item.value
    }
    console.log("ITEM É ESTE", item)

    this.backendService.postItem(item).subscribe(data => {
      console.log(data)
    })
  }
}
