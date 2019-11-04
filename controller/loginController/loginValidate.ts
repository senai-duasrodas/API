import Dao from '../../dao/login/post';
const _ = require('lodash');
const commitData = new Dao();

export default class LoginValidate {

  async run(event: any) {
    try {
      console.log(event);
      const data = this.getData(event);

      this.validateData(data);

      const result = await commitData.run(data);

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
    if (_.isEmpty(data)) throw {
      statusCode: 400,
      message: 'Não existem dados!',
    };

    if (!data.cracha) throw {
      statusCode: 400,
      message: 'Crachá não informado',
    };

    if (!data.senha) throw {
      statusCode: 400,
      message: 'Senha não informado',
    };
  }
}