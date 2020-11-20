import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../categories.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public categories = [];

  constructor(private cServices: CategoriesService) {
  }

  ngOnInit(): void {
    this.cServices.getCategories().subscribe(categories => {
      this.categories = categories;
      //console.log(categories);
    });
  }

}
