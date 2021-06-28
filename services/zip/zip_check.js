const axios = require("axios")
require('dotenv').config();

const zip_check = async (user_zip) => {
    try {
        const ZIPCODE_BASE_ZIP_URL = process.env.ZIPCODE_BASE_ZIP_URL
        const ZIPCODE_BASE_API_KEY = process.env.ZIPCODE_BASE_API_KEY
        const { data } = await axios.get(`${ZIPCODE_BASE_ZIP_URL}=${user_zip}`, {
            headers: {
                "apikey": ZIPCODE_BASE_API_KEY
            }
        })
        const geo_info = data.results[`${user_zip}`]
        const us_city_check = geo_info.some(obj => obj.country_code === "US")

        return data.results[`${user_zip}`] && us_city_check 
        ? data.results[`${user_zip}`].filter(obj => obj.country_code === "US") 
        : { error_message: "Invalid zip. US only." }
        
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = zip_check