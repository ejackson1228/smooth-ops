async function newFormHandler(event) {
    event.preventDefault();
    
    // grabbing post title and url from the form input
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const description = document.querySelector('input[name="post-description"]').value.trim();
    
    // send the form input to /api/posts with a POST request
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        user_id: req.session.user_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);