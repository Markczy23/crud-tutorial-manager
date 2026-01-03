import * as tutorials from "../controllers/tutorial.controller.js";
import express from "express";

export default (app) => {
  let router = express.Router();

  //create new tut
  router.post("/", tutorials.create);

  //retrieve all tuts
  router.get("/", tutorials.findAll);

  //retrieve single tutorial with id
  router.get("/:id", tutorials.findOne);

  //update tutorial with id
  router.put("/:id", tutorials.update);

  //delete tutorial with id
  router.delete("/:id", tutorials.deleteOne);

  //delete all tutorials
  router.delete("/", tutorials.deleteAll);

  //find all published tutorials
  router.get("/published", tutorials.findAllPublished);

  app.use("/api/tutorials", router);
};
