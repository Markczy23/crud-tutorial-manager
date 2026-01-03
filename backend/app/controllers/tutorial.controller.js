import { where } from "sequelize";
import db from "../models/index.js";

const Op = db.Sequelize.Op;
const Tutorial = db.tutorials;

//Create and save new tut
export const create = (req, res) => {
  //validate content not empty
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  //create new tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  Tutorial.create(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating new Tutorial",
      });
    });
};

//Get all tutorials or get all by title
export const findAll = (req, res) => {
  const title = req.body.title;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving tutorials",
      });
    });
};

//find single tut by ID
export const findOne = (req, res) => {
  const id = req.body.id;

  Tutorial.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find tutorial with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving tutorial with id=${id}`,
      });
    });
};

//update tutorial by id
export const update = (req, res) => {
  const id = req.body.id;

  Tutorial.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Tutorial updated successfully!",
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe tutorial not found or res.body = empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Tutorial with id=${id}`,
      });
    });
};

//delete tut by id
export const deleteOne = (req, res) => {
  const id = req.body.id;

  Tutorial.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Tutorial deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete tutorial with id=${id}. Maybe it cannot be found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error occurred deleting tutorial with id=${id}`,
      });
    });
};

//delete all tutorials
export const deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} tutorials deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured when deleting all tutorials.",
      });
    });
};

//find all published tuts
export const findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured finding all published tutorials.",
      });
    });
};
