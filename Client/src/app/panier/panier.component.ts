import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Params, Router} from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Methods": "GET,POST",
    "Access-Control-Allow-Headers": "Content-type",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  })
};

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.http.post("http://localhost:8888/panier/ajout", JSON.stringify(params), httpOptions).subscribe((resultat: any) => {
        console.log(resultat);
        this.router.navigate(["/panier"]);
      });
    });
  }

}
