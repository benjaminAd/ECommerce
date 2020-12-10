import {Component, OnInit} from '@angular/core';
import {ProduitsService} from "../produits.service";
import {AuthentificationService} from "../authentification.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
  public user: Observable<any>;
  public admin: Observable<any>;
  public categories: any;
  public marques: any;
  public research = {"nom": "", "categorie": "", "marque": "", "MinPrix": "", "MaxPrix": ""};
  public res: any;

  constructor(private prodService: ProduitsService, private authService: AuthentificationService, private router: Router) {
    this.user = this.authService.getUser();
    this.admin = this.authService.getAdmin();
  }

  ngOnInit(): void {
    this.prodService.getCategories().subscribe(res => {
      this.categories = res;
    });
    this.prodService.getMarques().subscribe(res => {
      this.marques = res;
    });

  }

  onSubmit() {
    /*this.prodService.getProduitFromResearch(this.research).subscribe(res => {
      this.res = res;
    });*/
    if (this.research.nom === "") this.research.nom = "null";
    if (this.research.categorie === "") this.research.categorie = "null";
    if (this.research.marque === "") this.research.marque = "null";
    if (this.research.MinPrix === "") this.research.MinPrix = "null";
    if (this.research.MaxPrix === "") this.research.MaxPrix = "null";
    this.router.navigate(['/produits/' + this.research.nom + "/" + this.research.categorie + "/" + this.research.marque + "/" + this.research.MinPrix + "/" + this.research.MaxPrix]);
    if (this.research.nom === "null") this.research.nom = "";
    if (this.research.categorie === "null") this.research.categorie = "";
    if (this.research.marque === "null") this.research.marque = "";
    if (this.research.MinPrix === "null") this.research.MinPrix = "";
    if (this.research.MaxPrix === "null") this.research.MaxPrix = "";
  }

  addToBasket(produit, quantite) {
    this.router.navigate(["/panier/achat/" + produit.nom + "/" + produit.prix + "/" + produit.marque + "/" + quantite + "/" + this.authService.getEmail()])
  }


}
