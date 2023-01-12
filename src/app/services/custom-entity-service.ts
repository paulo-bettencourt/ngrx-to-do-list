import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  EntityCollectionDataService,
  DefaultDataService,
  HttpUrlGenerator,
  Logger,
  QueryParams
} from '@ngrx/data';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Items} from "../interfaces/items";

@Injectable()
export class CustomEntityService extends DefaultDataService<Items> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger) {
    super('Hero', http, httpUrlGenerator);
    logger.log('Created custom Hero EntityDataService');
  }

  override getAll(): Observable<Items[]> {
    return super.getAll().pipe(map(heroes => heroes.map(hero => this.mapHero(hero))));
  }

  override getById(id: string | number): Observable<Items> {
    return super.getById(id).pipe(map(hero => this.mapHero(hero)));
  }

  override getWithQuery(params: string | QueryParams): Observable<Items[]> {
    return super.getWithQuery(params).pipe(map(heroes => heroes.map(hero => this.mapHero(hero))));
  }

  private mapHero(hero: Items): any {
    return { ...hero, dateLoaded: new Date() };
  }
}
