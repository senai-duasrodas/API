import { Mysql } from '../database/mysql'
const connection = new Mysql('localhost', 'root', '', 'duasrodas').createConnection()

export default class Retrieve {

  async run(data: any) {
    try {
      console.log('post data', data);

      const response = await this.runQuery(data);
      
      return response
    } catch (err) {
      console.log('deu erro', err);

      throw err;
    }
  }

  runQuery(data: any) {
    return new Promise((resolve, reject) => {
      connection.query(data.query, data.post || '', (err: any, result: any) => {
        if (err) return reject(err);
        
        console.log('result', result);
        
        if (result.length === 0 || result === undefined) return reject({ result: 'Usuário não encontrado!' });
        
        const newResult = this.getQueryResult(result)
        console.log(newResult);
        return resolve({ query: newResult });
      });
    });
  }

  getQueryResult(result: any) {
    if (result.length > 1) return JSON.parse(JSON.stringify(result));
    return JSON.parse(JSON.stringify(result[0]))
  }
}
