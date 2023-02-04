const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

BlogPost.belongsTo(User, {
    foreignKey: ''
})



module.exports = { User, BlogPost, Comment };
