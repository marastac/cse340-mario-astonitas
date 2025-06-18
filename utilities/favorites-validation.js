const utilities = require(".")
const { body, validationResult } = require("express-validator")
const invModel = require("../models/inventory-model")
const validate = {}

/*  **********************************
  *  Add Favorite Validation Rules
  ********************************** */
validate.addFavoriteRules = () => {
  return [
    // inv_id is required and must be a valid inventory item
    body("inv_id")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Vehicle ID is required.")
      .isInt({ min: 1 })
      .withMessage("Vehicle ID must be a valid number.")
      .custom(async (inv_id) => {
        const vehicleExists = await invModel.getInventoryByInvId(inv_id)
        if (!vehicleExists) {
          throw new Error("Vehicle does not exist.")
        }
      }),
  ]
}

/* ******************************
 * Check add favorite data and return errors or continue
 * ***************************** */
validate.checkAddFavoriteData = async (req, res, next) => {
  const { inv_id } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.flash("notice", "Invalid data provided for adding favorite.")
    return res.redirect(`/inv/detail/${inv_id}`)
  }
  next()
}

module.exports = validate