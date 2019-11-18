import Dao from '../../dao/Create';
import {SSUtils} from '../../utils/utils';
const _ = require('lodash');

const commitData = new Dao();
const isEmpty = new SSUtils();

const TABLE = 'usuario';

export default class RegisterUserValidate {

  async run(event: any) {
    try {
      const data = this.getData(event);

      this.validateData(data);

      const dataQuery = this.getQuery(data);

      const result = await commitData.run(dataQuery);

      console.log('validation result', result);

      return result;
    } catch (err) {
      console.log(err);

      throw err;
    }
  }

  getData(evt: any) {
    const data = evt.body || undefined;

    return data;
  }

  validateData(data: any) {
    console.log('data cru', data);
    if (_.isEmpty(data)) throw {
      statusCode: 400,
      message: 'Não existem dados!',
    };
    
    isEmpty.verify(data,  ['nome', 'numeroCracha', 'senha', 'funcao', 'email', 'nivelAcesso'], '');

    if (data.numeroCracha === '') throw {
      statusCode: 400,
      message: 'Crachá não informado',
    };

    if (data.senha === '') throw {
      statusCode: 400,
      message: 'Senha não informada',
    };

    if (data.nome === '') throw {
      statusCode: 400,
      message: 'Nome não informado',
    };

    if (data.funcao === '') throw {
      statusCode: 400,
      message: 'Função não informado',
    };

    if (data.email === '') throw {
      statusCode: 400,
      message: 'E-mail não informado',
    };

    if (data.nivelAcesso === '') throw {
      statusCode: 400,
      message: 'nivel de acesso não informado',
    };
  }

  getQuery(data: any) {
    const post = { numeroCracha: data.numeroCracha, nivelAcesso: data.nivelAcesso, nome: data.nome, senha: data.senha, email: data.email, funcao: data.funcao };
    const query = /*sql*/`INSERT INTO ${TABLE} SET ?;`;

    const dataQuery = { query, post, type: 'Usuário' };

    return dataQuery;
  }
}