import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

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
export class InscriptionService {

  private baseUrl: string = "http://localhost:8888/";

  constructor(private http: HttpClient) {
  }

  inscription(utilisateur): Observable<any> {
    return this.http.post(this.baseUrl + 'membre/inscription', JSON.stringify(utilisateur), httpOptions);
  }
}
