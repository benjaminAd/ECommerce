import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProduitsService} from '../produits.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthentificationService} from "../authentification.service";

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  public user: Observable<any>
  public admin: Observable<boolean>;
  public produits: Object[];
  public message: string;
  public query = {};

  constructor(private produitsService: ProduitsService, private authService: AuthentificationService, private router: Router, private route: ActivatedRoute) {
    this.user = authService.getUser();
    this.admin = authService.getAdmin();
    // console.log('Dans le constructeur produits');
  }

  ngOnInit() {
    // console.log('Dans ngOnInit() du composant produits');
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      if (params.MinPrix === null) params.MinPrix = "null";
      if (params.MaxPrix === null) params.MaxPrix = "null";
      this.produitsService.getProduitFromResearch(params).subscribe(res => {
        console.log(res);
        this.produits = res;
        if (res.length === 0) this.message = "Aucun Résultat ne correspond à vos critères!";
      });
    });
    /*this.produitsService.getProduits().subscribe(produits => {
      this.produits = produits;
    });*/
  }

  addToBasket(produit, quantite) {
    this.router.navigate(["/panier/achat/" + produit.nom + "/" + produit.prix + "/" + produit.marque + "/" + quantite + "/" + this.authService.getEmail()])
  }

  deleteProduit(produit) {
    this.produitsService.deleteItem(produit).subscribe((res) => {
      if (res['resultat']) {
        console.log(res['message']);
      }
    });
  }

}
