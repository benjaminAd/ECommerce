import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  private urlBase = 'http://localhost:8888/';

  constructor(private http: HttpClient) {
  }

  getProduits(): Observable<any> {
    // tslint:disable-next-line:no-shadowed-variable
    const url = this.urlBase + 'produits';
    console.log('Dans le service ProduitsService avec ' + url);
    return this.http.get(url);
  }
}
