const router = require('express').Router();
const { Post, User, Comment, Category } = require('../../models');
const withAuth = require('../../utils/withAuth');

router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'post_url',
      'review',
      'user_id',
      'created_at',
    ],
    order: [['created_at', 'DESC']],
    include: {
      model: User,
      attributes: ['username']
    },
    include: {
      model: Category,
      attributes: ['type']
    }
  })
    .then(dbPostData => {res.json(dbPostData)})
    .catch(err => res.json(err));
});

router.post('/', (req, res) => {
  Post.create({
    title: req.body.title,
    post_url: req.body.post_url,
    review: req.body.review,
    user_id: req.body.user_id,
    category_id: req.body.category_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => res.status(500).json(err));
});

router.put('/:id', withAuth, (req, res) => {
  Post.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(dbPostData => res.status(500).json(dbPostData));
});

router.delete('/:id', withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(dbPostData => res.status(500).json(dbPostData));
})

module.exports = router;