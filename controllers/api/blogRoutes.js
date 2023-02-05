const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const withAuth = require('../../utils/withAuth');

//get every blog post
router.get('/', async (req, res) => {
    try {
        const blogPosts = await BlogPost.findAll({
            include: [{model: User}, {model: Comment}]
        })
        res.status(200).json(blogPosts)
    } catch (err) {
        res.status(500).json(err)
    }
})


//(optional) get every blogpost from one user
router.get('/:id', async (req, res) => {
    try {
        const usersBlogs = await BlogPost.findOne({
            where: {
                blog_user_id: req.params.id
            }
        })
        if(usersBlogs) {
        res.status(200).json(usersBlogs);
    } else {
        res.status(201).json({message: "No user found!"})
    }
    } catch (err) {
        res.status(500).json(err)
    }
})




//create a new blog post
// add withAuth when all logins are setup
router.post('/',  async (req, res) => {
    try {
        const blogData = await BlogPost.create({
            title: req.body.title,
            body: req.body.body,
            blog_user_id: req.body.blog_user_id
        })
        res.status(200).json(blogData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


//edit an existing blog post
router.put('/:id', async (req, res) => {
    try {
    const editPost = BlogPost.update({
        title: req.body.title,
        body: req.body.body,
    }, {
        where: {
            id: req.params.id
        }
    })
    res.status(200).json(editPost)
    } catch (err) {
        res.status(500).json(err)
    }
})

//delete an existing blog post
router.delete('/:id', async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;