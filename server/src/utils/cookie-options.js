module.exports = {
  httpOnly: false,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 1000 * 60 * 60 * 24 * 7,
  sameSite: 'Lax',
}
