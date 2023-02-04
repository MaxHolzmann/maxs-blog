// const { Category } = require('../models');

// const categoryData = [
//   {
//     category_name: 'Shirts',
//   },
//   {
//     category_name: 'Shorts',
//   },
//   {
//     category_name: 'Music',
//   },
//   {
//     category_name: 'Hats',
//   },
//   {
//     category_name: 'Shoes',
//   },
// ];

// const seedCategories = () => Category.bulkCreate(categoryData);

// module.exports = seedCategories;
const sequelize = require('../config/connection');
const { User, BlogPost, Comment} = require('../models')

const exampleUser = 
    {
        id: 1,
        username: 'Maxim',
        email: 'max@gmail.com',
        password: 'testodah1234'
    }


const exampleBlog = 
    {
        id: 1,
        title: 'Example Blog Title',
        body: 'This is a blog post',
        blog_user_id: 1
    }


const exampleComment = 
    {
        id: 1,
        comment_body: 'Ayyy this blog is good!',
        blog_id: 1
    }


const seedUser = () => User.create(exampleUser);
const seedBlog = () => BlogPost.create(exampleBlog);
const seedComment = () => Comment.create(exampleComment);


const seedAll = async () => {
    
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE Connected -----\n');
  await seedUser();
  console.log('\n----- USER SEEDED -----\n');

  await seedBlog();
  console.log('\n----- Blog SEEDED -----\n');

  await seedComment();
  console.log('\n----- Comment SEEDED -----\n');

  process.exit(0);
}

seedAll();