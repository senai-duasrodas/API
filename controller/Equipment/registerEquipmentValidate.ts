import Create from '../../dao/Create';
import {SSUtils} from '../../utils/utils';
const _ = require('lodash');

const commitData = new Create();
const isEmpty = new SSUtils();

const TABLE = 'Equipamento';

export default class RegisterEquipmentValidate {

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
    
    isEmpty.verify(data,  ['Setor_idSetor', 'equipamento', 'equipamentoSuperior', 'descricao'], '');
    
    if (data.Setor_idSetor === '') throw {
      statusCode: 400,
      message: 'Local Instalação não informado',
    };

    if (data.equipamento === '') throw {
      statusCode: 400,
      message: 'Equipamento não informado',
    };

    if (data.equipamentoSuperior === '') throw {
      statusCode: 400,
      message: 'Equipamento Superior não informado',
    };

    if (data.descricao === '') throw {
      statusCode: 400,
      message: 'Descrição não informada',
    };
  }

  getQuery(data: any) {
    const post = { Setor_idSetor: data.Setor_idSetor, descricao: data.descricao, equipamento: data.equipamento, equipamentoSuperior: data.equipamentoSuperior };
    const query = /*sql*/`INSERT INTO ${TABLE} SET ?;`;

    const dataQuery = { query, post, type: 'Equipamento' };
    console.log(dataQuery);
    return dataQuery;
  }
}