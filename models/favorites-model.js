const pool = require("../database/")

/* ***************************
 *  Add vehicle to favorites
 * ************************** */
async function addToFavorites(account_id, inv_id) {
  try {
    const sql = "INSERT INTO favorites (account_id, inv_id) VALUES ($1, $2) RETURNING *"
    return await pool.query(sql, [account_id, inv_id])
  } catch (error) {
    console.error("addToFavorites error: " + error)
    return false
  }
}

/* ***************************
 *  Remove vehicle from favorites
 * ************************** */
async function removeFromFavorites(account_id, inv_id) {
  try {
    const sql = "DELETE FROM favorites WHERE account_id = $1 AND inv_id = $2 RETURNING *"
    return await pool.query(sql, [account_id, inv_id])
  } catch (error) {
    console.error("removeFromFavorites error: " + error)
    return false
  }
}

/* ***************************
 *  Get user's favorite vehicles
 * ************************** */
async function getFavoritesByAccountId(account_id) {
  try {
    const sql = `
      SELECT f.favorite_id, f.created_at, i.*, c.classification_name 
      FROM favorites f
      JOIN inventory i ON f.inv_id = i.inv_id
      JOIN classification c ON i.classification_id = c.classification_id
      WHERE f.account_id = $1
      ORDER BY f.created_at DESC
    `
    const data = await pool.query(sql, [account_id])
    return data.rows
  } catch (error) {
    console.error("getFavoritesByAccountId error: " + error)
    return []
  }
}

/* ***************************
 *  Check if vehicle is in favorites
 * ************************** */
async function checkFavoriteExists(account_id, inv_id) {
  try {
    const sql = "SELECT * FROM favorites WHERE account_id = $1 AND inv_id = $2"
    const result = await pool.query(sql, [account_id, inv_id])
    return result.rowCount > 0
  } catch (error) {
    console.error("checkFavoriteExists error: " + error)
    return false
  }
}

/* ***************************
 *  Get favorites count for user
 * ************************** */
async function getFavoritesCount(account_id) {
  try {
    const sql = "SELECT COUNT(*) as count FROM favorites WHERE account_id = $1"
    const result = await pool.query(sql, [account_id])
    return parseInt(result.rows[0].count)
  } catch (error) {
    console.error("getFavoritesCount error: " + error)
    return 0
  }
}

module.exports = {
  addToFavorites,
  removeFromFavorites,
  getFavoritesByAccountId,
  checkFavoriteExists,
  getFavoritesCount
}