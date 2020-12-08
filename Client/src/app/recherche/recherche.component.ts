import {Component, OnInit} from '@angular/core';
import {ProduitsService} from "../produits.service";
import {AuthentificationService} from "../authentification.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
  public user: Observable<any>;
  public categories: any;
  public marques: any;
  public research = {"nom": "", "categorie": "", "marque": "", "MinPrix": "", "MaxPrix": ""};

  constructor(private prodService: ProduitsService, private authService: AuthentificationService) {
    this.user = this.authService.getUser();
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
    console.log(this.research);
    this.prodService.getProduitFromResearch(this.research).subscribe(res => {
      console.log(res);
    });
  }

}
