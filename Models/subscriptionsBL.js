
const Subscription = require('../Models/subscriptionsModel');


exports.getAllSubscriptionsFromDB = function () {
    return new Promise((resolve, reject) => {
        Subscription.find({}, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    });

}

exports.getSubscriptionFromDBbyId = function (id) {
    return new Promise((resolve, reject) => {
        Subscription.findById(id, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    });
}
exports.updateSubscriptionDB = function (id, obj) {
    return new Promise((resolve, reject) => {
        Subscription.findByIdAndUpdate(id, obj

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
exports.deleteSubscriptionFromDB = function (obj) {
    return new Promise((resolve, reject) => {
        Subscription.findOneAndDelete(obj, function (err) {
            if (err) {
                reject(err)
            }
            else {
                resolve('Deleted');
            }
        })
    })
}
exports.addOneSubscription = function (obj) {
    return new Promise((resolve, reject) => {
        let subscription = new Subscription(
            obj
        );
        subscription.save(err => {
            if (err) {
                reject(err);
            }
            else {
                resolve('Created  with id : ' + subscription._id);
            }
        })
    })
}
