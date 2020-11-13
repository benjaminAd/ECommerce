import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ProduitsService} from '../produits.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  // tslint:disable-next-line:ban-types
  public produits: Object[] = [{nom: 'quercétine', type: 'anti-oxydant'}, {nom: 'caféine', type: 'anti-fatigue'}];

  /* constructor(private produitsService: ProduitsService) {
    console.log('Dans le constructeur du composant produits');
  }

  /*ngOnInit() {
    console.log('Dans ngOnInit() du composant produits');
    this.produitsService.getProduits().subscribe(produits => {
      this.produits = produits;
    });
  }*/

}
