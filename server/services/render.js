const axios = require("axios");
const PORT = process.env.PORT || 3100;
const BASE_URI = process.env.BASE_URI || "http://localhost";

exports.home = function (req, res) {
  res.render("index", { title: `Home` });
};

exports.addDrug = function (req, res) {
  res.render("add_drug", { title: `Add Drug` });
};

exports.updateDrug = function (req, res) {
  axios
    .get(`${BASE_URI}:${PORT}/api/drugs`, { params: { id: req.query.id } })
    .then(function (response) {
      res.render("update_drug", { drug: response.data, title: `Edit Drug` });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.manage = function (req, res) {
  axios
    .get(`${BASE_URI}:${PORT}/api/drugs`)
    .then(function (response) {
      res.render("manage", { drugs: response.data, title: "Manage drug info" });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.dosage = function (req, res) {
  // Make a get request to /api/users
  axios
    .get(`${BASE_URI}:${PORT}/api/drugs`)
    .then(function (response) {
      res.render("dosage", { drugs: response.data, title: "Check Dosage" });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.purchase = function (req, res) {
  // Make a get request to /api/users
  axios
    .get(`${BASE_URI}:${PORT}/api/drugs`) //get request to pull drugs
    .then(function (response) {
      res.render("purchase", { drugs: response.data, title: "Purchase Drugs" }); // response from API request stored as drugs to display on manage.ejs
    })
    .catch((err) => {
      res.send(err);
    });
};
