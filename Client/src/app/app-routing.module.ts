import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule, Routes} from "@angular/router";
import {AccueilComponent} from "./accueil/accueil.component";
import {ProduitsComponent} from "./produits/produits.component";
import {CategoriesComponent} from "./categories/categories.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {PanierComponent} from "./panier/panier.component";
import {PanierViewComponent} from "./panier-view/panier-view.component";
import {InscriptionComponent} from "./inscription/inscription.component";
import {AddProduitComponent} from "./add-produit/add-produit.component";
import {RechercheComponent} from "./recherche/recherche.component";
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: '', redirectTo: 'accueil', pathMatch: 'full'},
  {path: 'accueil', component: AccueilComponent},
  {path: 'produits/:nom/:categorie/:marque/:MinPrix/:MaxPrix', component: ProduitsComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: 'panier/achat/:nom/:prix/:marque/:quantite/:email', component: PanierComponent},
  {path: 'panier', component: PanierViewComponent},
  {path: 'Inscription', component: InscriptionComponent},
  {path: 'addProduct', component: AddProduitComponent},
  {path: 'rechercher', component: RechercheComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '404'}
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
