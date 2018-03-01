const express = require('express');
const app = express();
const mongodb = require('./mongodb.js');
var db;
const INSTITUCIONES_COLLECTION = 'instituciones';
const ESCUELAS_COLLECTION = 'escuelas';

mongodb.connectToServer( function( err ) {
    app.listen(46357, function() {
       console.log('Node server listening on ' + 3000);
       db = mongodb.getDb();
 })
});

 
app.use(express.static(__dirname + '/public'));

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
  }
  

//INSTITUCIONES

app.get('/api/instituciones', function(req, res){
    console.log("entro al api");
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
    db.collection(ESCUELAS_COLLECTION).find().toArray(function(err, docs) {
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

//PROGRAMAS

app.get('/api/programas', function(req, res){
    db.collection(PROGRAMAS_COLLECTION).find().toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "No se pudo obtener programas.");
          } else {
            res.status(200).json(docs);
          }      
    })
});

app.post('/api/programas', function(req, res){
    var newDoc = req.body;

    db.collection(PROGRAMAS_COLLECTION).insertOne(newDoc, function(err, doc) {
        if (err) {
        handleError(res, err.message, "Fallo al crear Programa.");
        } else {
        res.status(201).json(doc.ops[0]);
        }
    });

});

app.put('/api/programas/:id', function(req, res){
    var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(PROGRAMAS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Fallo al actualizar Programa");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete('/api/programas/:id', function(req, res){
    db.collection(PROGRAMAS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Fallo al borrar Programa");
        } else {
            res.status(200).json(req.params.id);
        }
        });
});

//MALLAS CURRICULARES

app.get('/api/mallas', function(req, res){
    db.collection(MALLAS_COLLECTION).find().toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "No se pudo obtener mallas.");
          } else {
            res.status(200).json(docs);
          }      
    })
});

app.post('/api/mallas', function(req, res){
    var newDoc = req.body;

    db.collection(MALLAS_COLLECTION).insertOne(newDoc, function(err, doc) {
        if (err) {
        handleError(res, err.message, "Fallo al crear Malla.");
        } else {
        res.status(201).json(doc.ops[0]);
        }
    });

});

app.put('/api/mallas/:id', function(req, res){
    var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(MALLAS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Fallo al actualizar Malla");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete('/api/mallas/:id', function(req, res){
    db.collection(MALLAS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Fallo al borrar Malla");
        } else {
            res.status(200).json(req.params.id);
        }
        });
});

//CURSOS

app.get('/api/cursos', function(req, res){
    db.collection(CURSO_COLLECTION).find().toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "No se pudo obtener cursos.");
          } else {
            res.status(200).json(docs);
          }      
    })
});

app.post('/api/cursos', function(req, res){
    var newDoc = req.body;

    db.collection(CURSO_COLLECTION).insertOne(newDoc, function(err, doc) {
        if (err) {
        handleError(res, err.message, "Fallo al crear curso.");
        } else {
        res.status(201).json(doc.ops[0]);
        }
    });

});

app.put('/api/cursos/:id', function(req, res){
    var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(CURSO_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Fallo al actualizar curso");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete('/api/cursos/:id', function(req, res){
    db.collection(CURSO_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Fallo al borrar curso");
        } else {
            res.status(200).json(req.params.id);
        }
        });
});

//GRUPOS

app.get('/api/grupos', function(req, res){
    db.collection(GRUPO_COLLECTION).find().toArray(function(err, docs) {
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

//MATRICULA

app.get('/api/matriculas', function(req, res){
    db.collection(MATRICULA_COLLECTION).find().toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "No se pudo obtener matriculas.");
          } else {
            res.status(200).json(docs);
          }      
    })
});

app.post('/api/matriculas', function(req, res){
    var newDoc = req.body;

    db.collection(MATRICULA_COLLECTION).insertOne(newDoc, function(err, doc) {
        if (err) {
        handleError(res, err.message, "Fallo al crear matricula.");
        } else {
        res.status(201).json(doc.ops[0]);
        }
    });

});

app.put('/api/matriculas/:id', function(req, res){
    var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(MATRICULA_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Fallo al actualizar matricula");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete('/api/matriculas/:id', function(req, res){
    db.collection(MATRICULA_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Fallo al borrar matricula");
        } else {
            res.status(200).json(req.params.id);
        }
        });
});

//materias

app.get('/api/materias', function(req, res){
    db.collection(MATERIA_COLLECTION).find().toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "No se pudo obtener materias.");
          } else {
            res.status(200).json(docs);
          }      
    })
});

app.post('/api/materias', function(req, res){
    var newDoc = req.body;

    db.collection(MATERIA_COLLECTION).insertOne(newDoc, function(err, doc) {
        if (err) {
        handleError(res, err.message, "Fallo al crear materia.");
        } else {
        res.status(201).json(doc.ops[0]);
        }
    });

});

app.put('/api/materias/:id', function(req, res){
    var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(MATERIA_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Fallo al actualizar materia");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete('/api/materias/:id', function(req, res){
    db.collection(MATERIA_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Fallo al borrar materia");
        } else {
            res.status(200).json(req.params.id);
        }
        });
});

//Usuarios

app.get('/api/usuarios', function(req, res){
    db.collection(CURSO_COLLECTION).find().toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "No se pudo obtener usuarios.");
          } else {
            res.status(200).json(docs);
          }      
    })
});

app.post('/api/usuarios', function(req, res){
    var newDoc = req.body;

    db.collection(CURSO_COLLECTION).insertOne(newDoc, function(err, doc) {
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

  db.collection(CURSO_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Fallo al actualizar usuario");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete('/api/usuarios/:id', function(req, res){
    db.collection(CURSO_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Fallo al borrar usuario");
        } else {
            res.status(200).json(req.params.id);
        }
        });
});