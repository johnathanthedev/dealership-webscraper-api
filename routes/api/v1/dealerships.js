const express = require("express")
const router = express.Router()
const google_scrape = require("../../../services/webscrape/google_scrape")
const zip_check = require("../../../services/zip/zip_check")

router.get("/", async (req, res) => {
        const user_zip = req.headers.user_zip
        const google_results = await google_scrape(user_zip)
        res.json(google_results)
})

router.get("/test_02", async (req, res) => {
        const user_zip = req.headers.user_zip
        const zip_results = await zip_check(user_zip)
        res.json(zip_results)
})

module.exports = router