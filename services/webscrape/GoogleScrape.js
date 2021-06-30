const puppeteer = require("puppeteer");
const zip_check = require("../zip/zip_check");
class GoogleScrape {
  constructor(user_zip, vehicle_search_link) {
    this.user_zip = user_zip;
    this.vehicle_search_link = vehicle_search_link;
  }

  async get_data() {
    try {
      let user_city = await zip_check(this.user_zip);
      const google_url = `https://www.google.com/search?q=${this.vehicle_search_link}+for+sale+in+`;

      if (!!user_city.error_message) {
        return { error_message: user_city.error_message };
      } else if (user_city.length > 1) {
        return { error_message: "More than one city available" };
      }

      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      user_city = user_city[0].city;
      await page.goto(`${google_url}${user_city}`);

      const grab_google_info = await this.grab_google_info(page)

      await browser.close();
      return grab_google_info;
    } catch (error) {
      console.error(error.message);
    }
  }

  grab_google_info = async page => {
    const google_info = await page.evaluate(() => {
      const page_containers = document.querySelectorAll("div.g");
      const pages = [];
      page_containers.forEach((element) => {
        const page_link = element.querySelector("a").getAttribute("href");
        const page_title = element.querySelector("a > h3").innerHTML;
        pages.push({
          page_title,
          page_link,
        });
      });
      return pages;  
    })
    return google_info;
  }

  async get_data_html() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const google_info = await this.get_data()
    // const results = []

    // for (let i = 0; i < google_info.length; i++) {
    //   const url = google_info[i].page_link;
    //   await page.goto(url);
    //   const page_info = await page.evaluate(() => {
    //     const container = document.querySelectorAll("div")
    //     return container
    //   })

    //   results.push({ page: page_info})
    //   // vehicle_containers.forEach(element => {
    //   //   results.push(element.innerText)
    //   // })
    // }

    await page.goto(google_info[2].page_link);

    const page_info = await page.evaluate(() => {
      const containers = document.querySelectorAll("div")
      // const containers_info = []

      // containers.forEach(element => {
      //   containers_info.push(element.querySelector("*"))
      // })

      return containers
    })

    await browser.close();
    return page_info
  }

}

module.exports = GoogleScrape;
