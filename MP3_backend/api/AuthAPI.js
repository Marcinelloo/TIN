const EmployeeRepository = require("../repository/sequelize/EmployeeRepository");
const config = require("../config/key");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  EmployeeRepository.findByEmail(email).then((user) => {
    if (!user) {
      return res
        .status(401)
        .send({ message: "Nieprawidłowy email lub hasło!" });
    }

    console.log(user.lastName);

    bcrypt
      .compare(password, user.password)
      .then((isEqual) => {
        console.log(isEqual);
        if (!isEqual) {
          return res
            .status(401)
            .send({ message: "Nieprawidłowy email lub hasło!" });
        }
        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id,
          },
          config.secret,
          { expiresIn: "1h" }
        );
        res.status(200).json({ token: token, userId: user._id });
      })
      .catch((err) => {
        console.log(err);
        res.status(501);
      });
  });
};
