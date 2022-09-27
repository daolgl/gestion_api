
module.exports = (sequelize, Sequelize) => {
    const Tarea = sequelize.define("tarea", {
      actividad: {
        type: Sequelize.STRING
      },
      usuario: {
        type: Sequelize.INTEGER
      },
      estatus_actividad: {
        type: Sequelize.STRING
      },
      descripcion_actividad: {
        type: Sequelize.STRING
      },
      documento_entregable: {
        type: Sequelize.STRING
      },
      asignado: {
        type: Sequelize.INTEGER
      },
      fecha_envio: {
        type: Sequelize.DATE
      },
      fecha_final: {
        type: Sequelize.DATE
      },
      isAcepted: {
        type: Sequelize.BOOLEAN
      }
    });
 
    return Tarea
  };