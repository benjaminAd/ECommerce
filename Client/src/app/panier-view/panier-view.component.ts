import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthentificationService} from "../authentification.service";
import {Observable} from "rxjs";
import {ActivatedRoute, NavigationEnd, Params, Router} from "@angular/router";

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
export class PanierViewComponent implements OnInit, OnDestroy {
  user: String;
  public utilisateur: any;
  public panier: any;
  public prixTot = 0;
  subscription;
  public message: string;

  constructor(private http: HttpClient, private authService: AuthentificationService, private router: Router) {
    this.user = this.authService.getEmail();
    this.utilisateur = this.authService.getUser();
    this.subscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialisePanier();
      }
    });
  }

  ngOnInit(): void {
    // this.initialisePanier();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  initialisePanier() {
    this.http.post("http://localhost:8888/panier", JSON.stringify({email: this.user}), httpOptions).subscribe((resultat: any) => {
      this.panier = resultat;
      if (this.panier.length === 0)
        this.message = "There are no products in your cart.";
      else
        this.message = null;
      this.prixTot = 0;
      for (let item of this.panier) {
        let price = parseInt(item['prix']) * parseInt(item['quantite']);
        this.prixTot += price;
      }
    });
  }

  deleteItem(item) {

    this.http.post("http://localhost:8888/panier/delete", JSON.stringify({
      nom: item.nom,
      marque: item.marque,
      quantite: item.quantite,
      email: item.email
    }), httpOptions).subscribe((resultat) => {
      console.log(resultat);
      this.router.navigate(["/panier"]);
    });
  }

  updateItem(item, newQuantite) {
    this.http.post("http://localhost:8888/panier/update", JSON.stringify({
      nom: item.nom,
      marque: item.marque,
      quantite: item.quantite,
      email: item.email,
      newQuantite: newQuantite
    }), httpOptions).subscribe((resultat) => {
      console.log(resultat);
      this.router.navigate(["/panier"]);
    });
  }

  deleteBasket() {
    this.http.post("http://localhost:8888/panier/deleteBasket", JSON.stringify({
      email: this.user
    }), httpOptions).subscribe((resultat) => {
      console.log(resultat);
      this.router.navigate(["/panier"]);
    });
  }


}
