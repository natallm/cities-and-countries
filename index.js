import express from "express"
const app = express()

app.use(express.static("src"))

app.listen(3000, "127.0.0.1", () => {
    console.log("working")
})