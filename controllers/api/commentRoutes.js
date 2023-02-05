const router = require('express').Router();
const { Comment, User, BlogPost } = require('../../models');


//get all comments that exist
router.get('/', async (req, res) => {
    try {
        const allComments = await Comment.findAll({
            include: [{model: BlogPost}, {model: User}]
        });
        res.status(200).json(allComments);
    } catch (err) {
        res.status(500).json(err)
    }
})

//get all comments on a blog post
router.get('/:id', async (req, res) => {
    try {
        const blogComments = await Comment.findAll({
            where: {
                blog_id: req.params.id
            }
        })
        res.status(200).json(blogComments)
    } catch (err) {
        res.status(500).json(err)
    }
})


//create a new comment
//add withauth
router.post('/', async (req, res) => {
    try {
    const newComment = Comment.create({
        blog_id: req.body.blog_id,
        comment_user: req.body.comment_user,
        comment_body: req.body.comment_body
    })

    res.status(200).json(newComment)
    } catch (err) {
        res.status(500).json(err)
    }
})

// delete a comment
//add withauth
router.delete('/:id', async (req, res) => {
    try {
    const deleteComment = Comment.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json(deleteComment)
    } catch (err) {
        res.status(500).json(err)
    }
})

// edit a comment maybe
//add withauth
router.put('/:id', async (req, res) => {
    try {
    } catch (err) {
        res.status(500).json(err)
    }
})



module.exports = router;