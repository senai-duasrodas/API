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
    
    isEmpty.verify(data,  ['sector', 'equipment', 'superiorEquipment', 'description'], '');
    
    if (data.sector === '') throw {
      statusCode: 400,
      message: 'Local Instalação não informado',
    };

    if (data.equipment === '') throw {
      statusCode: 400,
      message: 'Equipamento não informado',
    };

    if (data.superiorEquipment === '') throw {
      statusCode: 400,
      message: 'Equipamento Superior não informado',
    };

    if (data.description === '') throw {
      statusCode: 400,
      message: 'Descrição não informada',
    };
  }

  getQuery(data: any) {
    const post = { Setor_idSetor: data.sector, descricao: data.description, equipamento: data.equipment, equipamentoSuperior: data.superiorEquipment };
    const query = /*sql*/`INSERT INTO ${TABLE} SET ?;`;

    const dataQuery = { query, post, type: 'Equipamento' };
    console.log(dataQuery);
    return dataQuery;
  }
}