const { Router } = require("express");
import RegisterEquipmentValidate from '../../controller/registerEquipment/registerEquipmentValidate'
import Auth from '../../auth/auth'

const router = Router();
const Equipment = new RegisterEquipmentValidate();
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

module.exports = router;
