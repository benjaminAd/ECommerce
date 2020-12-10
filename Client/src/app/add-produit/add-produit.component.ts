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
  public message: string;
  public error: string;


  constructor(private authService: AuthentificationService, private ProdService: ProduitsService, private route: Router) {
    this.user = this.authService.getUser();
    this.admin = this.authService.getAdmin();
  }

  ngOnInit(): void {
    this.admin.subscribe(res => {
      if(!res) {
        this.route.navigate(["/404"]);
      }
    });
  }

  /*  onFileSelected(event) {
      console.log(event.target.files[0]);
      this.file = event.target.files[0];
    }*/

  onSubmit() {
    if ((this.infos.nom !== "") && (this.infos.type !== "") && (this.infos.marque !== "") && (this.infos.prix !== "") && (this.infos.image !== "") && (this.infos.description !== "")) {
      if (parseInt(this.infos.prix) > 0)
        this.ProdService.addProduit(this.infos).subscribe(res => {
          this.error = null;
          this.message = "The product has been added !";
          this.infos = {"nom": "", "type": "", "prix": "", "marque": "", "image": "", "description": ""};
          //const uploadData = new FormData();
          //uploadData.append('myFile', this.file, this.file.name);
          //this.http.post("http://localhost:8888/uploadImage", {"image": uploadData}, httpOptions).subscribe(res => {

          //});
        });
      else {
        this.message = null;
        this.error = "The price must be greater than zero";
      }
    } else {
      this.message = null;
      this.error = "You must fill all fields";
    }
  }

}
