module.exports = app => {
    const user = require("../controllers/userController.js");

    var router = require("express").Router();

    router.post("/login", user.login);
    router.post("/insertPositionData", user.insertPositionData)
    router.post("/getUserData", user.getUserData)
    
    app.use("/", router);
};
      