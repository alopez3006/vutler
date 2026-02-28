// WARNING: Use JWT_SECRET env var in production!
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET env var is required');
if (!process.env.JWT_SECRET) {
  console.warn('[JWT-AUTH] Using default JWT_SECRET - set JWT_SECRET env var in production!');
}
module.exports = { JWT_SECRET };