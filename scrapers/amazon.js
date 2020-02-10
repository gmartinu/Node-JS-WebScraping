const axios = require('axios');
const cheerio = require('cheerio');

const rowCounter = "#search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.s-right-column.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(5) > div.s-result-list.s-search-results.sg-row > div"//rows

module.exports = {
  async getINFO(query){
    const url = `https://www.amazon.com.br/s?k=${query.split(' ').join('+')}`;
    const { data: html } = await axios.get(url).catch(() => {
      console.log("Couldn't get the page ☹️")
    });

    $ = cheerio.load(html.toString());
    const rows = $(rowCounter).length;
    
    const result = [];
    for(let i = 1; i < rows; i++){
        try {
            const link      =    `#search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.s-right-column.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(5) > div.s-result-list.s-search-results.sg-row > div:nth-child(${i}) > div > span > div > div > div:nth-child(3) > h2 > a` // link sem desconto
            const name      =    `#search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.s-right-column.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(5) > div.s-result-list.s-search-results.sg-row > div:nth-child(${i}) > div > span > div > div > div:nth-child(3) > h2 > a > span`//nome sem desconto
            const whole     =    `#search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.s-right-column.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(5) > div.s-result-list.s-search-results.sg-row > div:nth-child(${i}) > div > span > div > div > div:nth-child(5) > div > div > a > span > span:nth-child(2) > span.a-price-whole`//preço sem desconto
            const fraction  =    `#search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.s-right-column.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(5) > div.s-result-list.s-search-results.sg-row > div:nth-child(${i}) > div > span > div > div > div:nth-child(5) > div > div > a > span > span:nth-child(2) > span.a-price-fraction`//decimais sem desconto
            
            let _link = $(link).attr("href"); let _name = $(name).text(); let _whole = $(whole).text(); let _fraction = $(fraction).text();
            let _price = `${_whole}${_fraction}`; let _itemUrl = `https://www.amazon.com.br${_link}`

            result.push({
                title: _name,
                value: _price,
                link: _itemUrl
            })
        }catch(err){console.log(err)}
    }
    return result
  }
}