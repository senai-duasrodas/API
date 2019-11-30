import Retrieve from '../../dao/Retrieve';

const commitData = new Retrieve();

const TABLE = 'Equipamento';

export default class GetEquipment {

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

    const dataQuery = { query, type: 'Equipamentos' };
    
    return dataQuery;
  }
}