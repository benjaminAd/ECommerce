import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private urlBase = 'http://localhost:8888/';

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<any> {
    const url = this.urlBase + 'categories';
    return this.http.get(url);
  }
}
