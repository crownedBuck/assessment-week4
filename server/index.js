const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment,
        getFortune,
        createGoal,
        deleteGoal,
        updateGoal } = require('./controller')
// const { getFortune } = require('./controller')

app.get("/api/compliment", getCompliment);
app.get('/api/fortune', getFortune)
app.post('/api/goals', createGoal)
app.delete('/api/goals/:id', deleteGoal)
app.put('/api/goals/:id', updateGoal)

app.listen(4000, () => console.log("Server running on 4000"));
