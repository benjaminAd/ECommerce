import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthentificationService} from "../authentification.service";
import {Observable} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Methods": "GET,POST",
    "Access-Control-Allow-Headers": "Content-type",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  })
};

@Component({
  selector: 'app-panier-view',
  templateUrl: './panier-view.component.html',
  styleUrls: ['./panier-view.component.css']
})
export class PanierViewComponent implements OnInit {
  user: String;
  public utilisateur: any;
  public panier: [];

  constructor(private http: HttpClient, private authService: AuthentificationService, private route: ActivatedRoute) {
    this.user = this.authService.getEmail();
    this.utilisateur = this.authService.getUser();
  }

  ngOnInit(): void {
    console.log(this.user);
    this.http.post("http://localhost:8888/panier", JSON.stringify({email: this.user}), httpOptions).subscribe((resultat: any) => {
      console.log(resultat);
      this.panier = resultat;
    });
  }

}
