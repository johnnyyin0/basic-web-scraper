const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

// const url = 'https://cactusplantfleamarket.com/';

// axios.get(url)
//   .then((res) => {
//   const html = res.data;
//   const $ = cheerio.load(html);
//   const products = [];

//   $('.ProductItem').each((i, el) => {
//     const name = $(el).find('.ProductItem__Title-2').text().trim();
//     const price = $(el).find('.ProductItem__Price-2').text().trim();
//     const imageUrl = $(el).find('img.ProductItem__Image').attr('data-src').replace('{width}', '1200');
//     const date = new Date()

//     products.push({
//       url: url,
//       name,
//       price,
//       imageUrl,
//       date,
//     });
//   });

//   console.log('THESE ARE FETCHED DATA: ', products)

//   const data = JSON.stringify(products, null, 2);
//   fs.writeFile('cpfm_products.json', data, err => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('Data written to file');
//     }
//   });
// }).catch(error => {
//   console.log(error);
// });

const url = 'https://kith.com/collections/new-arrivals';

axios.get(url)
  .then((res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    const products = [];

    $('.product-card').each((i, el) => {
      const index = i
      const productUrl = $(el).find('.product-card > a').attr('href')
      const name = $(el).find('.product-card__title').text().trim();
      const price = $(el).find('.product-card__price').text().trim();
      const date = new Date();


      const imageUrl = $(el).find('img.product-card-image__first').attr('src')
      console.log('THIS IS THE IMAGE: ', imageUrl)

      products.push({
        index,
        productUrl,
        name,
        price,
        date,
      });
    });

    console.log('SCRAPED PRODUCTS: ', products);

    const data = JSON.stringify(products, null, 2);
    const fileName = 'kith_products.json';

    fs.writeFile(fileName, data, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Data written to ${fileName}`);
    });
    
  }) .catch((err) => {
    console.log(err);
  });