const isYou = (req, res, next) => {
  if(req.params.id == req.session.user_id) {
    res.redirect('/profile');
  } else {
    next();
  }
}

module.exports = isYou;