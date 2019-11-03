import { Mysql } from '../database/mysql'
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants'
const connection = new Mysql('localhost', 'root', '', 'duasrodas').createConnection()

const USER_TABLE = 'usuario'

export default class Dao {

  async run(data: any) {
    try {
      const response = await this.runQuery(data);
      console.log('Query response: ', response);
      return response;
    } catch (err) {
      console.log('deu erro', err);
      throw err;
    }
  }

  runQuery(data: any) {
    return new Promise((resolve, reject) => {
      connection.beginTransaction((err: any) => {
        if (err) {
          connection.rollback(() => {
            console.log(err);
            connection.end();
            reject(err);
          })
        }
        connection.query(/*sql*/`
          SELECT
            ${this.fieldsMapping(USER_TABLE, data).select}
          FROM ${USER_TABLE}
          WHERE ${this.fieldsMapping(USER_TABLE, data).where}`
          , (err: any, result: any) => {
            if (err) connection.rollback(() => {
              console.log('err', err);
              connection.end();
              reject(err);
            })
            console.log(result);
            connection.commit((err: any) => {
              if (err) connection.rollback(() => {
                console.log('err', err);
                connection.end()
                reject(err);
              });
            });
            if (result.length === 0) resolve({ result: false });
            resolve({ result: true });
          });
      });
    });
  }

  fieldsMapping(table : string, data: Array<object>) {
    const map = {
      numeroCracha: 'cracha',
      senha: 'senha',
    };

    return this.mapSqlFields(map, table, data)
  }


  mapSqlFields(map: object, table: string, data: any) {
    const sqlFieldsArray = {
      select: `${Object.entries(map).map(([key, value]) => `${table}.${key} AS ${value}`).join(', ') || ''}`,
      where: `${Object.entries(map).map(([key, value]) => `${table}.${key} = '${data[value]}'`).join(' AND ')}`
    }
    console.log('sql filds: ', sqlFieldsArray);
    return sqlFieldsArray;
  } 
}
