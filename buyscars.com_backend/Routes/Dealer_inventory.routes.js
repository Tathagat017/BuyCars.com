const express = require("express");

const { inventoryModel } = require("../Models/Dealer_inventory.model");

const inventoryRouter = express.Router();

inventoryRouter.get("/", async (req, res) => {
  try {
    const { query, sort, page, limit, skip } = req.new_query;
    const inventory = await inventoryModel
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    res.status(200).send({ messsage: "Request successful", data: inventory });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error in fetching inventory,please try again" });
  }
});

inventoryRouter.post("/add", async (req, res) => {
  try {
    console.log(req.body.full_name);
    let inventory_deal = new inventoryModel({
      ...req.body,
      dealerId: req.body.dealerId,
      dealer_full_name: req.body.full_name,
      date_posted: new Date(),
    });
    await inventory_deal.save();
    res
      .status(200)
      .send({ messsage: "Request successful,deal added in inventory" });
  } catch (err) {
    res.status(500).send({ messsage: err.message });
  }
});

inventoryRouter.patch("/deal/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deal = await inventoryModel.findById(id);

    if (deal) {
      inventoryModel.findByIdAndUpdate({ _id: id }, req.body);
      res
        .status(200)
        .send({ messsage: "Request successful,deal edited and saved" });
    } else {
      res.status(409).send({ message: "Invalid Request" });
    }
  } catch (err) {
    res.status(500).send({ messsage: err.message });
  }
});

inventoryRouter.delete("/deal/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let deal = await inventoryModel.find({ _id: id });
    if (deal) {
      await inventoryModel.findByIdAndDelete({ _id: id });
      res.status(200).send({ message: "deleted successfully" });
    }
  } catch (err) {
    res.status(500).send("Error in deleting employees,please try again");
  }
});

inventoryRouter.delete("/deletemany", async (req, res) => {
  try {
    const idsToDelete = req.body.idsToDelete;
    console.log(idsToDelete);
    await inventoryModel.deleteMany({ _id: { $in: idsToDelete } });
    res.status(200).send({ message: "deleted successfully" });
  } catch (err) {
    res.status(500).send({
      messaeg: "Error in deleting employees,please try again",
      err: err,
    });
  }
});

module.exports = { inventoryRouter };
