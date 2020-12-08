const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;
const url = "mongodb://localhost:27017";

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    let db = client.db("SUPERVENTES");

    /* Liste des produits */
    app.get("/produits", (req, res) => {
        console.log("/produits");
        try {
            db.collection("produits").find().toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch (e) {
            console.log("Erreur sur /produits : " + e);
            res.end(JSON.stringify([]));
        }
    });

    /*Ajout Produit*/
    app.post("/produits/ajouter", (req, res) => {
        try {
            console.log(req.body);
            db.collection("produits").insertOne(req.body);
            res.end(JSON.stringify(req.body));
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }
    });

    /* Liste des produits suivant une catégorie */
    app.get("/produits/:categorie", (req, res) => {
        let categorie = req.params.categorie;
        console.log("/produits/" + categorie);
        try {
            db.collection("produits").find({type: categorie}).toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch (e) {
            console.log("Erreur sur /produits/" + categorie + " : " + e);
            res.end(JSON.stringify([]));
        }
    });


    /* Liste des catégories de produits */
    app.get("/categories", (req, res) => {
        console.log("/categories");
        categories = [];
        try {
            db.collection("produits").find().toArray((err, documents) => {
                for (let doc of documents) {
                    if (!categories.includes(doc.type)) categories.push(doc.type);
                }
                res.end(JSON.stringify(categories));
            });
        } catch (e) {
            console.log("Erreur sur /categories : " + e);
            res.end(JSON.stringify([]));
        }
    });

    /*Liste des marques*/
    app.get("/marques", (req, res) => {
        console.log("/categories");
        marques = [];
        try {
            db.collection("produits").find().toArray((err, documents) => {
                for (let doc of documents) {
                    if (!marques.includes(doc.marque)) marques.push(doc.marque);
                }
                res.end(JSON.stringify(marques));
            });
        } catch (e) {
            console.log("Erreur sur /marques : " + e);
            res.end(JSON.stringify([]));
        }
    });

    /*Recherche produit*/
    app.post("/produit/research", (req, res) => {
        produits = [];
        try {
            if ((req.body.nom === "") && (req.body.categorie === "") && (req.body.marque === "") && (req.body.MaxPrix === null) && (req.body.MinPrix === null)) {
                console.log("vide");
                db.collection("produits").find().toArray((err, documents) => {
                    if (err) throw err;
                    for (let doc of documents) {
                        produits.push(doc);
                    }
                    res.end(JSON.stringify(produits));
                });
            } else {
                let query = {};
                if (req.body.nom !== "") query.nom = req.body.nom;
                if (req.body.categorie !== "") query.type = req.body.categorie;
                if (req.body.marque !== "") query.marque = req.body.marque;
                if (req.body.MinPrix !== null) query.prix = {$gt: req.body.MinPrix};
                if (req.body.MaxPrix !== null) query.prix = {$lt: req.body.MaxPrix};
                if ((req.body.MinPrix !== null) && (req.body.MaxPrix !== null)) query.prix = {
                    $gt: req.body.MinPrix,
                    $lt: req.body.MaxPrix
                };
                db.collection("produits").find(query).toArray((err, documents) => {
                    for (let doc of documents) {
                        produits.push(doc);
                    }
                    res.end(JSON.stringify(produits));
                });
            }
        } catch (e) {
            res.end(JSON.stringify({"message": e}));
        }
    });

    /*CheckExistEmail*/
    app.post("/membre/exist", (req, res) => {
        try {
            db.collection("membres").find({"email": req.body.email}).toArray((err, document) => {
                if ((document !== undefined) && (document.length >= 1)) {
                    res.end(JSON.stringify({"resultat": 0, "message": "Cet utilisateur existe déjà"}));
                } else {
                    res.end(JSON.stringify({"resultat": 1, "message": "OK"}));
                }
            });
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }
    });

    /* Inscription */
    app.post("/membre/inscription", (req, res) => {
        try {
            db.collection("membres").insertOne(req.body);
            res.end(JSON.stringify({"resultat": 1, "message": "inscription réussie"}));
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }
    });

    /* Connexion */
    app.post("/membre/connexion", (req, res) => {
        try {
            db.collection("membres")
                .find(req.body)
                .toArray((err, documents) => {
                    if (documents !== undefined && documents.length === 1) {
                        res.end(JSON.stringify({
                            "resultat": 1,
                            "message": "Authentification réussie",
                            "admin": documents[0].admin
                        }));
                    } else
                        res.end(JSON.stringify({"resultat": 0, "message": "Email et/ou mot de passe incorrect"}));
                });
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }
    });

    /*Ajout au panier*/
    app.post("/panier/ajout", (req, res) => {
        //console.log("route : /produit/ajout avec " + JSON.stringify(req.body));
        try {
            db.collection("panier").insertOne(req.body);
            res.end(JSON.stringify({"response": "ajout d'un produit dans le panier"}));
        } catch (e) {
            res.end(JSON.stringify(e));
        }

    });

    /*Recup panier*/
    app.post('/panier', (req, res) => {
        panier = [];
        try {
            db.collection("panier").find({email: req.body.email}).toArray((err, document) => {
                for (let doc of document) {
                    panier.push(doc);
                }
                console.log(panier);
                res.end(JSON.stringify(panier));
            })
        } catch (e) {
            res.end(JSON.stringify([]));
        }
    });

    // Supprimer un article du panier
    app.post('/panier/delete', (req, res) => {
        try {
            //console.log(req.body.nom);
            db.collection("panier").deleteOne({
                nom: req.body.nom,
                marque: req.body.marque,
                quantite: req.body.quantite,
                email: req.body.email
            }, (err, obj) => {
                if (err) throw err;
                //console.log("élément effacé");
            });
            res.end(JSON.stringify(req.body.nom));
        } catch (e) {
            res.end(JSON.stringify(e));
        }
    });

    //update quantite panier
    app.post("/panier/update", (req, res) => {
        console.log(req.body.quantite + "  " + req.body.newQuantite);
        try {
            db.collection("panier").updateOne({
                    nom: req.body.nom,
                    marque: req.body.marque,
                    quantite: req.body.quantite,
                    email: req.body.email
                }, {
                    $set: {
                        nom: req.body.nom,
                        marque: req.body.marque,
                        quantite: req.body.newQuantite,
                        email: req.body.email
                    }
                }, (err, obj) => {
                    if (err) throw err;
                }
            );
            res.end(JSON.stringify(req.body.newQuantite));
        } catch (e) {
            res.end(JSON.stringify(e));
        }
    });

    //Delete Basket
    app.post("/panier/deleteBasket", (req, res) => {
        // console.log(req.body.email);
        try {
            db.collection("panier").deleteMany({email: req.body.email}, (err, obj) => {
                if (err) throw err;
            });
            res.end(JSON.stringify(req.body.email));
        } catch (e) {
            res.end(JSON.stringify(e));
        }

    });

    /*UploadImage*/
    app.post("/uploadImage", (req, res) => {
        console.log(req.body);
    });
});

app.listen(8888);
