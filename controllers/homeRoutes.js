const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');

router.get('/', async (req, res) => {
    res.render('homepage', {
       loggedIn: req.session.loggedIn 
    })
})

router.get('/login', async (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/')
        return;
    }

    res.render('login')
})

router.get('/blog', async (req, res) => {
    try {
        const blogPosts = await BlogPost.findAll({
            include: [{model: User}, {model: Comment}]
        })
        const blogs = blogPosts.map((blog) =>
      blog.get({ plain: true })
        );
        res.render('blog', {
        blogs,
        loggedIn: req.session.loggedIn
    })
    } catch (err) {
        res.status(500).json(err)
    }
})

// pass usernames instead of ids
router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await BlogPost.findByPk(req.params.id, {
            include: [{model: User}, {model: Comment}]
        })

        const blog = blogData.get({plain: true})
        const blogComments = blog.comments;

        let allComments = [];
        let allCommentUsers = [];
       
        try {
            for(let i = 0; i < blog.comments.length; i++) {
                let newUser = await User.findByPk(blog.comments[i].comment_user)
                blog.comments[i].comment_username = newUser.dataValues.username
            }         
        } catch (err) {
            res.status(500).json(err)
        }
        res.render('singleblog', {blog, allCommentUsers, loggedIn: req.session.loggedIn})

    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/dashboard', async (req, res) => {
    try {
        console.log(req.session.userId)
        const usersBlogs = await BlogPost.findAll({
            where: {
                blog_user_id: req.session.userId
            }
        })
        let userBlogsData = [];
        usersBlogs.forEach((userBlog) => {
            userBlogsData.push({
                title: userBlog.dataValues.title,
                id: userBlog.dataValues.id,
                body: userBlog.dataValues.body
            })})

            console.log(userBlogsData)


        res.render('dashboard', {usersBlogs: userBlogsData, 
            userId: req.session.userId, userName: req.session.username, loggedIn: req.session.loggedIn})
    } catch (err) {

    }
})

router.get('/edit/:id', async (req, res) => {
    try {
      const editBlog = await BlogPost.findByPk(req.params.id)
      
      const editingBlog = editBlog.dataValues;

      res.render('edit', {blog: editingBlog, userId: req.session.userId, loggedIn: req.session.loggedIn})

    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;