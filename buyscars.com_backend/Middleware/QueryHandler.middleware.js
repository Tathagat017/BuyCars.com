const QueryHandler = async (req, res, next) => {
  if (req.method === "GET") {
    const query = {};

    // If search query is provided
    if (req.query.search) {
      query["vehicle_model_name"] = { $regex: req.query.search, $options: "i" };
    }

    if (req.query.oem) {
      query["vehicle_oem_name"] = {
        $regex: req.query.oem,
        $options: "i",
      };
    }
    if (req.query.year) {
      query["year_of_launch"] = {
        $regex: req.query.year,
        $options: "i",
      };
    }

    // If filter queries are provided, filter data by the corresponding fields
    if (req.query.price) {
      if (req.url.includes("oem_specs")) {
        query["vehicle_ex_showroom_price"] = {
          $lte: Number(req.query.price),
        };
      } else {
        query["vehicle_dealer_price"] = {
          $lte: Number(req.query.price),
        };
      }
    }
    if (req.query.color) {
      query["vehicle_original_paint"] = {
        $regex: req.query.color,
        $options: "i",
      };
    }
    if (req.query.mileage) {
      query["vehicle_mileage"] = { $gte: Number(req.query.mileage) };
    }
    if (req.query.city) {
      query.vehicle_current_location = {
        $regex: req.query.city,
        $options: "i",
      };
    }

    // If sort query is provided,
    let sort = {};
    if (req.query.sort) {
      if (req.query.sortBy) {
        sort[req.query.sortBy] = req.query.sortOrder === "desc" ? -1 : 1;
      } else {
        sort["vehicle_dealer_price"] = req.sortOrder == "desc" ? -1 : 1;
      }
    }
    // Set default pagination parameters
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    // Add the query and sort parameters to the request object
    req["new_query"] = { query, sort, page, limit, skip };

    // Pass control to the next middleware in the chain
    next();
  } else {
    next();
  }
};
module.exports = { QueryHandler };
