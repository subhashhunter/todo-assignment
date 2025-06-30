import express from "express"
import cors from "cors"
import router from "./routes/index.js"

const app=express()
const PORT=3001

app.use(cors())
app.use(express.json())

app.use('/tasks',router)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});