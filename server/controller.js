// let globalID = 0;
const goals = []
let globalID = 0

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        const fortunes = ["A beautiful, smart, and loving person will be coming into your life.",
        "A dubious friend may be an enemy in camouflage.",
        "A faithful friend is a strong defense.",
        "A feather in the hand is better than a bird in the air",
        "A fresh start will put you on your way.",
        "A friend asks only for your time not your money.",
        "A friend is a present you give yourself.",
        "A gambler not only will lose what he has, but also will lose what he doesn’t have.",
        "A golden egg of opportunity falls into your lap this month.",
        "A good friendship is often more important than a passionate romance.",
        "A good time to finish up old tasks",
        "A hunch is creativity trying to tell you something.",
        "A lifetime friend shall soon be made.",
        "A lifetime of happiness lies ahead of you.",
        "A light heart carries you through all the hard times.",
        "A new outlook brightens your image and brings new friends.",
        "A new perspective will come with the new year",
        "A person is never to (sic) old to learn",
        "A person of words and not deeds is like a garden full of weeds.",
        "A pleasant surprise is waiting for you.",
        "A short pencil is usually better than a long memory any day.",
        "A small donation is call for. It’s the right thing to do.",]

        let randomIndex = Math.floor(Math.random() * fortunes.length)
        let randomFortune = fortunes[randomIndex]

        // console.log("getFortune is being called from controller.js")

        res.status(200).send(randomFortune)
    },
    getGoal: (req, res) => {
        res.status(200).send(goals)
    },

    createGoal: (req, res) => {
        let { elementId, goal, date } = req.body

        let newGoal = {
            id: globalID,
            elementId,
            goal,
            date

        }

        console.log(globalID)

        console.log(newGoal)

        console.log("controller.js has createGoal working")
        globalID++

        goals.push(newGoal)
        console.log("createGoal is running")
        console.log(`goals ${goals}`)
        res.status(200).send(goals)

        // globalID = globalID + 1


    },

    deleteGoal: (req, res) => {
        const {id} = req.params

        console.log("This is running: deleteGoal")
        console.log(id)

        const index = goals.findIndex(gl => {
            return gl.id === +id
        })

        console.log(index)
        console.log(`Before splice: ${goals.length}`)
        goals.splice(index, 1)
        console.log(`After splice: ${goals.length}`)
        res.status(200).send(goals)
    },
    updateGoal: (req, res) => {
        console.log("Update goal request received")
        const { id } = req.params;
        const {date: type} = req.body
        console.log("updateGoal in controller.js is running");
        console.log("ID:", id);
        console.log("New Date:", type);
        console.log(req.body)
        const index = goals.findIndex(gl => {
            console.log(id)
            return gl.id === +id
        })

        goals[index].date = type;
        res.status(200).send(goals);
        
        // const index = goals.findIndex(gl => gl.id === +id);
        // if (index !== -1) {
        //     goals[index].date = date;
        //     res.status(200).send(goals[index]); // Sending back the updated goal
        // } else {
        //     res.status(404).send("Goal not found");
        // }
        // console.log("updateGoal in controller.js is running")
        // console.log(id)
        // const valueOfItem = type ? type.value : undefined

        // // console.log(req.body)

        // if (valueOfItem !== undefined) {
        //     console.log("it is not undefined")
        // } else {
        //     console.log("Date value is missing or invalid")
        //     res.status(400).send("Date value is missing or invalid");
        // }

        // const index = goals.findIndex(gl => gl.id === +id);
        // if (index !== -1) {
        //     goals[index].date = date
        //     res.status(200).send(goals[index]) // Sending back the updated goal
        // } else {
        //     res.status(404).send("Goal not found")
        // }
    }

}