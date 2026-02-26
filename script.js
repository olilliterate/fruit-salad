const fruitForm = document.querySelector("#inputSection form");
const fruitList = document.querySelector("#fruitSection ul");
const fruitNurition = document.querySelector("#nutritionSection p")
const fruitContainer = document.querySelector("#fruitContainer img")

fruitForm.addEventListener("submit", extractFruit);

function extractFruit(e) {
    e.preventDefault();
    grabFruit(e.target.fruitInput.value);
    e.target.fruitInput.value = "";
    
}

let cal = 0;

function addFruit(fruit) {
    const li = document.createElement("li");
    li.textContent = fruit.name;
    li.style.color = "red";
    li.addEventListener("click", removeFruit);
    fruitList.appendChild(li);
    cal += fruit.nutritions.calories;
    fruitNurition.textContent = cal;
    grabImage(fruit.name);
}

function removeFruit(e) {
    e.target.remove();
}


function fetchFruit(fruit) {
    fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
        .then(processResponse)
        .then(data => addFruit(data))
        .catch((e) => console.log(e))
}

async function grabFruit(fruit) {
    try {
        const resp = await fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
        if (resp.ok) {
            const data = await resp.json();
            addFruit(data);
        } else {
           console.log(`Error: http status code = ${resp.status}`)
        }
    } catch (e) {
        console.log(e)
    }
    
}

function processResponse(resp) {
    if (resp.ok) {
        return resp.json();
    } else{
        throw `Error: http status code = ${resp.status}`
    }
}


function grabImage(term) {
    fetch(`https://pixabay.com/api/?key=54809843-bb4f0eddad29244cd001bfc2a&q=${term}`)
        .then(processResponse)
        .then(data => addImage(data))
        .catch((e => console.log(e)))
}

async function fetchImage(term) {
    try {
        const resp = await fetch(`https://pixabay.com/api/?key=54809843-bb4f0eddad29244cd001bfc2a&q=${term}`)
        if (resp.ok) {
            const data = await resp.json();
            addImage(data);
        }
        else{
            console.log(`Error: http status code = ${resp.status}`)
        }
    } catch (e){
        console.log(e)
    }
}

function addImage(data) {
    
    fruitContainer.src = data.hits[0].webformatURL;
}