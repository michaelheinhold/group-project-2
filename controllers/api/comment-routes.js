const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/withAuth');

router.get('/', (req, res) => {
  Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.body.user_id,
    post_id: req.body.post_id
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: { 
      id: req.params.id
    }
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => res.status(500).json(err));
});

module.exports = router;