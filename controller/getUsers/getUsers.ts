import Retrieve from '../../dao/Retrieve';
import {SSUtils} from '../../utils/utils';
const _ = require('lodash');

const commitData = new Retrieve();
const isEmpty = new SSUtils();

const TABLE = 'usuario';

export default class LoginValidate {

  async run(event: any) {
    try {
      const getQuery = this.getQuery()

      const result = await commitData.run(getQuery);

      console.log('get users result', result);
      return result;
    } catch (err) {
      console.log(err);

      throw err;
    }
  }

  getQuery() {
    const query = /*SQL*/`SELECT * FROM ${TABLE};`

    const dataQuery = { query, type: 'usuários' };

    return dataQuery;
  }
}