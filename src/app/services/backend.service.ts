import {Injectable} from "@angular/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Items} from "../interfaces/items";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  url = 'http://localhost:3000/'

  constructor(private http: HttpClient) {
  }

  getAllItems(): Observable<Items[]> {
    return this.http.get<Items[]>(this.url);
  }

  postItem(item: {}) {
    return this.http.post<Items>(this.url + 'post-to-do', item);
  }

}
