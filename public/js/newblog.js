const newBlogForm = document.querySelector('.new-blog-form')

const newBlogHandle = async (e) => {
    e.preventDefault();

    const userId = document.getElementById('userId').dataset.user;
    const blog_user_id = Number(userId)
    const title = document.getElementById('blog-title').value.trim();
    const body = document.getElementById('blog-body').value;

    if (title && body) {
        const response = await fetch('/api/blog/', {
            method: 'POST',
            body: JSON.stringify({title, body, blog_user_id}),
            headers: {'Content-Type': 'application/json'}
        })

        if(response.ok) {
            document.location.replace('/blog')
        } else {
            alert('failed to post')
        }

    }

}

const goToEdit = (e) => {
    e.preventDefault();
    console.log('click')
    const blogId = Number(e.target.parentNode.dataset.blogid)
    document.location.replace('/edit/' + blogId)
}

window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll("#edit-btn").forEach(el => {
        el.addEventListener('click', goToEdit);
    });
});

newBlogForm.addEventListener('submit', newBlogHandle)