const User = require('../Models/usersModel');
const usersDAL = require('../DAL/usersDAL');
const permissionsDAL = require('../DAL/permissionsDAL');
const permissionsBL = require('../Models/permissionsBL');
let today = new Date().toISOString().slice(0, 10)


const getAllUsersFromDB = function () {
    return new Promise((resolve, reject) => {
        User.find({}, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    });

}
const addUSerToJson = async function (user) {
    let users = await usersDAL.getUsersFromJson();
    users.push(user);
    await usersDAL.writeFile(users);
}

const addUserToDB = function (username) {
    return new Promise((resolve, reject) => {
        let user = new User({
            username: username,
        });

        user.save(function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    });
}


const getUserFromDB = function (username) {
    return new Promise((resolve, reject) => {
        User.find({
            username: username
        }, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data[0]);
            }
        })
    });
}
const addUserPassword = function (username, password) {
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ username: username },
            {
                password: password,
            }, function (err) {
                if (err) {
                    reject(err)
                }
                else {
                    resolve('ok');
                }
            })
    })
}

const deleteUserFromDB = function (username) {
    return new Promise((resolve, reject) => {
        User.findOneAndDelete({ username: username }, function (err) {
            if (err) {
                reject(err)
            }
            else {
                resolve('Deleted');
            }
        })
    })
}
const deleteUserFromDBbyId = function (id) {
    return new Promise((resolve, reject) => {
        User.findByIdAndDelete(id, function (err) {
            if (err) {
                reject(err)
            }
            else {
                resolve('Deleted');
            }
        })
    })
}
const deleteUserFromJson = async function (id) {

    let users = await usersDAL.getUsersFromJson();
    let index = users.map(x => x.id).indexOf(id);
    users.splice(index, 1);
    let result = await usersDAL.writeFile(users);

    return result;
}

const getUserFromDBbyId = function (id) {
    return new Promise((resolve, reject) => {
        User.findById(id, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    });
}

const updateUserDB = function (id, username) {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(id,
            {
                username: username,

            }, function (err) {
                if (err) {
                    reject(err)
                }
                else {
                    resolve('Updated');
                }
            })
    })
}
// const updateUserJson = async function (id, user) {
//     await this.deleteUserFromJson(id);
//     await this.addUSerToJson(user);
// }
const updateUserJson = async function (id, user) {
    let users = await usersDAL.getUsersFromJson();
    let index = users.map(x => x.id).indexOf(id);
    users.splice(index, 1);
    users.push(user);
    await usersDAL.writeFile(users);

}
const getUserByIdFromJson = async function (id) {
    let usersJson = await usersDAL.getUsersFromJson();
    const userJson = usersJson.find(u => u.id === id);
    return userJson;
}
const getAllUsersDetails = async function () {
    let usersDB = await getAllUsersFromDB();
    let usersJson = await usersDAL.getUsersFromJson();
    let permissionsJson = await permissionsDAL.getPermissionsFromJson();
    let users = [];
    usersDB.forEach(userDb => {
        if (userDb.username !== "Admin") {
            const userJson = usersJson.find(user => user.id == userDb._id);
            const permissionJson = permissionsJson.find(user => user.id == userDb._id);
            const result = {
                firstName: userJson?.firstName,
                lastName: userJson?.lastName,
                id: userJson?.id,
                username: userDb?.username ? userDb.username : "",
                session: userJson?.session ? userJson.session : "",
                createDate: userJson?.createDate ? userJson.createDate : "",
                permissions: permissionJson?.permissions ? permissionJson.permissions : ""

            }
            users.push(result);
        }
    });
    return users;
}
const updateUser = async function (user) {
    id = user.id;
    let userJson = { firstName: user.firstName, lastName: user.lastName, createDate: user.createDate, session: user.session, id: id };
    console.log(userJson);
    await updateUserDB(id, user.username);
    await updateUserJson(id, userJson);
    await permissionsBL.updatePermissions(id, user.permissions);

}
const AddUser = async function (user) {
    let newUser = await addUserToDB(user.username);
    let newJsonUser = { firstName: user.firstName, lastName: user.lastName, createDate: today, session: user.session, id: newUser._id };
    await addUSerToJson(newJsonUser);
    await permissionsBL.addPermissionToJson(newUser._id, user.permissions);
}
const deleteUser = async function (id) {
    await deleteUserFromDBbyId(id);
    await deleteUserFromJson(id);
    permissionsBL.deletePermissions(id);

}

module.exports = { deleteUser, deleteUserFromDBbyId, AddUser, updateUser, getAllUsersFromDB, getUserFromDB, addUserPassword, addUSerToJson, addUserToDB, deleteUserFromDB, getUserFromDBbyId, deleteUserFromJson, updateUserDB, updateUserJson, getUserByIdFromJson, getAllUsersDetails };