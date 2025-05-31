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

/****************************
 * Create the Express App
 ****************************/
const app = express()

/****************************
 * View Engine and Layout
 ****************************/
app.set("views", path.join(__dirname, "views")) // 👈 Correcto para Render
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/****************************
 * Middleware (opcional)
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