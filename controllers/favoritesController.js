const favoritesModel = require("../models/favorites-model")
const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const favCont = {}

/* ***************************
 *  Build favorites list view
 * ************************** */
favCont.buildFavoritesList = async function (req, res, next) {
  try {
    const account_id = res.locals.accountData.account_id
    const favorites = await favoritesModel.getFavoritesByAccountId(account_id)
    const grid = await utilities.buildFavoritesGrid(favorites)
    let nav = await utilities.getNav()
    
    res.render("./favorites/favorites-list", {
      title: "My Favorites",
      nav,
      grid,
      favorites,
      errors: null,
    })
  } catch (error) {
    console.error("buildFavoritesList error: " + error)
    next(error)
  }
}

/* ***************************
 *  Add vehicle to favorites
 * ************************** */
favCont.addToFavorites = async function (req, res, next) {
  try {
    const { inv_id } = req.body
    const account_id = res.locals.accountData.account_id

    // Check if already in favorites
    const exists = await favoritesModel.checkFavoriteExists(account_id, inv_id)
    if (exists) {
      req.flash("notice", "This vehicle is already in your favorites.")
      return res.redirect(`/inv/detail/${inv_id}`)
    }

    const result = await favoritesModel.addToFavorites(account_id, inv_id)
    
    if (result) {
      req.flash("notice", "Vehicle added to favorites successfully!")
    } else {
      req.flash("notice", "Failed to add vehicle to favorites.")
    }
    
    res.redirect(`/inv/detail/${inv_id}`)
  } catch (error) {
    console.error("addToFavorites error: " + error)
    req.flash("notice", "An error occurred while adding to favorites.")
    res.redirect(`/inv/detail/${req.body.inv_id}`)
  }
}

/* ***************************
 *  Remove vehicle from favorites
 * ************************** */
favCont.removeFromFavorites = async function (req, res, next) {
  try {
    const inv_id = parseInt(req.params.inv_id)
    const account_id = res.locals.accountData.account_id

    const result = await favoritesModel.removeFromFavorites(account_id, inv_id)
    
    if (result && result.rowCount > 0) {
      req.flash("notice", "Vehicle removed from favorites successfully!")
    } else {
      req.flash("notice", "Failed to remove vehicle from favorites.")
    }
    
    res.redirect("/favorites/")
  } catch (error) {
    console.error("removeFromFavorites error: " + error)
    req.flash("notice", "An error occurred while removing from favorites.")
    res.redirect("/favorites/")
  }
}

/* ***************************
 *  Get favorites as JSON (for AJAX)
 * ************************** */
favCont.getFavoritesJSON = async function (req, res, next) {
  try {
    const account_id = res.locals.accountData.account_id
    const favorites = await favoritesModel.getFavoritesByAccountId(account_id)
    res.json(favorites)
  } catch (error) {
    console.error("getFavoritesJSON error: " + error)
    res.status(500).json({ error: "Failed to retrieve favorites" })
  }
}

/* ***************************
 *  Check if vehicle is favorite (AJAX)
 * ************************** */
favCont.checkFavoriteStatus = async function (req, res, next) {
  try {
    const inv_id = parseInt(req.params.inv_id)
    const account_id = res.locals.accountData.account_id
    const isFavorite = await favoritesModel.checkFavoriteExists(account_id, inv_id)
    res.json({ isFavorite })
  } catch (error) {
    console.error("checkFavoriteStatus error: " + error)
    res.status(500).json({ error: "Failed to check favorite status" })
  }
}

module.exports = favCont