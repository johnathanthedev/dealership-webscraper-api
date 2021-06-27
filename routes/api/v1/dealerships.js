const express = require("express")
const axios = require("axios")
const cheerio = require('cheerio');
const router = express.Router()
const url = 'https://www.chicagotoyota.com/';
const google_scrape = require("../../../services/webscrape/google_scrape")

router.get("/test", async (req, res) => {
        const google_results = await google_scrape("60609")
        res.json(google_results)
})

module.exports = router