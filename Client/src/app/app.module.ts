import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProduitsComponent } from './produits/produits.component';
import {Route, RouterModule} from "@angular/router";
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { ConnexionComponent } from './connexion/connexion.component';
import {FormsModule} from "@angular/forms";
import { PanierComponent } from './panier/panier.component';
import { PanierViewComponent } from './panier-view/panier-view.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { RechercheComponent } from './recherche/recherche.component';
import { AccueilComponent } from './accueil/accueil.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RemoveProduitComponent } from './remove-produit/remove-produit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProduitsComponent,
    MenuComponent,
    ConnexionComponent,
    PanierComponent,
    PanierViewComponent,
    InscriptionComponent,
    AddProduitComponent,
    RechercheComponent,
    AccueilComponent,
    FooterComponent,
    NotFoundComponent,
    RemoveProduitComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
