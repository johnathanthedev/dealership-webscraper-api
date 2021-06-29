const puppeteer = require("puppeteer");
const zip_check = require("../zip/zip_check");

class GoogleScrape {
  constructor(user_zip) {
    this.user_zip = user_zip;
  }

  async get_dealerships_list() {
    try {
      const google_url = "https://www.google.com/search?q=car+dealerships+in+";
      let user_city = await zip_check(this.user_zip);

      if (!!user_city.error_message) {
        return { error_message: user_city.error_message };
      } else if (user_city.length > 1) {
        return { error_message: "More than one city available" };
      }

      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      user_city = user_city[0].city;
      await page.goto(`${google_url}${user_city}`);

      const grab_google_info = await page.evaluate(() => {
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
      });

      await browser.close();
      return grab_google_info;
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = GoogleScrape;
