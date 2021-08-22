const jfile = require('jsonfile');

let PermissionsPath = './configs/permissions.json';


const getPermissionsFromJson = function () {
    return new Promise((resolve, reject) => {
        jfile.readFile(PermissionsPath, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}
const writeFile = function (obj) {

    return new Promise((resolve, reject) => {
        jfile.writeFile(PermissionsPath, obj, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve('Succeeded')
            }
        })

    })
}

module.exports = { getPermissionsFromJson, writeFile };