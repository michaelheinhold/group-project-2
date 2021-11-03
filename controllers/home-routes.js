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
  User.findOne({
    where: {
      id: req.session.user_id
    },
    attributes: ['username', 'id'],
    include: ['followers', 'following', {
      model: Post,
      key: 'user_id'
    }]
  })
    .then(dbUserData => {
      const user = dbUserData.get({ plain: true });
      res.render('profile', { user, loggedIn: true });
    })
    .catch(err => res.status(500).json(err))
});

router.get('/user/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['username', 'id'],
    include: ['followers', 'following', {
      model: Post,
      key: 'user_id'
    }]
  })
    .then(dbUserData => {
      const user = dbUserData.get({ plain: true });
      res.render('profile', { user, loggedIn: true });
    })
    .catch(err => res.status(500).json(err))
})

router.get('/:id/followers', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    include: ['followers']
  })
    .then(dbUserData => {
    const user = dbUserData.get({ plain: true });
    console.log(user)
    res.render('followers', { user, loggedIn: true });
    })
  .catch(err => res.status(500).json(err))
})

module.exports = router;