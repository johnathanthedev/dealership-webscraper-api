const express = require("express")
const router = express.Router()
const GoogleScrape = require("../../../services/webscrape/GoogleScrape")
const Vehicle = require("../../../lib/helpers/Vehicle")
const Parser = require("../../../lib/helpers/Parser")

router.get("/", async (req, res) => {
    const { vehicle_year, vehicle_make, vehicle_model, user_zip } = req.body
    const vehicle = new Vehicle(vehicle_year, vehicle_make, vehicle_model)
    const vehicle_search_link = new Parser(vehicle.full_name()).stringToURL()
    const google_scrape = new GoogleScrape(user_zip, vehicle_search_link)
    const car_page_list = await google_scrape.get_data()
    // console.log(car_page_list)
    res.json(car_page_list)
})

router.get("/test", async (req, res) => {
    const { vehicle_year, vehicle_make, vehicle_model, user_zip } = req.body
    const vehicle = new Vehicle(vehicle_year, vehicle_make, vehicle_model)
    const vehicle_search_link = new Parser(vehicle.full_name()).stringToURL()
    const google_scrape = new GoogleScrape(user_zip, vehicle_search_link)
    const car_page_list = await google_scrape.get_data_html()
    res.json(car_page_list)
    // console.log(car_page_list)
})

module.exports = router