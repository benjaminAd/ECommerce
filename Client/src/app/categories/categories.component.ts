import {Component, OnInit} from '@angular/core';
import {ProduitsService} from "../produits.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public categories = [];

  constructor(private pService: ProduitsService) {
  }

  ngOnInit(): void {
    this.pService.getCategories().subscribe(categories => {
      this.categories = categories;
      console.log(categories);
    });
  }

}
