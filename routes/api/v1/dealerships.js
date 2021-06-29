const express = require("express")
const router = express.Router()
const GoogleScrape = require("../../../services/webscrape/GoogleScrape")

router.get("/", async (req, res) => {
        const user_zip = req.headers.user_zip
        const google_scrape = new GoogleScrape(user_zip)
        res.json(await google_scrape.get_dealerships_list())
})

module.exports = router