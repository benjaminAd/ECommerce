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
        try {
            db.collection("produits").find().toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch (e) {
            res.end(JSON.stringify([]));
        }
    });

    /*Ajout Produit*/
    app.post("/produits/ajouter", (req, res) => {
        try {
            db.collection("produits").insertOne(req.body);
            res.end(JSON.stringify(req.body));
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }
    });

    /* Liste des produits suivant une catégorie */
    app.get("/produits/:categorie", (req, res) => {
        let categorie = req.params.categorie;
        try {
            db.collection("produits").find({type: categorie}).toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch (e) {
            res.end(JSON.stringify([]));
        }
    });


    /* Liste des catégories de produits */
    app.get("/categories", (req, res) => {
        categories = [];
        try {
            db.collection("produits").find().toArray((err, documents) => {
                for (let doc of documents) {
                    if (!categories.includes(doc.type)) categories.push(doc.type);
                }
                res.end(JSON.stringify(categories));
            });
        } catch (e) {
            res.end(JSON.stringify([]));
        }
    });

    /*Liste des marques*/
    app.get("/marques", (req, res) => {
        marques = [];
        try {
            db.collection("produits").find().toArray((err, documents) => {
                for (let doc of documents) {
                    if (!marques.includes(doc.marque)) marques.push(doc.marque);
                }
                res.end(JSON.stringify(marques));
            });
        } catch (e) {
            res.end(JSON.stringify([]));
        }
    });

    /*delete item*/
    app.post('/produits/delete', (req, res) => {
        try {
            db.collection("produits").deleteOne({
                nom: req.body.nom,
                type: req.body.type,
                prix: req.body.prix,
                marque: req.body.marque
            });
            res.end(JSON.stringify({"resultat": 1, "message": "Effacé"}));
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }
    });

    /*Recherche produit*/
    app.post("/produit/research", (req, res) => {
        let produits = [];
        try {
            if ((req.body.nom === "null") && (req.body.categorie === "null") && (req.body.marque === "null") && (req.body.MaxPrix === "null") && (req.body.MinPrix === "null")) {
                db.collection("produits").find().sort({nom: 1}).toArray((err, documents) => {
                    if (err) throw err;
                    for (let doc of documents) {
                        produits.push(doc);
                    }
                    res.end(JSON.stringify(produits));
                });
            } else {
                let query = {};
                if (req.body.nom !== "null") query.nom = {$regex: new RegExp(".*" + req.body.nom + ".*", 'i')};
                if (req.body.categorie !== "null") query.type = req.body.categorie;
                if (req.body.marque !== "null") query.marque = req.body.marque;
                if (req.body.MinPrix !== "null") query.prix = {$gt: parseInt(req.body.MinPrix)};
                if (req.body.MaxPrix !== "null") query.prix = {$lt: parseInt(req.body.MaxPrix)};
                if ((req.body.MinPrix !== "null") && (req.body.MaxPrix !== "null")) query.prix = {
                    $gt: parseInt(req.body.MinPrix),
                    $lt: parseInt(req.body.MaxPrix)
                };
                db.collection("produits").find(query).sort({nom: 1}).toArray((err, documents) => {
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
                    res.end(JSON.stringify({"resultat": 0, "message": "This user already exists"}));
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
            var sha = require('js-sha256');
            req.body.password = sha.sha256(req.body.password);
            db.collection("membres").insertOne(req.body);
            res.end(JSON.stringify({"resultat": 1, "message": "inscription réussie"}));
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }
    });

    /* Connexion */
    app.post("/membre/connexion", (req, res) => {
        try {
            var sha = require('js-sha256');
            req.body.password = sha.sha256(req.body.password);
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
                        res.end(JSON.stringify({"resultat": 0, "message": "Incorrect email or password"}));
                });
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": "Incorrect email or password"}));
        }
    });

    /*Ajout au panier*/
    app.post("/panier/ajout", (req, res) => {
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
                res.end(JSON.stringify(panier));
            })
        } catch (e) {
            res.end(JSON.stringify([]));
        }
    });

    // Supprimer un article du panier
    app.post('/panier/delete', (req, res) => {
        try {
            db.collection("panier").deleteOne({
                nom: req.body.nom,
                marque: req.body.marque,
                quantite: req.body.quantite,
                email: req.body.email
            }, (err, obj) => {
                if (err) throw err;
            });
            res.end(JSON.stringify(req.body.nom));
        } catch (e) {
            res.end(JSON.stringify(e));
        }
    });

    //update quantite panier
    app.post("/panier/update", (req, res) => {
        try {
            db.collection("panier").updateOne({
                    nom: req.body.nom,
                    marque: req.body.marque,
                    quantite: req.body.quantite,
                    email: req.body.email,
                    image: req.body.image
                }, {
                    $set: {
                        nom: req.body.nom,
                        marque: req.body.marque,
                        quantite: req.body.newQuantite,
                        email: req.body.email,
                        image: req.body.image
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
    });
});

app.listen(8888);
