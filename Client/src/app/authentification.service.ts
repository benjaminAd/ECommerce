import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

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
export class AuthentificationService {
  private user: Subject<string> = new BehaviorSubject(undefined);
  private baseUrl: string = "http://localhost:8888/";
  public email: string;

  constructor(private http: HttpClient) {
  }

  getUser() {
    return this.user;
  }

  connect(data: string) {
    this.user.next(data);
  }

  disconnect() {
    this.user.next(null);
  }

  verificationConnexion(identifiants): Observable<any> {
    this.email = identifiants.email;
    return this.http.post(this.baseUrl + 'membre/connexion', JSON.stringify(identifiants), httpOptions);
  }

  getEmail(): String {
    return this.email;
  }
}
