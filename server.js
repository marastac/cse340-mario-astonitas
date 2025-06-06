/****************************
 * Require Statements
 ****************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const path = require("path")
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")
const utilities = require("./utilities/")

/****************************
 * Create the Express App
 ****************************/
const app = express()

/****************************
 * View Engine and Layout
 ****************************/
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/****************************
 * Middleware
 ****************************/
app.use(express.static(path.join(__dirname, "public")))

/****************************
 * Routes
 ****************************/
app.use(static)

// Index route
app.get("/", baseController.buildHome)

// Inventory routes
app.use("/inv", inventoryRoute)

/****************************
 * File Not Found Route - must be last route in list
 ****************************/
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})

/****************************
 * Express Error Handler
 * Place after all other middleware
 ****************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message: err.message,
    nav
  })
})

/****************************
 * Local Server Information
 * Values from .env (environment) file
 ****************************/
const port = process.env.PORT || 3000
const host = process.env.HOST || "localhost"

/****************************
 * Log statement to confirm server operation
 ****************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})