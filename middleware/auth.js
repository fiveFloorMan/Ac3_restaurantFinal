// 這裡是和使用者認證(user authentication)相關的middleware

module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/users/login')
  }
}