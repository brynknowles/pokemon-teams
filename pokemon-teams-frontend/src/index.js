const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// When a user loads the page, they should see all trainers, 
// with their current team of Pokemon.


  //GET to fetch our trainers
function getTrainers(){
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(data => {
    console.log(data)
    renderAllTrainers(data)
  })
}
getTrainers()

function renderAllTrainers(trainerData) {
  trainerData.forEach(renderTrainer)
}

const main = document.querySelector('main')
console.log(main)


function createNewPokemonLi(poke) {
  pokeLi = document.createElement('li')
    
    pokeLi.innerHTML = `
      ${poke.nickname}(${poke.species})
      <button data-pokemon-id=${poke.id} class=release>
        Release
      </button>
    `
}

function renderTrainer(trainer) {
    //create trainer 'div', class:card, with data-id, 
    console.log(trainer)

    const trainerDiv = document.createElement("div")

    trainerDiv.className = "card"
    
    trainerDiv.dataset.id = trainer.id

  

    trainerDiv.innerHTML =`
    <p> ${trainer.name} </p>
    <button class=add data-trainer-id=${trainer.id}> Add Pokemon </button>
    <ul id="pokemon-list">
    </ul>
    `

  const trainerPokemon = trainer.pokemons.forEach(poke => {
    ul = trainerDiv.querySelector('ul')
    createNewPokemonLi(poke)
    ul.append(pokeLi)
  })

    main.append(trainerDiv)
    // console.log(trainerPokemon)
    // innerText:trainer name

        //create button 
        // data-trainer-id
        // innerText:Add Pokemon
        //create ul for pokemon
        //create li for pokemon populate with poke info
        // nickname(species)
        //create button, 
            // data-pokemon-id,
            // class: release,
            // innerText:Release
    //append div card to const for main
}



// Whenever a user hits Add Pokemon and they have space on 
// their team, they should get a new Pokemon.
main.addEventListener("click", event => {
  if (event.target.matches('.add')){

    const e = event.target
    console.log(e)

    const card = e.closest('.card')
    const ul = card.querySelector('#pokemon-list')
    console.log(ul)

    const trainerId = e.dataset.trainerId
    // console.log(e.dataset)
      fetch(POKEMONS_URL, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "trainer_id": trainerId
          })
      })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        const newPoke = createNewPokemonLi(data)
        console.log(newPoke)
      })
      .catch(error => {
        // console.log(error.message)
      })
  }
// function addNewPokemon(){
//   document.createElement('li')
})


// Whenever a user hits Release Pokemon on a specific Pokemon 
// team, that specific Pokemon should be released from the team.
// function deletePokemon(){
  main.addEventListener("click", event => {
    if (event.target.matches('.release')){
      const e = event.target
      console.log(e)
      
      const pokemonId = e.dataset.pokemonId
      console.log(pokemonId)

      const pokeUrl = `${POKEMONS_URL}/${pokemonId}`
      console.log(pokeUrl)

        fetch(pokeUrl, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
          e.parentElement.remove()
        })
        .catch(error => {
          alert("Bad Things! Ragnarök")
          console.log(error.message)
        })
    }

  })
// }

