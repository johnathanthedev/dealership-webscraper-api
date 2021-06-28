const express = require("express")
const router = express.Router()
const google_scrape = require("../../../services/webscrape/google_scrape")

router.get("/", async (req, res) => {
        const user_zip = req.headers.user_zip
        const google_results = await google_scrape(user_zip)
        res.json(google_results)
})

module.exports = router