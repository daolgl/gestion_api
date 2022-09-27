module.exports = app => {
    const tareas = require("../controllers/tarea.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tarea
    router.post("/", tareas.create);
  
    // Retrieve all Tareas
    router.get("/", tareas.findAll);

    // Validate tarea
    router.post("/login", tareas.login);
  
    // Retrieve all published Tareas
    router.get("/accepted", tareas.findAllAccepted);
  
    // Retrieve a single Tarea with id
    router.get("/:id", tareas.findOne);
  
    // Update a Tarea with id
    router.put("/:id", tareas.update);
  
    // Delete a Tarea with id
    router.delete("/:id", tareas.delete);
  
    // Delete all Tareas
    router.delete("/", tareas.deleteAll);
  
    app.use('/api/tareas', router);
  };