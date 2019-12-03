import Create from '../../dao/Create';
import {SSUtils} from '../../utils/utils';
const _ = require('lodash');

const commitData = new Create();
const isEmpty = new SSUtils();

const TABLE = 'ordemServico';

export default class RegisterTipoOrdemValidate {

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
    
    isEmpty.verify(data,  ['orderType'], '');

    if (data.title === '') throw {
      statusCode: 400,
      message: 'Título não informado',
    };
    if (data.summary === '') throw {
        statusCode: 400,
        message: 'Resumo não informado',
    };
    if (data.description === '') throw {
        statusCode: 400,
        message: 'Descrição não informado',
    };
    if (data.plannedStart === '') throw {
        statusCode: 400,
        message: 'Inicio Planejado não informado',
    };
    if (data.plannedEnd === '') throw {
        statusCode: 400,
        message: 'Fim Planejado  não informado',
    };
    if (data.requireStop === '') throw {
        statusCode: 400,
        message: 'Requer parada não informado',
    };
    if (data.beginData === '') throw {
        statusCode: 400,
        message: 'Data de Inicio não informado',
    };
    if (data.equipment === '') throw {
        statusCode: 400,
        message: 'Equipamento não informado',
    };
    if (data.typeMaintenance === '') throw {
        statusCode: 400,
        message: 'Tipo Manutenção não informado',
    };
    if (data.sector === '') throw {
        statusCode: 400,
        message: 'Setor não informado',
    };
    if (data.priority === '') throw {
        statusCode: 400,
        message: 'Prioridade não informado',
    };
    if (data.stats === '') throw {
        statusCode: 400,
        message: 'Status não informado',
    };
  }

  getQuery(data: any) {
    const post = { 
                    titulo: data.title, resumo: data.summary, descricao: data.description, inicioPlanejado: data.plannedStart, 
                    fimPlanejado: data.plannedEnd, requerParada: data.requireStop, dataEmissao: data.beginData, Equipamento_idEquipamento: data.equipment,
                    tipoManutencao_idtipoManutencao: data.typeMaintenance, Setor_idSetor: data.sector, Prioridade_idPrioridade: data.priority, 
                    Status_idStatus: data.stats
                };
    const query = /*sql*/`INSERT INTO ${TABLE} SET ?;`;

    const dataQuery = { query, post, type: 'Ordem de Manutenção' };
    console.log(dataQuery);
    return dataQuery;
  }
}