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
