import Retrieve from '../../dao/Retrieve';
import {SSUtils} from '../../utils/utils';
const _ = require('lodash');

const commitData = new Retrieve();
const isEmpty = new SSUtils();

const TABLE = 'usuario';

export default class LoginValidate {

  async run(event: any) {
    try {
      const data = this.getData(event);

      this.validateData(data);

      const getQuery = this.getQuery(data)

      const result = await commitData.run(getQuery);
      console.log('cheguei até aqui');
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
    
    isEmpty.verify(data,  ['numeroCracha', 'senha'], '');

    console.log('data editado', data);

    if (data.numeroCracha === '') throw {
      statusCode: 400,
      message: 'Crachá não informado',
    };

    if (data.senha === '') throw {
      statusCode: 400,
      message: 'Senha não informado',
    };
  }

  getQuery(data: any) {
    const post = [data.numeroCracha, data.senha];
    const query = /*SQL*/`SELECT ${TABLE}.numeroCracha, ${TABLE}.nivelAcesso, ${TABLE}.nome, ${TABLE}.senha FROM ${TABLE} WHERE ${TABLE}.numeroCracha = ? AND ${TABLE}.senha = ?;`;

    const dataQuery = { query, post, type: 'login' };

    return dataQuery;
  }

}