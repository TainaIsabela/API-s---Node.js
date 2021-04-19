const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');


exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O Nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'O Email inválido');
    contract.hasMinLen(req.body.password, 6, 'A senha  deve conter pelo menos 3 caracteres');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.create(req.body)
        res.status(201).send({
            message: 'Cliente cadastrado com sucesso!'
        });

    } catch (e) {
        res.status(400).send({
            message: 'Falha ao cadastrar o produto',
            data: e
        });

    }
}