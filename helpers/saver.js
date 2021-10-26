const path = require('path');
const fs = require('fs');

async function saveData(data, name) {
    const location = path.join(__dirname, '..', 'data', `${name}.json`);
    
    return new Promise((resolve, reject) => {
        fs.writeFile(location, JSON.stringify(data), err => {
            if (err) {
                return reject(err);
            }
            resolve();
        })
    })
}

module.exports = {
    saveData,
}