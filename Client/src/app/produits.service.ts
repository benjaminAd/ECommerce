import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  // private urlBase = 'http://localhost:8888/';

  constructor(private http: HttpClient) {
  }

  getProduits(): Observable<any> {
    // const url = 'http://localhost:8888/produits';
    //  console.log('Dans le service ProduitsService avec ' + url);
    return this.http.get('http://localhost:8888/produits');
  }
}
