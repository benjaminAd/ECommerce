import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule, Routes} from "@angular/router";
import {AccueilComponent} from "./accueil/accueil.component";
import {ProduitsComponent} from "./produits/produits.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {PanierComponent} from "./panier/panier.component";
import {PanierViewComponent} from "./panier-view/panier-view.component";
import {InscriptionComponent} from "./inscription/inscription.component";
import {AddProduitComponent} from "./add-produit/add-produit.component";
import {RechercheComponent} from "./recherche/recherche.component";
import {NotFoundComponent} from './not-found/not-found.component';
import {RemoveProduitComponent} from "./remove-produit/remove-produit.component";

const routes: Routes = [
  {path: '', redirectTo: 'accueil', pathMatch: 'full'},
  {path: 'accueil', component: AccueilComponent},
  {path: 'produits', redirectTo: 'produits/null/null/null/null/null', pathMatch: 'full'},
  {
    path: 'produits/:nom/:categorie/:marque/:MinPrix/:MaxPrix',
    component: ProduitsComponent/*,
    runGuardsAndResolvers: 'always'*/
  },
  {path: 'connexion', component: ConnexionComponent},
  {path: 'panier/achat/:nom/:prix/:marque/:quantite/:email/:image', component: PanierComponent},
  {path: 'panier/remove', component: RemoveProduitComponent},
  {path: 'panier', component: PanierViewComponent, runGuardsAndResolvers: 'always'},
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
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
