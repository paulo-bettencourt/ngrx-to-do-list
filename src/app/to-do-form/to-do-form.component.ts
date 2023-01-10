import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {HeroService} from "../services/to-do.service";

@Component({
  selector: 'app-to-do-form',
  templateUrl: './to-do-form.component.html',
  styleUrls: ['./to-do-form.component.css']
})
export class ToDoFormComponent implements OnInit {

  loading$: Observable<boolean>;
  heroes$: Observable<any[]>;

  constructor(private heroService: HeroService) {
    this.heroes$ = heroService.entities$;
    this.loading$ = heroService.loading$;
  }

  ngOnInit() {
    this.getHeroes();
    console.log(this.getHeroes())
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


}
