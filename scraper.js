const ScrAmazon = require('./scrapers/amazon')

teste = async () => {
    const query = 'lapis faber castell';
    const result = await ScrAmazon.getINFO(query)
    console.log(result)
}
teste()