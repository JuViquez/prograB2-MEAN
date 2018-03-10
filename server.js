const express = require('express');
const app = express();
const mongodb = require('./mongodb.js');
var varmongodb = require("mongodb");
var ObjectID = varmongodb.ObjectID;
var db;
var bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const INSTITUCIONES_COLLECTION = 'instituciones';
const ESCUELAS_COLLECTION = 'escuelas';
const GRUPOS_COLLECTION = 'grupos';
const USUARIO_COLLECTION = 'usuarios';


mongodb.connectToServer( function( err ) {
    app.listen(4000, function() {
       console.log('Node server listening on ' + 4000);
       db = mongodb.getDb();
 })
});

var distDir = __dirname + "/dist/";
app.use(express.static(distDir)); 
app.use(bodyParser.json());

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
  }
  

//INSTITUCIONES

app.get('/api/instituciones', function(req, res){
    db.collection(INSTITUCIONES_COLLECTION).find().toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "No se pudo obtener Instituciones.");
          } else {
            res.status(200).json(docs);
          }      
    })
});

app.post('/api/instituciones', function(req, res){
    var newDoc = req.body;

    if (!req.body.nombre) {
        handleError(res, "Entrada de usuario invalidad", "Se debe proveer un nombre.", 400);
    }

    db.collection(INSTITUCIONES_COLLECTION).insertOne(newDoc, function(err, doc) {
        if (err) {
        handleError(res, err.message, "Fallo al crear Institucion.");
        } else {
        res.status(201).json(doc.ops[0]);
        }
    });

});

app.put('/api/instituciones/:id', function(req, res){
    var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(INSTITUCIONES_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Fallo al actualizar Institucion");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete('/api/instituciones/:id', function(req, res){
    db.collection(INSTITUCIONES_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Fallo al borrar Institucion");
        } else {
            res.status(200).json(req.params.id);
        }
        });
});

//ESCUELAS

app.get('/api/escuelas', function(req, res){
var arr = [];
for(var x in req.query){arr.push(new ObjectID(req.query[x]));};
    db.collection(ESCUELAS_COLLECTION).find({ _id: {$in: arr}}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "No se pudo obtener escuelas.");
          } else {
            
            res.status(200).json(docs);
          }      
    })
});

app.post('/api/escuelas', function(req, res){
    var newDoc = req.body;
    db.collection(ESCUELAS_COLLECTION).insertOne(newDoc, function(err, doc) {
        if (err) {
        handleError(res, err.message, "Fallo al crear Escuela.");
        } else {
            console.log("DOCS: "+doc);
        res.status(201).json(doc.ops[0]);
        }
    });

0});

app.put('/api/escuelas/:id', function(req, res){
    var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(ESCUELAS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Fallo al actualizar Escuela");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete('/api/escuelas/:id', function(req, res){
    db.collection(ESCUELAS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Fallo al borrar Escuela");
        } else {
            res.status(200).json(req.params.id);
        }
        });
});

//GRUPOS

app.get('/api/grupos/escuela/:id', function(req, res){
    db.collection(GRUPOS_COLLECTION).find({id_escuela : req.params.id}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "No se pudo obtener grupos.");
          } else {
            res.status(200).json(docs);
          }      
    })
});

app.get('/api/grupos/profesor/:id', function(req, res){
    db.collection(GRUPOS_COLLECTION).find({id_profesor : req.params.id}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "No se pudo obtener grupos.");
          } else {
            res.status(200).json(docs);
          }      
    })
});

app.get('/api/grupos/estudiante/:id', function(req, res){
    db.collection(GRUPOS_COLLECTION).find({"lista_estudiantes.id_estudiante" : req.params.id }).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "No se pudo obtener grupos.");
          } else {
            res.status(200).json(docs);
          }      
    })
});


app.post('/api/grupos', function(req, res){
    var newDoc = req.body;

    db.collection(GRUPO_COLLECTION).insertOne(newDoc, function(err, doc) {
        if (err) {
        handleError(res, err.message, "Fallo al crear grupo.");
        } else {
        res.status(201).json(doc.ops[0]);
        }
    });

});

app.put('/api/grupos/:id', function(req, res){
    var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(GRUPO_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Fallo al actualizar grupo");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete('/api/grupos/:id', function(req, res){
    db.collection(GRUPO_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Fallo al borrar grupo");
        } else {
            res.status(200).json(req.params.id);
        }
        });
});



//Usuarios

app.get('/api/usuarios', function(req, res){
    db.collection(USUARIO_COLLECTION).find().toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "No se pudo obtener usuarios.");
          } else {
            res.status(200).json(docs);
          }      
    })
});

app.get('/api/usuarios/:id', function(req, res){
    db.collection(USUARIO_COLLECTION).findOne({email : req.params.id}, function(err, doc) {
        if (err) {
            handleError(res, err.message, "No se pudo obtener usuarios.");
          } else {
              console.log("NOMBRE usuario3 "+doc.nombre);
            res.status(200).json(doc);
          }      
    })
});

app.post('/api/usuarios', function(req, res){
    var newDoc = req.body;

    db.collection(USUARIO_COLLECTION).insertOne(newDoc, function(err, doc) {
        if (err) {
        handleError(res, err.message, "Fallo al crear usuario.");
        } else {
        res.status(201).json(doc.ops[0]);
        }
    });

});

app.put('/api/usuarios/:id', function(req, res){
    var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(USUARIO_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Fallo al actualizar usuario");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete('/api/usuarios/:id', function(req, res){
    db.collection(USUARIO_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Fallo al borrar usuario");
        } else {
            res.status(200).json(req.params.id);
        }
        });
});

app.post('/login', (req, res) => {
    if (!req.body.username) {
      res.json({ success: false, message: 'No username was provided' }); 
    } else {
      if (!req.body.password) {
        res.json({ success: false, message: 'No password was provided.' });
      } else {
        db.collection(USUARIO_COLLECTION).findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
          if (err) {
            res.json({ success: false, message: err });
          } else {
            db.collection(USUARIO_COLLECTION).findOne({email : req.body.username}, function(err, doc) {
                if (err) {
                    handleError(res, err.message, "No se pudo obtener usuarios.");
                  } else {
                        if(typeof(doc.username) == 'undefined'){
                            res.json({ success: false, message: 'Usuario no encontrado' });
                        }else{
                            if(doc.password == req.body.password){
                                const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' });
                                res.json({
                                success: true,
                                message: 'Success!',
                                token: token,
                                user: {
                                    username: user.username
                                }})
                            }else{
                                res.json({ success: false, message: 'Contraseña equivocada' });
                            }
                        }
                    res.status(200).json(doc);
                  
                }      
            })
          }
        });
      }
    }
  });