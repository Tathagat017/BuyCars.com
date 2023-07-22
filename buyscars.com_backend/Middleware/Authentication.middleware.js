const jwt = require("jsonwebtoken");
const env = require("env2")("./.env");

const AuthenticationHandler = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(
      token.split(" ")[1],
      process.env.JWT_SECRET_KEY,
      (err, decoded) => {
        if (decoded) {
          console.log(decoded);
          req.body["dealerId"] = decoded.dealerId;
          req.body["full_name"] = decoded.full_name;
          next();
        } else {
          res.status(404).send({
            message:
              "Authorization failure.You are not authorized to perform this action",
          });
        }
      }
    );
  } else {
    res.status(404).send({ message: "Please Login first" });
  }
};

module.exports = { AuthenticationHandler };
