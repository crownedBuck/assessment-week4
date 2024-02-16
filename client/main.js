const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const form = document.querySelector("form")
const buttonChange = document.querySelector("updateTime")

const goalsContainer = document.getElementById("goals")

const baseURL = "http://localhost:4000/api/"

const getCompliment = () => {
    axios.get(`${baseURL}compliment/`)
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    // console.log("getFortune called")
    axios.get(`${baseURL}fortune`)
        .then(res => {
            // console.log("axios.get called")
            const data = res.data;
            alert(data);
    })
}

const goalCallback = ({ data: goals}) => displayGoals(goals)
const errCallback = err => console.log(err)

const createGoal = (body) => {
    axios.post(`${baseURL}goals`, body)
        .then(goalCallback).catch(errCallback)
}

const submitGoal = (e) => {
    e.preventDefault()

    let goal = document.querySelector(`#goal`)
    let date = document.querySelector('#whenGoalCompleted')
    let id = goal.value.replace(/\s+/g, '')

    // console.log(id)

    let bodyObj = {
        id,
        goal: goal.value,
        date: date.value
    }

    createGoalList(bodyObj)

    goal.value = ''
    date.value = ''
}

const deleteGoal = (id) => axios.delete(`${baseURL}goals/${id}`).then(goalCallback).catch(errCallback)

const createGoalList = (goal) => {
    const goalList = document.createElement('li');
    goalList.classList.add('goal-list');

    const goalIdWithoutSpaces = goal.goal.replace(/\s+/g, '');

    goalList.innerHTML = `<p>${goal.goal} - Done by: ${goal.date}<button class="delete-btn" id="${goalIdWithoutSpaces}-delete">X</button><button id="${goalIdWithoutSpaces}-update">Update to Unlimited Time</button></p>`

    // Select the delete button by its id
    const deleteBtn = document.getElementById(`${goalIdWithoutSpaces}-delete`)
    const updateBtn = document.getElementById(`${goalIdWithoutSpaces}-update`)

    console.log(goalIdWithoutSpaces)

    goalsContainer.appendChild(goalList);

    // Add click event listener to the delete button if it exists
    if (deleteBtn) {
        console.log("delete button was created")
        deleteBtn.addEventListener('click', deleteGoal(goalIdWithoutSpaces))
    } else {
        console.log("deleteBtn is false")
    }

    console.log(updateBtn)

    if (updateBtn) {
        console.log("update button was created");
        updateBtn.addEventListener('click', () => updateGoal(goalIdWithoutSpaces));
    } else {
        console.log("updateBtn is false")
    }

// deleteBtn.addEventListener('click', deleteGoal(goalIdWithoutSpaces)) {
//     if (event.target.classList.contains('delete-btn')) {
//         const goalIdWithoutSpaces = event.target.id;
//     }git
// }
}

goalsContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const goalIdWithoutSpaces = event.target.id;
        deleteGoal(goalIdWithoutSpaces);
    }
})

const displayGoals = (arr) => {
    goalsContainer.innerHTML = ``
    for (let loopingNumber = 0; loopingNumber < arr.length; loopingNumber++) {
        createGoalList(arr[loopingNumber])
    }
}

const updateGoal = (id) => {
    axios.put(`${baseURL}goals/${id}`, { date: "unlimited time" })
        .then(goalCallback)
        .catch(errCallback);
}

complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune)
form.addEventListener('submit', submitGoal)

// document.addEventListener('DOMContentLoaded', () => {
//     // Call displayGoals after DOM is fully loaded
//     displayGoals(goals);