import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProduitsComponent } from './produits/produits.component';
import {Route, RouterModule} from "@angular/router";
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { ConnexionComponent } from './connexion/connexion.component';
import {FormsModule} from "@angular/forms";
import { PanierComponent } from './panier/panier.component';
import { PanierViewComponent } from './panier-view/panier-view.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AddProduitComponent } from './add-produit/add-produit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProduitsComponent,
    MenuComponent,
    CategoriesComponent,
    ConnexionComponent,
    PanierComponent,
    PanierViewComponent,
    InscriptionComponent,
    AddProduitComponent
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
