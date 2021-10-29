const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.use('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'post_url',
      'review',
      'user_id'
    ],
    include: {
      model: User,
      attributes: ['username']
    },
    include: {
      model: Comment,
      attributes: ['id', 'comment_text', 'post_id', 'user_id'],
      include: {
        model: User,
        attributes: ['username']
      }
    }
  })
    .then(dbPostData => {
      //serialize
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => res.status(500).json(err));
})

module.exports = router;