const express = require("express")
const router = express.Router()
const google_scrape = require("../../../services/webscrape/google_scrape")

router.get("/test", async (req, res) => {
        const google_results = await google_scrape(req.params.user_zip)
        res.json(google_results)
})

module.exports = router