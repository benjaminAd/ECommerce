import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule, Routes} from "@angular/router";
import {ProduitsComponent} from "./produits/produits.component";
import {CategoriesComponent} from "./categories/categories.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {PanierComponent} from "./panier/panier.component";
import {PanierViewComponent} from "./panier-view/panier-view.component";

const routes: Routes = [
  {path: 'produits', component: ProduitsComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: 'panier/achat/:nom/:marque/:email', component: PanierComponent},
  {path: 'panier', component: PanierViewComponent}
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
