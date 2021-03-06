const express = require('express');
const app = express();
const mongodb = require('./mongodb.js');
var varmongodb = require("mongodb");
var ObjectID = varmongodb.ObjectID;
var db;
var bodyParser = require("body-parser");
const INSTITUCIONES_COLLECTION = 'instituciones';
const ESCUELAS_COLLECTION = 'escuelas';
const GRUPOS_COLLECTION = 'grupos';
const USUARIO_COLLECTION = 'usuarios';
const ASISTENCIA_COLLECTION =  'asistencia';
const TOPICS_COLLECTION = 'topics';
const EVALUACIONES_COLLECTION = 'evaluaciones';
const MENSAJES_COLLECTION = 'mensajes';

// Connect to the database before starting the application server.

mongodb.connectToServer( function( err ) {
    app.listen(4000, function() {
       console.log('Node server listening on ' + 4000);
       db = mongodb.getDb();
 })
});

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.

var distDir = __dirname + "/dist/";
app.use(express.static(distDir)); 
app.use(bodyParser.json());

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
  }
  

//INSTITUCIONES

/*  "/api/instituciones"
 *    GET: Busca todas las instituciones
 */

app.get('/api/instituciones', function(req, res){
    db.collection(INSTITUCIONES_COLLECTION).find().toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "No se pudo obtener Instituciones.");
          } else {
            res.status(200).json(docs);
          }      
    })
});

/*  "/api/instituciones/:id"
 *    GET: Busca todas las instituciones por id
 */

app.get('/api/instituciones/:id', function(req, res){
    db.collection(INSTITUCIONES_COLLECTION).findOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Fallo al obtener Institucion");
        } else {
            res.status(200).json(result);
        }
        });
});


/*  "/api/instituciones"
 *    POST: Inserta una nueva institucion
 */

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

/*  "/api/instituciones/:id"
 *    PUT: Actualiza una institucion
 */

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

/*  "/api/instituciones/:id"
 *    DELETE: Borra institución por ID
 */

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

/*  "/api/escuelas"
 *    GET: Obtiene todas las escuelas
 */

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

/*  "/api/escuelas/:id"
 *    GET: Obtiene escuela por ID
 */

app.get('/api/escuelas/:id', function(req, res){
        db.collection(ESCUELAS_COLLECTION).findOne({_id: new ObjectID(req.params.id)}, function(err, docs) {
            if (err) {
                handleError(res, err.message, "No se pudo obtener escuela.");
              } else {
                res.status(200).json(docs);
              }      
        })
    });

/*  "/api/escuelas"
 *    POST: Inserta una nueva escuela
 */

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

/*  "/api/escuelas/:id"
 *    PUT: Actualiza una escuela
 */

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

/*  "/api/escuelas/:id"
 *    DELETE: Borra escuela por ID
 */

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

/*  "/api/grupos/:id"
 *    GET: Obtiene un grupo por ID
 */

app.get('/api/grupos/:id', function(req, res){
    db.collection(GRUPOS_COLLECTION).findOne({_id : new ObjectID(req.params.id)}, function(err, docs) {
        if (err) {
            handleError(res, err.message, "No se pudo obtener grupos.");
          } else {
            res.status(200).json(docs);
          }      
    })
});

/*  "/api/grupos/escuela/:id"
 *    GET: Obtiene grupo por ID de escuela
 */

app.get('/api/grupos/escuela/:id', function(req, res){
    db.collection(GRUPOS_COLLECTION).find({id_escuela : req.params.id}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "No se pudo obtener grupos.");
          } else {
            res.status(200).json(docs);
          }      
    })
});

/*  "/api/grupos/profesor/:id"
 *    GET: Obtiene grupo por ID de profesor
 */

app.get('/api/grupos/profesor/:id', function(req, res){
    db.collection(GRUPOS_COLLECTION).find({id_profesor : req.params.id}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "No se pudo obtener grupos.");
          } else {
            res.status(200).json(docs);
          }      
    })
});

/*  "/api/grupos/estudiante/:id"
 *    GET: Obtiene grupo por ID de estudiante
 */

app.get('/api/grupos/estudiante/:id', function(req, res){
    db.collection(GRUPOS_COLLECTION).find({"lista_estudiantes.id_estudiante" : req.params.id }).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "No se pudo obtener grupos.");
          } else {
            res.status(200).json(docs);
          }      
    })
});

/*  "/api/grupos/:id"
 *    PUT: Actualiza grupo por ID
 */

app.put('/api/grupos/:id', function(req, res){
  var updateDoc = req.body;
  delete updateDoc._id;
  db.collection(GRUPOS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Fallo al actualizar grupo");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

/*  "/api/grupos/cursos/:ano/:semestre/:programa"
 *    GET: Obtiene cursos por periodo
 */

app.get('/api/grupos/cursos/:ano/:semestre/:programa', function(req, res){
    var arr = [];
    for(var x in req.query){arr.push(req.query[x]);};
    db.collection(GRUPOS_COLLECTION).find({"curso.codigo_curso": { $not : { $in : arr} }, "periodo.ano": req.params.ano, "periodo.semestre" : req.params.semestre, "curso.codigo_programa" : req.params.programa }).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "No se pudo obtener grupos.");
          } else {
            res.status(200).json(docs);
          }      
    })
});

/*  "/api/grupos/cursos/:ano/:semestre/:programa"
 *    POST: Inserta grupo
 */

app.post('/api/grupos', function(req, res){
    var newDoc = req.body;

    db.collection(GRUPOS_COLLECTION).insertOne(newDoc, function(err, doc) {
        if (err) {
        handleError(res, err.message, "Fallo al crear grupo.");
        } else {
        res.status(201).json(doc.ops[0]);
        }
    });

});

/*  "/api/grupos/cursos/:ano/:semestre/:programa"
 *    PUT: Actualiza grupos masivamente
 */

app.put('/api/grupos/update/many', function(req, res){
    var newDocs = JSON.parse(req.body.array);
    newDocs.forEach(function(element) {
        element._id = new ObjectID(element._id);
        db.collection(GRUPOS_COLLECTION).save(element, function(err, doc) {
            if (err) {
            handleError(res, err.message, "Fallo al crear grupo.");
            } 
        });
    });
    res.status(201).json(newDocs);
});

/*  "/api/grupos/cursos/:ano/:semestre/:programa"
 *    PUT: Actualiza grupos para matricular estudiantes
 */

app.put('/api/grupos/matricula/:id', function(req, res){
    var arr = [];
    var array = req.body.arreglo[0].split(',');
    for(var x in array){arr.push(new ObjectID(array[x]));};
    db.collection(GRUPOS_COLLECTION).updateMany({_id: {$in : arr }}, {$push : { lista_estudiantes : { id_estudiantes : new ObjectID(req.params.id) , rubros: [] } }, $inc : { cupos : -1} } , function( err, doc) {
      if (err) {
        handleError(res, err.message, "Fallo al actualizar grupo");
      } else {
        res.status(200).json(doc);
      }
    });
  });

/*  "/api/grupos/:id"
 *    DELETE: Borra grupo por ID
 */

app.delete('/api/grupos/:id', function(req, res){
    db.collection(GRUPOS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Fallo al borrar grupo");
        } else {
            res.status(200).json(req.params.id);
        }
        });
});

/*  "/api/grupos/topics/:id"
 *    GET: Obtiene los temas del grupo
 */

app.get('/api/grupos/topics/:id', function(req, res){
    var arr = [];
    for(var x in req.query){arr.push(new ObjectID(req.query[x]));};
        db.collection(TOPICS_COLLECTION).find({id_grupo: req.params.id}).toArray(function(err, docs) {
            if (err) {
                handleError(res, err.message, "No se pudo obtener topics.");
              } else {
                res.status(200).json(docs);
              }      
        })
    });

/*  "/api/grupos/topics"
 *    POST: Crea nuevo topic
 */

app.post('/api/grupos/topics', function(req, res){
    var newDoc = req.body;

    db.collection(TOPICS_COLLECTION).insertOne(newDoc, function(err, doc) {
        if (err) {
        handleError(res, err.message, "Fallo al crear Topic.");
        } else {
        res.status(201).json(doc.ops[0]);
        }
    });

});

/*  "/api/grupos/topics/:id"
 *    PUT: Actualiza el topic de un grupo
 */

app.put('/api/grupos/topics/:id', function(req, res){
    var updateDoc = req.body;
    delete updateDoc._id;
  
    db.collection(TOPICS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Fallo al actualizar grupo");
      } else {
        updateDoc._id = req.params.id;
        res.status(200).json(updateDoc);
      }
    });
  });

/*  "/api/grupos/topic/:id"
 *    GET: Obtiene un topic por ID
 */

app.get('/api/grupos/topic/:id', function(req, res){
    db.collection(TOPICS_COLLECTION).findOne({_id: new ObjectID(req.params.id)}, function(err, docs) {
        if (err) {
            handleError(res, err.message, "No se pudo obtener Topic.");
          } else {
            res.status(200).json(docs);
          }      
    })
});

/*  "/api/grupos/topic/:id"
 *    DELETE: Borra un topic por ID
 */

app.delete('/api/grupos/topic/:id', function(req, res){
    db.collection(TOPICS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Fallo al borrar topic");
        } else {
            res.status(200).json(req.params.id);
        }
        });
});

    

//Usuarios

/*  "/api/usuarios/agg"
 *    GET: Aggregation Framework para obtener usuarios por tipos
 */

app.get('/api/usuarios/agg', function(req, res){
    db.collection(USUARIO_COLLECTION).aggregate([ { $group : { _id : {tipo : "$tipo"}, count: { $sum : 1 } } } ], function(err, docs) {
        if (err) {
            handleError(res, err.message, "No se pudo obtener escuelas.");
          } else {
            console.log("prueba de aggregate");
            res.status(200).json(docs);
          }      
    })
});

/*  "/api/usuarios"
 *    GET: Obtiene usuarios del sistema
 */

app.get('/api/usuarios', function(req, res){
    db.collection(USUARIO_COLLECTION).find().toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "No se pudo obtener usuarios.");
          } else {
            res.status(200).json(docs);
          }      
    })
});

/*  "/api/usuarios/:id"
 *    GET: Obtiene usuario por ID
 */


app.get('/api/usuarios/:id', function(req, res){
    db.collection(USUARIO_COLLECTION).findOne({_id : new ObjectID(req.params.id)}, function(err, doc) {
        if (err) {
            handleError(res, err.message, "No se pudo obtener usuarios.");
          } else {
            res.status(200).json(doc);
          }      
    })
});

/*  "/api/usuarios"
 *    POST: Inserta un nuevo usuario en el sistema
 */

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

/*  "/api/usuarios/:id"
 *    PUT: Actualiza un usuario por ID
 */

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

/*  "/api/usuarios/:id"
 *    DELETE: Borra un usuario del sistema
 */

app.delete('/api/usuarios/:id', function(req, res){
    db.collection(USUARIO_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Fallo al borrar usuario");
        } else {
            res.status(200).json(req.params.id);
        }
        });
});

/*  "/login/:nombre/:password"
 *    GET: Obtiene la sesión de un usuario de acuerdo a su contraseña y email
 */

app.get('/login/:nombre/:password', (req, res) => {
    if (!req.params.nombre) {
      res.json({ success: false, message: 'No username was provided' }); 
    } else {
      if (!req.params.password) {
        res.json({ success: false, message: 'No password was provided.' });
      } else {
            db.collection(USUARIO_COLLECTION).findOne({email : req.params.nombre}, function(err, doc) {
                if (err || doc == null) {
                    res.json({ success: false, message: err });
                  } else {
                        if(typeof(doc.nombre) == 'undefined'){
                            res.json({ success: false, message: 'Usuario no encontrado' });
                        }else{
                            if(doc.password == req.params.password){
                                res.status(200).json({
                                success: true,
                                message: 'Correctamente loggeado',
                                user: doc
                                
                            })
                            }else{
                                res.json({ success: false, message: 'Contraseña equivocada' });
                            }
                        }
                }      
            })
          }
      }
    }   
);

/*  "/api/usuarios/nota/:idU/:idG"
 *    PUT: Genera las notas finales de un grupo
 */

    app.put('/api/usuarios/nota/:idU/:idG', function(req, res){
    var notaFinal = req.body.nota;
    var estatus = req.body.estatus;
    db.collection(USUARIO_COLLECTION).updateOne({_id: new ObjectID(req.params.idU), "historial_cursos.id_grupo": req.params.idG }, {$set : { "historial_cursos.$.nota_final": notaFinal, "historial_cursos.$.estado":estatus }}, function(err, doc) {
        if (err) {
        handleError(res, err.message, "Fallo al actualizar usuario");
        } else {
        
        res.status(200).json({});
        }
    });
    });

    //Asistencia

    /*  "/api/asistencia"
    *    POST: Publica lista de asistencia
    */

    app.post('/api/asistencia', function(req, res){
        var newDoc = req.body;
        newDoc._id = new ObjectID(req.params.id)
        db.collection(ASISTENCIA_COLLECTION).insertOne(newDoc ,function(err, doc) {
            if (err) {
            handleError(res, err.message, "Fallo al crear asistencia.");
            } else {
            res.status(201).json(doc.ops[0]);
            }
        });
    });

    /*  "/api/asistencia/:id"
    *    PUT: Actualiza lista de asistencia
    */

    app.put('/api/asistencia/:id', function(req, res){
      var updateDoc = req.body;
      delete updateDoc._id;
      db.collection(ASISTENCIA_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Fallo al actualizar usuario");
        } else {
          updateDoc._id = req.params.id;
          res.status(200).json(updateDoc);
        }
      });
    });

    /*  "/api/asistencia/:id"
    *    GET: Obtiene lista de asistencia
    */

    app.get('/api/asistencia/:id', function(req, res){
        db.collection(ASISTENCIA_COLLECTION).find({id_grupo : req.params.id}).toArray(function(err, docs) {
            if (err) {
                handleError(res, err.message, "No se pudo obtener grupos.");
              } else {
                console.log("respuesta");
                res.status(200).json(docs);
              }      
        })
    });
    
    //Evaluaciones

    /*  "/api/evaluaciones/:id"
    *    GET: Obtiene las evaluaciones de un grupo
    */

    app.get('/api/evaluaciones/:id', function(req, res){
        db.collection(EVALUACIONES_COLLECTION).find({id_grupo: req.params.id}).toArray(function(err, docs) {
            if (err) {
                handleError(res, err.message, "No se pudo obtener Evaluaciones.");
              } else {
                res.status(200).json(docs);
              }      
        })
    });

    /*  "/api/evaluaciones"
    *    POST: Inserta una nueva evaluación
    */

    app.post('/api/evaluaciones', function(req, res){
        var newDoc = req.body;
    
        if (!req.body.nombre) {
            handleError(res, "Entrada de usuario invalida", "Se debe proveer un nombre.", 400);
        }
    
        db.collection(EVALUACIONES_COLLECTION).insertOne(newDoc, function(err, doc) {
            if (err) {
            handleError(res, err.message, "Fallo al crear Evaluacion");
            } else {
            res.status(201).json(doc.ops[0]);
            }
        });
    });

    /*  "/api/evaluaciones/:id"
    *    PUT: Se actualiza evaluacion por ID
    */

    app.put('/api/evaluaciones/:id', function(req, res){
        var updateDoc = req.body;
      delete updateDoc._id;
    
      db.collection(EVALUACIONES_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Fallo al actualizar Institucion");
        } else {
          updateDoc._id = req.params.id;
          res.status(200).json(updateDoc);
        }
      });
    });

    /*  "/api/evaluaciones/:id"
    *    DELETE: Borra evaluacion por ID
    */
    
    app.delete('/api/evaluaciones/:id', function(req, res){
        db.collection(EVALUACIONES_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
            if (err) {
                handleError(res, err.message, "Fallo al borrar Institucion");
            } else {
                res.status(200).json(req.params.id);
            }
            });
    });

    //MENSAJES

    /*  "/api/mensajes/:id_usuario/:id_destinatario"
    *    GET: Obtiene los mensajes por destinatario y emisor
    */

    app.get('/api/mensajes/:id_usuario/:id_destinatario', function(req, res){
        db.collection(MENSAJES_COLLECTION).find({ $or: [ {id_usuario: req.params.id_usuario, id_destinatario: req.params.id_destinatario}, {id_usuario: req.params.id_destinatario, id_destinatario: req.params.id_usuario }] }).toArray(function(err, docs) {
            if (err) {
                handleError(res, err.message, "No se pudo obtener Mensajes.");
              } else {
                res.status(200).json(docs);
              }      
        })
    });

    /*  "/api/mensajes"
    *    POST: Inserta un mensaje a la discución
    */

    app.post('/api/mensajes', function(req, res){
        var newDoc = req.body;
    
        db.collection(MENSAJES_COLLECTION).insertOne(newDoc, function(err, doc) {
            if (err) {
            handleError(res, err.message, "Fallo al crear Mensaje.");
            } else {
            res.status(201).json(doc.ops[0]);
            }
        });
    
    }); 
    