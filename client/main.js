const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const form = document.querySelector("form")

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

const getGoals = () => axios.get(`${baseURL}goals`).then(goalCallback).catch(errCallback)

const goalCallback = ({ data: goals}) => {  
    displayGoals(goals)
    console.log('goalCallback is being run, html should update')
}
const errCallback = err => console.log(err)

const createGoal = body => axios.post(`${baseURL}goals`, body).then(goalCallback).catch(errCallback)

console.log(`${baseURL}goals`)

const updateGoal = (id, type) => {
    console.log(id)
    console.log(type)

    axios.put(`${baseURL}goals/${id}`, { date: type })
        .then(goalCallback)
        .catch(errCallback)
}

const submitGoal = (e) => {
    e.preventDefault()

    let goal = document.querySelector(`#goal`)
    let date = document.querySelector('#whenGoalCompleted')
    let id = goal.value.replace(/\s+/g, '')

    console.log(`submitGoal goal: ${goal.value}`)
    console.log(`submitGoal gate: ${date.value}`)
    console.log(`submitGoal ID: ${id}`)

    let bodyObj = {
        elementId: id,
        goal: goal.value,
        date: date.value
    }

    createGoal(bodyObj)


    goal.value = ''
    date.value = ''
}

const deleteGoal = (id) => axios.delete(`${baseURL}goals/${id}`).then(goalCallback).catch(errCallback)

const createGoalList = (goal) => {
    const goalList = document.createElement('li');
    goalList.classList.add('goal-list');

    const goalIdWithoutSpaces = goal.goal.replace(/\s+/g, '');

    goalList.innerHTML = `<p>${goal.goal} - Done by: ${goal.date}</p>`

    const createDateInput = document.createElement('input')
    createDateInput.type = "date"
    createDateInput.id = `${goalIdWithoutSpaces}-createDateInput`

    console.log(`ID: ${goal.id}`)

    const deleteBtn = document.createElement('button')
    deleteBtn.id = `delete-${goal.id}`
    deleteBtn.textContent = "X"
    deleteBtn.addEventListener("click", (() => {
        deleteGoal(goal.id)
    }))

    // Select the delete button by its id
    const updateBtn = document.createElement('button') //document.getElementById(`update${}`)
    updateBtn.id = `update-${goal.id}`
    updateBtn.textContent = 'Update Button'
    updateBtn.addEventListener('click', (() => {

        const newDateInput = document.getElementById(`${goalIdWithoutSpaces}-createDateInput`)
        const newDate = newDateInput.value
        updateGoal(goal.id, newDate)
    }))

    // console.log(goalIdWithoutSpaces)

    // createForm.appendChild(createField)
    // createForm.appendChild(updateBtn)
    goalList.appendChild(deleteBtn)
    goalList.appendChild(createDateInput)
    goalList.appendChild(updateBtn)
    goalsContainer.appendChild(goalList);
}

const displayGoals = (arr) => {
    goalsContainer.innerHTML = ``
    for (let loopingNumber = 0; loopingNumber < arr.length; loopingNumber++) {
        createGoalList(arr[loopingNumber])
    }
}

complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune)
form.addEventListener('submit', submitGoal)

if (getGoals() == true) {
    getGoals()
} else {
    console.log('getGoals() is not true')
}