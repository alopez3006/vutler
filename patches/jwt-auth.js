const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('[JWT-AUTH] JWT_SECRET environment variable is required!');
  throw new Error('JWT_SECRET not configured');
}
module.exports = { JWT_SECRET };