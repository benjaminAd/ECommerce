import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from "../authentification.service";
import {Observable} from "rxjs";
import {ProduitsService} from "../produits.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public user: Observable<any>;
  public admin: Observable<any>;
  public categories: any;

  constructor(public AuthService: AuthentificationService, private prodService: ProduitsService) {
    this.user = AuthService.getUser();
    this.admin = AuthService.getAdmin();
  }

  ngOnInit(): void {
    this.prodService.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

}
