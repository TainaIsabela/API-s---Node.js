const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const authService = require('../services/auth-service');

exports.authenticate = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O Nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'O Email inválido');
    contract.hasMinLen(req.body.password, 6, 'A senha  deve conter pelo menos 3 caracteres');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        const customer = await repository.authenticate(({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        }))
        if (!customer) {
            res.status(404).send({message: "Usuário ou senha inválidos"});
            return;
        }
        const token = await authService.generateToken({
            email: customer.email,
            name: customer.name
        });

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });

    } catch (e) {
        res.status(400).send({
            message: 'Falha ao cadastrar o produto',
            data: e
        });

    }
}