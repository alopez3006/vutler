const { Pool } = require("pg");

const pool = new Pool({
  host: "84.234.19.42",
  port: 6543,
  database: "postgres",
  user: "tenant_vutler_service.vaultbrix-prod",
  password: process.env.VAULTBRIX_PASSWORD,
  ssl: false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000
});

pool.on("connect", (client) => { 
  client.query("SET search_path TO tenant_vutler"); 
});

pool.on("error", (err) => { 
  console.error("[Vaultbrix] Pool error:", err.message); 
});

/**
 * Query with automatic retry on connection errors
 * @param {string} text - SQL query
 * @param {Array} params - Query parameters
 * @param {number} maxRetries - Maximum retry attempts (default: 2)
 * @returns {Promise} Query result
 */
async function queryWithRetry(text, params, maxRetries = 2) {
  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await pool.query(text, params);
    } catch (err) {
      lastError = err;
      const isConnectionError = 
        err.code === 'ECONNREFUSED' || 
        err.code === 'ETIMEDOUT' || 
        err.code === 'ENOTFOUND' ||
        err.message.includes('connection') ||
        err.message.includes('timeout');
      
      if (!isConnectionError || attempt === maxRetries) {
        throw err;
      }
      
      // Exponential backoff: 100ms, 200ms, 400ms
      const delay = Math.min(100 * Math.pow(2, attempt), 1000);
      console.warn(`[Vaultbrix] Query retry ${attempt + 1}/${maxRetries} after ${delay}ms:`, err.message);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw lastError;
}

/**
 * Health check - returns "ok", "degraded", or throws
 */
async function healthCheck() {
  try {
    await pool.query('SELECT 1');
    return 'ok';
  } catch (err) {
    console.error('[Vaultbrix] Health check failed:', err.message);
    return 'degraded';
  }
}

module.exports = pool;
module.exports.queryWithRetry = queryWithRetry;
module.exports.healthCheck = healthCheck;
