const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {
}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    blog_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'blog_post',
            key: 'id'
        }
    },
    comment_body: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
})

module.exports = Comment;
