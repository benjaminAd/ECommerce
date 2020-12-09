import {Component, OnInit} from '@angular/core';
import {InscriptionService} from "../inscription.service";
import {sha256} from "js-sha256";
import {AuthentificationService} from "../authentification.service";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  public utilisateur = {"email": "", "password": "", "confirmPassword": "", "admin": false};
  //public message: Subject<String> = new BehaviorSubject(undefined);
  public message: string;

  constructor(private insService: InscriptionService, private authService: AuthentificationService, private route: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.insService.verifExist(this.utilisateur.email).subscribe((resultat) => {
      if (resultat['resultat'] === 1) {
        //if(this.utilisateur.password === this.utilisateur.confirmPassword){
        if (this.utilisateur.email.includes("@deare.com")) this.utilisateur.admin = true;
        //this.utilisateur.password = sha256(this.utilisateur.password);
        this.insService.inscription(this.utilisateur).subscribe((resultat) => {
          this.authService.verificationConnexion(this.utilisateur).subscribe((resultat) => {
            if (resultat['resultat']) {
              this.authService.connect(this.utilisateur.email);
              this.route.navigate(['/categories']);
            } else {
              console.log(resultat['message']);
            }
          });
        });
        //}else{
        // this.message="Les mots de passes ne sont pas identiques!";
        // }
      } else if (resultat['resultat'] === 0) {
        console.log("resultat0 = " + resultat['message']);
        //this.message.next(resultat['message']);
        this.message = resultat['message'];
      }
    });
  }

}
