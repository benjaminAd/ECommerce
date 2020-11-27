import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from "../authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  utilisateur = {"email": "", "password": ""};
  private message: string = "";

  constructor(private authService: AuthentificationService, private route: Router) {
  }

  onSubmit() {
    this.authService.verificationConnexion(this.utilisateur).subscribe(response => {
      this.message = response['message'];
      if (response['resultat']) {
        this.authService.connect(this.utilisateur.email);
        this.route.navigate(['/categories']);
      }
      setTimeout(() => {
        this.route.navigate(['/categories'])
      }, 1000);
    });
  }

}
