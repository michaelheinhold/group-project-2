const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/withAuth');

router.get('/', (req, res) => {
  if(req.session.user_id){
    res.redirect('/home')
  }
  res.render('login');
});

router.get('/home', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'post_url',
      'review',
      'user_id'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id'],
        include: {
          model: User,
          attributes: ['username', 'id']
        }
      },
      {
        model: User,
        attributes: ['username', 'id']
      },
    ]
  })
    .then(dbPostData => {
      //serialize
      const posts = dbPostData.map(post => post.get({ plain: true }));
      console.log(posts);
      res.render('feed', { posts, loggedIn: true });
    })
    .catch(err => res.status(500).json(err));
});

router.get('/signup', (req, res) => {
  if(req.session.user_id){
    res.redirect('/home')
  }
  res.render('createAccount');
});

router.get('/create-post', withAuth, (req, res) => {
  res.render('createPost');
})

router.get('/profile', withAuth, (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id
    },
    attributes: ['username', 'id'],
    include: ['followers', 'following', {
      model: Post,
      key: 'user_id',
      include: {
        model: Comment,
        key: 'post_id'
      }
    }]
  })
    .then(dbUserData => {
      const user = dbUserData.get({ plain: true });
      res.render('profile', { user, loggedIn: req.session.loggedIn });
    })
    .catch(err => res.status(500).json(err))
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: User,
        attributes: ['username', 'id']
      },
      {
        model: Comment,
        include: {
          model: User,
          attributes: ['username', 'id']
        }
      }
    ]
  })
    .then(dbPostData => {
      const post = dbPostData.get({ plain: true });
      res.render('single-post', { post, loggedIn: req.session.loggedIn });
    })
    .catch(err => res.status(500).json(err));
})

router.get('/user/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['username', 'id'],
    include: ['followers', 'following', {
      model: Post,
      key: 'user_id',
      include: {
        model: Comment,
        key: 'post_id'
      }
    }]
  })
    .then(dbUserData => {
      const user = dbUserData.get({ plain: true });
      res.render('user-page', { user, loggedIn: req.session.loggedIn });
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
    res.render('followers', { user, loggedIn: req.session.loggedIn });
    })
  .catch(err => res.status(500).json(err))
});

router.get('/:id/following', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    include: ['following']
  })
    .then(dbUserData => {
    const user = dbUserData.get({ plain: true });
    console.log(user)
    res.render('following', { user, loggedIn: req.session.loggedIn });
    })
  .catch(err => res.status(500).json(err))
});

module.exports = router;