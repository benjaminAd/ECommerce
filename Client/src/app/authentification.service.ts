import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

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
  public admin: Subject<boolean> = new BehaviorSubject(undefined);

  constructor(private http: HttpClient, private router: Router) {
  }

  getUser() {
    return this.user;
  }

  connect(data: string) {
    this.user.next(data);
  }

  disconnect() {
    this.user.next(null);
    this.email = "";
    this.admin.next(null);
    this.router.navigate(['/connexion']);
  }

  verificationConnexion(identifiants): Observable<any> {
    this.email = identifiants.email;
    this.setAdmin(identifiants.admin);
    return this.http.post(this.baseUrl + 'membre/connexion', JSON.stringify(identifiants), httpOptions);
  }

  getEmail(): string {
    return this.email;
  }

  setAdmin(admin) {
    this.admin.next(admin);
  }

  getAdmin() {
    return this.admin;
  }
}
