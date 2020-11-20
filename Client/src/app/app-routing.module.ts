import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule, Routes} from "@angular/router";
import {ProduitsComponent} from "./produits/produits.component";
import {CategoriesComponent} from "./categories/categories.component";

const routes: Routes = [
  {path: 'produits', component: ProduitsComponent},
  {path: 'categories', component: CategoriesComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
