// Needed Resources
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId)

// AGREGA ESTA LÍNEA:
router.get("/detail/:invId", invController.buildByInventoryId)

// Intencional error route for testing
router.get("/trigger-error",(req, res, next) => {
    throw new Error("Intentional 500 error for testing")
})

module.exports = router