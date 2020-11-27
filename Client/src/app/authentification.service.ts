import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private user: Subject<string> = new BehaviorSubject(undefined);
  private baseUrl: string = "http://localhost:8888/";

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
    return this.http.post(this.baseUrl + 'membre/connexion', JSON.stringify(identifiants));
  }
}
