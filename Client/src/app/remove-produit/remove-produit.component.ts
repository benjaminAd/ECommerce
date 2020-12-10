import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-remove-produit',
  templateUrl: './remove-produit.component.html',
  styleUrls: ['./remove-produit.component.css']
})
export class RemoveProduitComponent implements OnInit {

  constructor(private route: Router) {
  }

  ngOnInit(): void {
    this.route.navigate(['/produits']);
  }

}
