// document.addEventListener('DOMContentLoaded', () => {
//
// })
const url = `http://localhost:3000/dogs`

// document.getElementById("dog-form").id = "edit-dog-form";
const dogFormEl = document.querySelector('#dog-form')

const dogTableBody = document.querySelector('#table-body')


// run on initialization
  function initialize(){
    //addNewDogButton()
    createDeleteColumn()
    fetchDogs().then(writeDogs)
  }




let selectedDog = undefined;
  function createDeleteColumn(){

    const tableHeadingRow = document.querySelector('tr.padding')
    const deleteHeader = document.createElement('th')
    deleteHeader.className = 'padding center'
    deleteHeader.textContent = "Delete Dog"

    tableHeadingRow.appendChild(deleteHeader)
  }



// get dogs from the server
  function fetchDogs(){

    return fetch(url)
    .then(resp => resp.json())

  }

  function dogRowData(dog){

    return `<td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button class="editBtn">Edit Dog</button></td>
    <td><button class="deleteBtn">Delete Dog</button></td>
    `

  }

// create a single dog row.
  function createTableRow(dog){

    const tableRow = document.createElement('tr')
    tableRow.dataset.dogId = dog.id

    tableRow.innerHTML = dogRowData(dog)

    dogTableBody.appendChild(tableRow)
    const editButton = tableRow.querySelector('.editBtn')
    const deleteButton = tableRow.querySelector('.deleteBtn')

    // add and event listener

    editButton.addEventListener('click',() => autoFillForm(dog))
    deleteButton.addEventListener('click',() => deleteDogfromSever(dog))

  }


// add mulitipe dog rows
  function writeDogs(dogs){

    dogs.forEach(createTableRow)

  }

  function autoFillForm(dog){


    dogFormEl.name.value = dog.name
    dogFormEl.breed.value = dog.breed
    dogFormEl.sex.value = dog.sex




    selectedDog = dog

  }

  // addEventListener for submiting  the form






  function editDogonServer(dog,event){
    event.preventDefault()
    const newUrl = url + `/${dog.id}`

    const name = dogFormEl.querySelector('input[name="name"]').value
    const breed = dogFormEl.querySelector('input[name="breed"]').value
    const sex = dogFormEl.querySelector('input[name="sex"]').value

    const options = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          'name': name,
          'breed':breed,
          'sex': sex
      })
    }

    fetch(newUrl,options)
    .then(resp => resp.json())
    .then(updateDogRow)
    //.then(createTableRow)

  }


  function updateDogRow(dog){

    const dogRow = document.querySelector(`tr[data-dog-id="${dog.id}"]`)

    dogRow.innerHTML = dogRowData(dog)


  }


// delete

  function deleteDogfromSever(dog){
    const dogId = dog.id
    const newUrl = url + `/${dog.id}`

    options = {
      method: 'DELETE',
      headers: {'Content-Type' : 'application/json'},
    }

    fetch(newUrl, options)
    .then(resp => resp.json())
    .then(() => deleteDogfromPage(dogId))

  }


  function deleteDogfromPage(dogId){

      document.querySelector(`tr[data-dog-id="${dogId}"]`).remove()
  }

  // function addNewDogButton(){
  //     const tableMargin = document.querySelector('div.margin')
  //     const addBtnDiv = document.createElement('div')
  //     addBtnDiv.className = "padding"
  //
  //     const addBtn = document.createElement('button')
  //     addBtn.className = 'addBtn'
  //     addBtn.innerText = "Add Dog"
  //
  //     tableMargin.appendChild(addBtnDiv)
  //     addBtnDiv.appendChild(addBtn)
  //
  //
  // }





  dogFormEl.addEventListener('submit', event => editDogonServer(selectedDog,event))


  initialize()
