const express = require("express")
const axios = require("axios")
const cheerio = require('cheerio');
const puppeteer = require("puppeteer")
const router = express.Router()
const url = 'https://www.chicagotoyota.com/';

router.get("/test", async (req, res) => {
    try {
		const { data } = await axios.get(
			url
		);
		const $ = cheerio.load(data);
		const vehicle_links = [];

        $('ul.vehicle-list > li.vehicle-list-item > div > a').map((index, item) => {
            const vehicle_link = item.attribs.href
            vehicle_links.push(vehicle_link)
        })

		res.json(vehicle_links);
	} catch (error) {
		throw error;
	}
})

module.exports = router