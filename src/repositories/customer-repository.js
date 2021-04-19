const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.authenticate = async (data) => {
    const res = await Customer.findOne({
        email: data.email, password: data.password
    });
    return res;
}

exports.create = async (data) => {
    var customer = new Customer(data);
    await customer.save();
}

exports.getById = async(id) =>{
    const res = await Customer.findById(id)
}