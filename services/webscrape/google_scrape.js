const puppeteer = require("puppeteer")

const google_scrape = async (user_zip) => {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    const google_url = "https://www.google.com/search?q=car+dealerships+in+"
    await page.goto(`${google_url}${user_zip}`)

    const grab_google_info = await page.evaluate(() => {
        const page_containers = document.querySelectorAll("div.g")
        const pages = []
        page_containers.forEach(element => {
            const page_link = element.querySelector('a').getAttribute("href")
            const page_title = element.querySelector('a > h3').innerHTML
            pages.push({
                page_title,
                page_link
            })
        })
        return pages
    })
    
    await browser.close()
    return grab_google_info
}

module.exports = google_scrape