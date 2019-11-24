const { Router } = require("express");
import RegisterEquipmentValidate from '../../controller/equipment/registerEquipmentValidate'
import GetEquipment from '../../controller/equipment/getEquipment'
import Auth from '../../auth/auth'

const router = Router();
const Equipment = new RegisterEquipmentValidate();
const getEquipment = new GetEquipment();
const jwt = new Auth();

/** 
 *  ROTA DE CADASTRO DE EQUIPAMENTO
 * */ 

router.post('/', async (req: any, res: any) => {
  try {
    await jwt.jwtVerify(req)
    const response = await Equipment.run(req);

    res.status(200).send({ response });
  } catch (err) {
    console.log('deu erro mesmo', err);

    res.status(404).send({ statusCode: 404, err });
  }
});

/** 
 *  ROTA PARA PEGAR EQUIPAMENTO
 * */ 

router.get('/get', async (req: any, res: any) => {
  try {
    await jwt.jwtVerify(req)
    const response = await getEquipment.run(req);

    res.status(200).send({ response });
  } catch (err) {
    console.log('deu erro mesmo', err);

    res.status(404).send({ statusCode: 404, err });
  }
});


module.exports = router;
