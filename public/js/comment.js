async function commentFormHandler(event) {
    event.preventDefault();

    // grab the users typed comment from comment form
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    console.log(comment_text);

    // grab the post id from the url
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // if the comment form has text, post to the comments array
    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);