const express = require("express")
const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())

app.use("/api/v1/dealerships", require("./routes/api/v1/dealerships"))

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})