const { User, Post, Comment } = require('../../models');
const { sequelize } = require('../../models/UserFollowers');
const UserFollowers = require('../../models/UserFollowers');
const router = require('express').Router();
const withAuth = require('../../utils/withAuth');

router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(500).json(err));
});

router.get('/:id/followers', (req, res) => {
  User.findAll({
    where: {
      id: req.params.id
    },
    attributes: { exclude: ['email', 'password']},
    include: ['followers']
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    res.status(500).json(err)
    console.log(err)
  });
});

router.get('/:id/following', (req , res) => {
  User.findAll({
    where: {
      id: req.params.id
    },
    attributes: { exclude: ['email', 'password']},
    include: ['following']
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(dbUserData => {
      req.session.save(()=> {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        
        res.json(dbUserData);
      });
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
      });
});

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(dbUserData => {
      if(!dbUserData) {
        res.status(400).json({ message: 'No user with that email found' });
        return;
      }

      const validPassword = dbUserData.checkPassword(req.body.password);
      if(!validPassword) {
        res.status(400).json({ message: 'Incorrect Password!' });
        return;
      }
      
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
      
    })
});

router.post('/logout', withAuth, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/:id/follow', (req, res) => {
  UserFollowers.create({
    user_id: req.params.id,
    follower_id: req.session.user_id
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(500).json(err));
});

router.post('/:id/unfollow', (req, res) => {
  UserFollowers.destroy({
    where: {
      user_id: req.params.id,
      follower_id: req.session.user_id
    }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(500).json(err));
})

router.put('/:id', withAuth, (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => res.status(500).json(err));
});

router.delete('/:id', withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => res.status(500).json(err));
})

module.exports = router;