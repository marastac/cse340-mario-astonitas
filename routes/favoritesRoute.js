// Needed Resources
const express = require("express")
const router = new express.Router() 
const favoritesController = require("../controllers/favoritesController")
const utilities = require("../utilities/")
const favValidate = require("../utilities/favorites-validation")

// Route to build favorites list view
router.get("/", utilities.checkLogin, utilities.handleErrors(favoritesController.buildFavoritesList))

// Route to add vehicle to favorites
router.post("/add", 
  utilities.checkLogin,
  favValidate.addFavoriteRules(),
  favValidate.checkAddFavoriteData,
  utilities.handleErrors(favoritesController.addToFavorites)
)

// Route to remove vehicle from favorites
router.get("/remove/:inv_id", utilities.checkLogin, utilities.handleErrors(favoritesController.removeFromFavorites))

// Route to get favorites as JSON
router.get("/json", utilities.checkLogin, utilities.handleErrors(favoritesController.getFavoritesJSON))

// Route to check if vehicle is in favorites (AJAX)
router.get("/check/:inv_id", utilities.checkLogin, utilities.handleErrors(favoritesController.checkFavoriteStatus))

module.exports = router