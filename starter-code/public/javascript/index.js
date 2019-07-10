const charactersAPI = new APIHandler("http://localhost:8000")

$(document).ready(() => {
  document.getElementById('fetch-all').onclick = function () {
    let container = document.getElementsByClassName('characters-container')[0]
    axios.get('https://ih-crud-api.herokuapp.com/characters')
      .then((characters) => {
        console.log(characters.data)
        container.innerHTML = "";
        characters.data.forEach((eachOne) => {
          let newChar = document.createElement('div');
          newChar.classList.add("character-info")
          newChar.innerHTML = `
          <div class="id">${eachOne.id}</div>
          <div class="name">${eachOne.name}</div>
          <div class="occupation">${eachOne.occupation}</div>
          <div class="cartoon">${eachOne.debt}</div>
          <div class="weapon">${eachOne.weapon}</div>
              `
          container.appendChild(newChar)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  document.getElementById('fetch-one').onclick = function () {
    let container = document.getElementsByClassName('characters-container')[0]
    let charID = document.getElementById('fetch-one-value').value
    axios.get('https://ih-crud-api.herokuapp.com/characters/' + charID)
      .then((character) => {
        console.log(character.data)
        container.innerHTML = "";

        let newChar = document.createElement('div');
        newChar.classList.add("character-info")
        newChar.innerHTML = `
            <div class="name">${character.data.name}</div>
            <div class="occupation">${character.data.occupation}</div>
            <div class="cartoon">${character.data.debt}</div>
            <div class="weapon">${character.data.weapon}</div>
          `
        container.appendChild(newChar)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  document.getElementById('delete-one').onclick = function () {

  }

  document.getElementById('edit-character-form').onsubmit = function (ev) {
    ev.preventDefault()
    const data = new FormData(ev.target)
    const id = data.get('chr-id');
    const name = data.get('name');
    const occupation = data.get('occupation')
    const weapon = data.get('weapon')
    let debt = data.get('cartoon');

    let debtBoolean = false;
    if (debt === "on") {
      debtBoolean = true;
    }


    axios.put(`https://ih-crud-api.herokuapp.com/characters/${id}`, {
      name: name,
      occupation: occupation,
      weapon: weapon,
      debt: debtBoolean
    })
  }

  document.getElementById('new-character-form').onsubmit = function (ev) {
    const data = new FormData(ev.target)
    const name = data.get('name');
    const occupation = data.get('occupation')
    const weapon = data.get('weapon')
    let debt = data.get('cartoon');

    let debtBoolean = false;
    if (debt === "on") {
      debtBoolean = true;
    }


    axios.post('https://ih-crud-api.herokuapp.com/characters', {
      name: name,
      occupation: occupation,
      weapon: weapon,
      debt: debtBoolean
    })
  }

})
