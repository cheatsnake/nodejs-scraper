const path = require('path');
const fs = require('fs');

async function saveData(data) {
    const location = path.join(__dirname, '..', 'data', 'data.json');
    
    return new Promise((resolve, reject) => {
        fs.appendFile(location, JSON.stringify(data) + ', ', err => {
            if (err) {
                return reject(err);
            }
            console.log('Data saved.');
            resolve();
        })
    })
}

module.exports = {
    saveData,
}