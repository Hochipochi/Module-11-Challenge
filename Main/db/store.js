const util = require('util');
const fs = require('fs');

//this package will be used to generate our unique ids
const uuidv1 = require('uuid/v1');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

