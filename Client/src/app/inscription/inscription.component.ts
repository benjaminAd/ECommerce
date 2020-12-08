import {Component, OnInit} from '@angular/core';
import {InscriptionService} from "../inscription.service";
import {sha256} from "js-sha256";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  public utilisateur = {"email": "", "password": "", "admin": ""};

  constructor(private insService: InscriptionService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.utilisateur.password = sha256(this.utilisateur.password);
    this.insService.inscription(this.utilisateur).subscribe((resultat) => {
      console.log("OK");
    });
  }

}
