const router = require('express').Router();
const { User, UserFollowers, Post, Comment, Category } = require('../../models');

router.get('/:id/followers', (req, res) => {
  UserFollowers.findAll({
    where: { user_id: req.params.id },
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    res.status(500).json(err)
    console.log(err)
  });
});

module.exports = router;