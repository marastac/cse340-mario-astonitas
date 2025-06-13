const pool = require("../database/")

/* *****************************
*   Register new account
* *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password){
  try {
    const sql = "INSERT INTO accounts (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
    return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
  } catch (error) {
    console.error("registerAccount error: " + error)
    return error.message
  }
}

/* **********************
 *   Check for existing email
 * ********************* */
async function checkExistingEmail(account_email){
  try {
    const sql = "SELECT * FROM accounts WHERE account_email = $1"
    const email = await pool.query(sql, [account_email])
    console.log("DEBUG - Email check for:", account_email, "Found rows:", email.rowCount)
    return email.rowCount
  } catch (error) {
    console.error("checkExistingEmail error: " + error)
    return 0  // Return 0 if an error occurs
  }
}

module.exports = { registerAccount, checkExistingEmail }