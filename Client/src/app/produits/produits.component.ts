import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import {ProduitsService} from '../produits.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthentificationService} from "../authentification.service";

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit/*, OnDestroy */{
  public user: Observable<any>
  public admin: Observable<boolean>;
  public produits: Object[];
  public message: string;
  public query = {};
  subscription;

  constructor(private produitsService: ProduitsService, private authService: AuthentificationService, private router: Router, private route: ActivatedRoute) {
    this.user = authService.getUser();
    this.admin = authService.getAdmin();
    /*this.subscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        console.log("end");
        this.initialiseProduits();
      }
    });*/
    // console.log('Dans le constructeur produits');
  }

  ngOnInit(): void {
    this.initialiseProduits();
  }

 /* ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }*/

  initialiseProduits() {
    this.produits = [];
    this.route.params.subscribe((params: Params) => {
      if (params.MinPrix === null) params.MinPrix = "null";
      if (params.MaxPrix === null) params.MaxPrix = "null";
      this.produitsService.getProduitFromResearch(params).subscribe(res => {
        this.produits = res;
        if (res.length === 0)
          this.message = "No products matches for your search.";
        else
          this.message = null;
      });
    });
  }

  addToBasket(produit, quantite) {
    if (quantite === null || quantite === "" || parseInt(quantite) <= 0) quantite = 1;
    this.router.navigate(["/panier/achat/" + produit.nom + "/" + produit.prix + "/" + produit.marque + "/" + quantite + "/" + this.authService.getEmail() + "/" + produit.image.replaceAll('/', '\\')]);
  }

  deleteProduit(produit) {
    this.produitsService.deleteItem(produit).subscribe((res) => {
      this.router.navigate(["/panier/remove"]);
    });
  }

}
