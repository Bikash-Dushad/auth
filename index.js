const express = require("express")
const app = express()
const port = 3002

app.get("/auth", async (req, res) => {
    return res.send("Hi auth")
})

app.listen(port, () => {
    console.log("server is running on 3002")
})