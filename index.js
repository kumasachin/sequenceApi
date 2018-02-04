var brand = window.utag_data.Brand || window.utag_data.brand || window.LBGBrand || window.brand;

if (brand.toLowerCase() === 'lloyds') {
    module.exports = require('./dist/lbg');
}
else if (brand.toLowerCase() === 'bos') {
    module.exports = require('./dist/bos');
}
else {
    module.exports = require('./dist/halifax');
}
