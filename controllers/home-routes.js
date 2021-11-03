const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', (req, res) => {
  // Post.findAll({
  //   attributes: [
  //     'id',
  //     'title',
  //     'post_url',
  //     'review',
  //     'user_id'
  //   ],
  //   include: {
  //     model: User,
  //     attributes: ['username']
  //   },
  //   include: {
  //     model: Comment,
  //     attributes: ['id', 'comment_text', 'post_id', 'user_id'],
  //     include: {
  //       model: User,
  //       attributes: ['username']
  //     }
  //   }
  // })
  //   .then(dbPostData => {
  //     //serialize
  //     const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('login');
    // })
    // .catch(err => res.status(500).json(err));
});

router.get('/signup', (req, res) => {
  res.render('createAccount');
});

router.get('/profile', (req, res) => {
  res.render('profile');
});

module.exports = router;