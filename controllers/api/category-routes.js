const router = require('express').Router();
const { Category, Post, User, Comment } = require('../../models');

router.get('/', (req, res) => {
  Category.findAll({
    attributes: ['id', 'type'],
    include: {
      model: Post,
      attributes: ['id', 'title', 'post_url', 'review', 'user_id', 'category_id'],
      include: {
        model: User,
        attributes: ['username']
      },
      include: {
        model: Comment,
        attributes: ['id', 'comment_text', 'user_id', 'post_id'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    }
  })
    .then(dbCategoryData => {
      res.json(dbCategoryData);
    })
    .catch(err => res.status(500).json(err));
})

router.post('/', (req, res) => {
  Category.create({
    type: req.body.type
  })
  .then(dbCategoryData => {
    res.json(dbCategoryData);
  })
  .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    res.json(dbCategoryData);
  })
  .catch(err => res.status(500).json(err));
})

module.exports = router;