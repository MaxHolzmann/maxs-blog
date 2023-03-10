const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

BlogPost.belongsTo(User, {
    foreignKey: 'blog_user_id'
})

User.hasMany(BlogPost, {
    foreignKey: 'blog_user_id',
    onDelete: 'CASCADE'
})

User.hasMany(Comment, {
    foreignKey: 'comment_user'
})

Comment.belongsTo(User, {
    foreignKey: 'comment_user'
})

Comment.belongsTo(BlogPost, {
    foreignKey: 'blog_id'
})

BlogPost.hasMany(Comment, {
    foreignKey: 'blog_id'
})
  



module.exports = { User, BlogPost, Comment };
