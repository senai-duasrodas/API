import { Mysql } from '../database/mysql'
const connection = new Mysql('localhost', 'root', '', 'duasrodas').createConnection()

const _ = require('lodash')

export default class Delete {

  async run(data: any) {
    try {
      console.log('post data', data);

      const response = await this.runQuery(data);
      
      console.log('Create', response);

      return response
    } catch (err) {
      console.log('deu erro', err);

      throw err;
    }
  }

  runQuery(data: any) {
    return new Promise((resolve, reject) => {
      connection.query(data.query, data.post, (err: any, result: any) => {
        if (err) {
          console.log("erro: ", err)          
          return reject('Ocorreu um erro na hora de deletar' + err);
        }
        
        console.log('result', result);

        const newResult: any = this.getQueryResult(result, data.type);

        console.log('cheguei aqui');
        
        if (newResult.err) return reject(newResult.err);
        
        return resolve(newResult);
      });
    });
  }

  getQueryResult(res: any, type: any) {
    const result = JSON.parse(JSON.stringify(res));
    console.log('result?', result);
    if (_.isEmpty(result)) return { err: 'Ocorreu um erro na hora de deletar os dados :(' };
    if (result && result.affectedRows > 0) return `${type} deletado com sucesso!`;
    return { err: 'Não foi possível encontrar o usuário para deletar!' };
  }
}
