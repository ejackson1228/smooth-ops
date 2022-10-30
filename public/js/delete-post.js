// NOT FUNCTIONAL - Error 1451, cannot delete or update a parent row: foreign key constraint fails 
// (`poke_dream_team_db`.`team`, CONSTRAINT `team_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON UPDATE CASCADE)'
async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}
  
  document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);