// 這裡是和使用者認證(user authentication)相關的middleware


module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg',"請先登入才能使用喔")
    res.redirect('/users/login')
  }
}