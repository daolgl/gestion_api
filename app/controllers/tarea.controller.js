const { Sequelize } = require("../models");
const db = require("../models");
const Tareas = db.tarea;
const Op = db.Sequelize.Op;

// Create and Save a new areas
exports.create = (req, res) => {
   // Validate request
  const {actividad, usuario, estatus_actividad, descripcion_actividad, documento_entregable, asignado, fecha_envio, fecha_final, isAcepted} = req.body
   if (!actividad || !usuario || !estatus_actividad || !descripcion_actividad || !documento_entregable || !asignado || !fecha_envio || !fecha_final || !isAcepted ) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tareas
  const tareas = {
    actividad, usuario, estatus_actividad, descripcion_actividad, documento_entregable, asignado, fecha_envio, fecha_final,isAcepted
  };

  // Save Tareas in the database
  Tareas.create(tareas)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tareas."
      });
    });
};

// Retrieve all Tareas from the database.
exports.findAll = (req, res) => {
    // const actividad = req.query.actividad;
    // var condition = actividad ? { actividad: { [Op.like]: `%${actividad}%` } } : null;
  
    Tareas.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tareas."
        });
      });
};

// Find a single Tareas with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tareas.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tareas with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tareas with id=" + id
        });
      });
};


exports.login = (req, res) => {
  const { password, email } = req.body
  Tareas.findOne({ where: Sequelize.and(
    { password },
    { email }
  )})
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Wrong email or password.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Wrong email or password"
      });
    });
};


// Update a Tareas by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Tareas.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tareas was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tareas with id=${id}. Maybe Tareas was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tareas with id=" + id
        });
      });
};

// Delete a Tareas with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tareas.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tareas was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tareas with id=${id}. Maybe Tareas was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tareas with id=" + id
        });
      });
};

// Delete all Tareas from the database.
exports.deleteAll = (req, res) => {
    Tareas.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Tareas were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all tarea."
          });
        });
};

// Find all published Tareas
exports.findAllAccepted= (req, res) => {
    Tareas.findAll({ where: { isAcepted: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tareas."
      });
    });
};