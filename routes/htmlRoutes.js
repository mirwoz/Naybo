var db = require("../models");

module.exports = function(app) {
  // LOAD LOGIN PAGE
  // app.get("/", function(req, res) {
  //   res.render("additem");
  // });

  app.get("/", function(req, res) {
    db.Item.findAll({
      // include: [ db.Customer ],
      // order: "name ASC"
    }).then(function(data) {
      res.render("index", { items: data });
    });
  });

  // ===== Items ======
  // View all items
  // app.get("/items", function(req, res) {
  //   db.Item.findAll({}).then(function(data) {
  //     res.render("search", { items: data });
  //   });
  // });

  // // Add item page
  // app.get("/add", function(req, res) {
  //   res.render("additem");
  // });

  // Create a new item entry
  app.post("/items", function(req, res) {
    // Create new Item from /allitems body??
    db.Item.create(req.body).then(function() {
      res.redirect("/");
    });
  });

  // ===== Users ======
  // Specific user account
  app.get("/account/:id", function(req, res) {
    // Get user from ID in parameters
    db.User.findOne({ where: { id: req.params.id } }).then(function(dbUser) {
      // Plug User data into "account" page
      res.render("account", {
        data: dbUser
      });
    });
  });

  // Create a new user entry
  // app.post("/users", function(req, res) {
  //   db.User.create(req.body).then(function() {
  //     res.redirect("/");
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
