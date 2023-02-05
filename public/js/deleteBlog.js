const deleteBlog = async (e) => {
    e.preventDefault();

    const blogToDelete = Number(e.target.parentNode.dataset.blogid);

    const response = await fetch ('/api/blog/' + blogToDelete, {
        method: 'DELETE'
    })

    if(response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert('error deleting!')
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll("#del-btn").forEach(el => {
        el.addEventListener('click', deleteBlog);
    });
});