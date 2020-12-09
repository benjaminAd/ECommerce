import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from "../authentification.service";
import {Router} from "@angular/router";
import {sha256} from "js-sha256";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  public utilisateur = {"email": "", "password": ""};
  public message: string;

  constructor(private authService: AuthentificationService, private route: Router) {
  }

  onSubmit() {
    //this.utilisateur.password = sha256(this.utilisateur.password);
    this.authService.verificationConnexion(this.utilisateur).subscribe(response => {
      this.message = response['message'];
      if (response['resultat']) {
        this.authService.connect(this.utilisateur.email);
        this.authService.setAdmin(response['admin']);
        this.route.navigate(['/categories']);
      }
      /*setTimeout(() => {
        this.route.navigate(['/categories']);
        console.log('timeout');
      }, 1000);*/
    });
  }

}
