module.exports = (obj = {}) => {
  return { error: false, status: 'success', ...obj }
}
