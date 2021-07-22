
const RestDal = require('../DALS/membersRestDal');
const Member = require('../Models/membersModel');



exports.addMembersToDB = async function () {
    try {
        const resp = await RestDal.getMembers();
        const FullDataArr = resp.data;
        FullDataArr.forEach(user => {
            const member = new Member({
                Name: user.name,
                Email: user.email,
                City: user.address.city
            });
            member.save((err) => {
                if (err) {
                    return err;
                }
            });
        });

    } catch (err) {
        return err;
    }
}

exports.getAllMembersFromDB = function () {
    return new Promise((resolve, reject) => {
        Member.find({}, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    });

}

exports.getMemberFromDBbyId = function (id) {
    return new Promise((resolve, reject) => {
        Member.findById(id, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    });
}
exports.updateMemberDB = function (id, obj) {
    return new Promise((resolve, reject) => {
        Member.findByIdAndUpdate(id, obj

            , function (err) {
                if (err) {
                    reject(err)
                }
                else {
                    resolve('Updated');
                }
            })
    })
}
exports.deleteMemberFromDB = function (obj) {
    return new Promise((resolve, reject) => {
        Member.findOneAndDelete(obj, function (err) {
            if (err) {
                reject(err)
            }
            else {
                resolve('Deleted');
            }
        })
    })
}
exports.addOneMember = function (obj) {
    return new Promise((resolve, reject) => {
        let member = new Member(
            obj
        );
        member.save(err => {
            if (err) {
                reject(err);
            }
            else {
                resolve('Created  with id : ' + member._id);
            }
        })
    })
}
