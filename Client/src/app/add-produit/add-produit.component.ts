import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from "../authentification.service";
import {Observable} from "rxjs";
import {ProduitsService} from "../produits.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css']
})
export class AddProduitComponent implements OnInit {
  public user: Observable<any>;
  public admin: Observable<any>;
  public file: File;
  public infos = {"nom": "", "type": "", "prix": "", "marque": "", "image": "", "description": ""};

  constructor(private authService: AuthentificationService, private ProdService: ProduitsService, private route: Router) {
    this.user = this.authService.getUser();
    this.admin = this.authService.getAdmin();
  }

  ngOnInit(): void {
  /*
    if(false) {
      this.route.navigate([""]);
    }
    console.log(this.admin);
    */
  }

  /*  onFileSelected(event) {
      console.log(event.target.files[0]);
      this.file = event.target.files[0];
    }*/

  onSubmit() {
    if ((this.infos.nom !== "") && (this.infos.type !== "") && (this.infos.marque !== "") && (this.infos.prix !== "") && (this.infos.image !== "") && (this.infos.description !== ""))
      this.ProdService.addProduit(this.infos).subscribe(res => {
        console.log(res);
        this.route.navigate(['/produits']);
        //const uploadData = new FormData();
        //uploadData.append('myFile', this.file, this.file.name);
        //this.http.post("http://localhost:8888/uploadImage", {"image": uploadData}, httpOptions).subscribe(res => {

        //});
      });
    else
      this.route.navigate(['/produits']);
  }

}
