import { Mysql } from '../../database/mysql'
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
          WHERE ${this.fieldsMapping(USER_TABLE, data).where}
        `, (err: any, result: any) => {
          if (err) connection.rollback(() => {
            console.log('err', err);
            connection.end();
            reject(err);
          });
          
          connection.commit((err: any) => {
            if (err) connection.rollback(() => {
              console.log('err', err);
              connection.end();
              reject(err);
            });
          });

          const queryResult = JSON.stringify(result[0]);
          

          if (result.length === 0 || result === undefined) reject({ msg: 'usuário não encontrado!' });
          resolve({ query: JSON.parse(queryResult) });
        });
      });
    });
  }

  fieldsMapping(table : string, data: Array<object>) {
    const select = {
      numeroCracha: 'cracha',
      senha: 'senha',
      nome: 'nome',
      nivelAcesso: 'nivelAcesso'
    };

    const where = {
      numeroCracha: 'cracha',
      senha: 'senha',
    }

    return this.mapSqlFields(select, where, table, data)
  }


  mapSqlFields(select: object, where: object, table: string, data: any) {
    const sqlFieldsArray = {
      select: `${Object.entries(select).map(([key, value]) => `${table}.${key} AS ${value}`).join(', ') || ''}`,
      where: `${Object.entries(where).map(([key, value]) => `${table}.${key} = '${data[value]}'`).join(' AND ')}`
    }
    console.log('sql filds: ', sqlFieldsArray);
    return sqlFieldsArray;
  }
}
