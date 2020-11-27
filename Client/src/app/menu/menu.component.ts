import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from "../authentification.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public user: Observable<any>;

  constructor(public AuthService: AuthentificationService) {
    this.user = AuthService.getUser();
  }

  ngOnInit(): void {
  }

}
