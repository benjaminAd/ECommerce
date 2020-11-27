import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
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
  // tslint:disable-next-line:ban-types
  public produits: Object[];

  constructor(private produitsService: ProduitsService, private authService: AuthentificationService) {
    this.user = authService.getUser();
    // console.log('Dans le constructeur produits');
  }

  ngOnInit() {
    // console.log('Dans ngOnInit() du composant produits');
    this.produitsService.getProduits().subscribe(produits => {
      this.produits = produits;
    });
  }

}
