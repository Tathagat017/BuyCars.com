const express = require("express");
const { oemModel } = require("../Models/OEM_Specs.model");

const oemRouter = express.Router();

oemRouter.get("/", async (req, res) => {
  try {
    let { query, sort, page, limit, skip } = req.new_query;
    const oem_specs = await oemModel
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    res.status(200).send({ messsage: "Request successful", data: oem_specs });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error in fetching oem_specs,please try again" });
  }
});

oemRouter.post("/add", async (req, res) => {
  const { vehicle_model_name, vehicle_oem_name } = req.body;
  try {
    const existingProduct = await oemModel.findOne({
      vehicle_model_name,
      vehicle_oem_name,
    });

    if (existingProduct) {
      // If the product already exists in the database
      return res.status(409).send({ message: "vehicle model already exists" });
    } else {
      const vehicle = new oemModel(req.body);
      await vehicle.save();
      res.status(200).send({ message: "New vehicle model added" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
});

module.exports = { oemRouter };
