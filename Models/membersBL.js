
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
                City: user.city
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

