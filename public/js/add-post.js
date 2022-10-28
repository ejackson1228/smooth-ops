// import a uuid generator
const { v4: uuidv4 } = require('uuid');

async function newFormHandler(e) {
    e.preventDefault();
    
    // grabbing post title and url from the form input
    const post_title = document.querySelector('input[name="post-title"]').value.trim();
    const post_description = document.querySelector('input[name="post-description"]').value.trim();

    

    const pokemon1 = document.querySelector('#pokemon-1').options[document.querySelector('#pokemon-1').selectedIndex].id;
    const pokemon2 = document.querySelector('#pokemon-2').options[document.querySelector('#pokemon-2').selectedIndex].id;
    const pokemon3 = document.querySelector('#pokemon-3').options[document.querySelector('#pokemon-3').selectedIndex].id;
    const pokemon4 = document.querySelector('#pokemon-4').options[document.querySelector('#pokemon-4').selectedIndex].id;
    const pokemon5 = document.querySelector('#pokemon-5').options[document.querySelector('#pokemon-5').selectedIndex].id;
    const pokemon6 = document.querySelector('#pokemon-6').options[document.querySelector('#pokemon-6').selectedIndex].id;

    const pokemonSelection = [ // need to grab the id's here to populate a poketeam based on id's
      pokemon1,
      pokemon2,
      pokemon3,
      pokemon4,
      pokemon5,
      pokemon6
    ];

    const pokemonArray = [];

    pokemonSelection.forEach(pokemon => { //filter out pokemon "none" selections. 
      if (!null || !undefined || !'') { // "none" selections don't have an id and therefore return as an empty string 
        pokemonArray.push(pokemon);
      }
    })
    
    console.log(post_title, post_description);
    console.log(pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6);
    console.log(pokemonArray);
    
    //const teamID = uuidv4();
    //const postID = uuidv4();

  //   const fetchAll = async function() {
  //       fetch(`/api/posts`, {
  //       method: 'POST',
  //       body: JSON.stringify({ //add a uuid generator to have id's consistent across all creations
  //         id: postID,
  //         title: post_title,
  //         description: post_description,
  //         user_id: req.session.user_id
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     .then( fetch('/api/teams', { //create team second, table holds fk to post
  //       method: 'POST',
  //       body: JSON.stringify({
  //         id: teamID ,//input uuid generator
  //         user_id: req.session.user_id,
  //         post_id: postID // input variable that makes post id
  //       }),
  //       headers: { 'Content-Type': 'application/json' }
  //     })) //post fetch to create new team 
  //     .then( pokemonArray.forEach(pokemon => { // create poketeam last, holds fk to team and pokemon
  //       fetch('/api/poketeams', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         team_id: teamID,//input uuid variable that creates team_id
  //         pokemon_id: pokemon.id 
  //       })
  //     }) // post fetch to create new poketeam
  //   }))
    
  //   const response = await fetchAll();
    
  //   if (response.ok) {
  //     document.location.replace('/dashboard');
  //   } else {
  //     alert(response.statusText);
  //   }
  // }
};
  

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);