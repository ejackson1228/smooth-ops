async function commentFormHandler(event) {
    event.preventDefault();

    // grab the users typed comment from comment form
    const new_comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    console.log(new_comment_text);

    // grab the post id from the url
    const comment_post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (new_comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id: comment_post_id,
                comment_text: new_comment_text
            }),
            headers: {'Content-Type': 'application/json'}
            });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    } else {
        alert('Please input at least 3 characters to add a comment!');
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);