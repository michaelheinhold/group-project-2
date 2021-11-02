const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Category = require('./Category');
const UserFollowers = require('./UserFollowers');

//create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

Category.hasMany(Post, {
    foreignKey: 'category_id'
});

Post.belongsTo(Category, {
    foreignKey: 'category_id'
});

User.belongsToMany(User, {
    through: UserFollowers,
    foreignKey: 'follower_id',
    as: 'following',
});

User.belongsToMany(User, {
    through: UserFollowers,
    foreignKey: 'user_id',
    as: 'followers',
})

module.exports = { User, Post, Comment, Category, UserFollowers }