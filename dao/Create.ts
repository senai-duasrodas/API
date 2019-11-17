import { Mysql } from '../database/mysql'
const connection = new Mysql('localhost', 'root', '', 'duasrodas').createConnection()

const _ = require('lodash')

export default class Create {

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
          const error = this.getQueryError(err, data.type);
          
          return reject(error);
        }
        
        console.log('result', result);

        const newResult: any = this.getQueryResult(result, data.type);

        console.log('cheguei aqui');
        
        if (newResult.err) return reject(newResult.err);
        
        return resolve(newResult);
      });
    });
  }

  getQueryError(err: any, type: string) {
    const error = JSON.parse(JSON.stringify(err));
    if (!_.has(error, 'code')) return 'Ocorreu um erro na hora de salvar os dados :(';
    if (error.code === 'ER_DUP_ENTRY') return `${type} já cadastrado!`;
  }

  getQueryResult(res: any, type: any) {
    const result = JSON.parse(JSON.stringify(res));
    if (_.isEmpty(result)) return { err: 'Ocorreu um erro na hora de salvar os dados :(' };
    if (result && result.affectedRows > 0) return `${type} cadastrado com sucesso!`;
    return { err: 'Ocorreu um erro na hora de salvar os dados :(' };
  }
}
