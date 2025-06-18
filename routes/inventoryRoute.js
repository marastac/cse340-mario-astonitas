// Needed Resources
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const invValidate = require("../utilities/inventory-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId)

// Route to build inventory item detail view
router.get("/detail/:invId", invController.buildByInventoryId)

// Route to build inventory management view
router.get("/", utilities.checkAccountType, utilities.handleErrors(invController.buildManagement))

// Route to build add classification view
router.get("/add-classification", utilities.checkAccountType, utilities.handleErrors(invController.buildAddClassification))

// Route to build add inventory view
router.get("/add-inventory", utilities.checkAccountType, utilities.handleErrors(invController.buildAddInventory))

// Route to build edit inventory view
router.get("/edit/:inv_id", utilities.checkAccountType, utilities.handleErrors(invController.editInventoryView))

// Route to build delete confirmation view
router.get("/delete/:inv_id", utilities.checkAccountType, utilities.handleErrors(invController.deleteView))

// Route to get inventory by classification_id as JSON
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

// Process the add classification
router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

// Process the add inventory
router.post(
  "/add-inventory", 
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

// Process the update inventory
router.post("/update/", 
  invValidate.inventoryRules(),
  invValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
)

// Process the delete inventory
router.post("/delete/", utilities.handleErrors(invController.deleteInventory))

// Intentional error route for testing
router.get("/trigger-error",(req, res, next) => {
    throw new Error("Intentional 500 error for testing")
})

module.exports = router