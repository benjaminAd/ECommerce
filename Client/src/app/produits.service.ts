import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Methods": "GET,POST",
    "Access-Control-Allow-Headers": "Content-type",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  })
};

@Injectable({
  providedIn: 'root'
})


export class ProduitsService {
  private urlBase = 'http://localhost:8888/';

  constructor(private http: HttpClient) {
  }

  getProduits(): Observable<any> {
    const url = this.urlBase + 'produits';
    //  console.log('Dans le service ProduitsService avec ' + url);
    return this.http.get(url);
  }

  getCategories(): Observable<any> {
    const url = this.urlBase + 'categories';
    return this.http.get(url);
  }

  getMarques(): Observable<any> {
    const url = this.urlBase + 'marques';
    return this.http.get(url);
  }

  addProduit(infos): Observable<any> {
    const url = this.urlBase + 'produits/ajouter';
    return this.http.post(url, infos, httpOptions);
  }

  getProduitFromResearch(research): Observable<any> {
    const url = this.urlBase + 'produit/research';
    return this.http.post(url, research, httpOptions);
  }
}
