const uid = function() {
  return Date.now() * Math.floor(Math.random()*100);
}


async function newFormHandler(e) {
    e.preventDefault();
    
    // grabbing post title and url from the form input
    const post_title = document.querySelector('input[name="post-title"]').value.trim();
    const post_description = document.querySelector('input[name="post-description"]').value.trim();

    
    //grabbing id's from selected index in select pokemon form 
    const pokemon1 = document.querySelector('#pokemon-1').options[document.querySelector('#pokemon-1').selectedIndex].id;
    const pokemon2 = document.querySelector('#pokemon-2').options[document.querySelector('#pokemon-2').selectedIndex].id;
    const pokemon3 = document.querySelector('#pokemon-3').options[document.querySelector('#pokemon-3').selectedIndex].id;
    const pokemon4 = document.querySelector('#pokemon-4').options[document.querySelector('#pokemon-4').selectedIndex].id;
    const pokemon5 = document.querySelector('#pokemon-5').options[document.querySelector('#pokemon-5').selectedIndex].id;
    const pokemon6 = document.querySelector('#pokemon-6').options[document.querySelector('#pokemon-6').selectedIndex].id;

    const pokemonSelection = [ // need to grab the id's here^^ to populate a poketeam based on id's
      pokemon1,
      pokemon2, 
      pokemon3,
      pokemon4,
      pokemon5,
      pokemon6
    ];

    const pokemonArray = pokemonSelection.filter(Number);
    
    console.log(post_title, post_description);
    console.log(pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6);
    console.log(pokemonArray);
    
    const teamID = uid();
    const postID = uid();

    console.log(teamID);
    console.log(postID);


 

  async function fetchPostAndTeam () {
    let postFetch = await fetch('/api/posts', {
      method: 'post',
      body: JSON.stringify({
        id: postID,
        title: post_title,
        description: post_description
      }),
      headers: { 'Content-Type': 'application/json'}
    });
    let postResponse = await postFetch.json()

    let teamFetch = await fetch('/api/teams', {
      method: 'post',
      body: JSON.stringify({
        id: teamID,
        post_id: postID
      }),
      headers: {'Content-Type': 'application/json'}
    });
    let teamResponse = await teamFetch.json();
    
    console.log(postResponse)
    console.log(teamResponse)
  };

  
  const poketeamFetch = async function () {
    pokemonArray.forEach(pokemon => {
      fetch('/api/poketeams', {
        method: 'post',
        body: JSON.stringify({
          team_id: teamID,
          pokemon_id: pokemon
        }),
        headers: {'Content-Type': 'application/json'}
      }).then(response => console.log(response));
    });
  };

  const refreshPage = async function() {
    document.location.replace('/dashboard');
  }

 const fetchAll = async function()  {
  await fetchPostAndTeam()
  console.log('Post and Team Request Sent');

  await poketeamFetch()
  console.log('Poketeam request sent');

  await refreshPage();
 };
  
 fetchAll();

};  


document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
