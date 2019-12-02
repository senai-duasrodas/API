const { Router } = require("express");
import RegisterOrderMaintenance from '../../controller/registerOrderMaintenance/OrderMaintenanceValidate'
import Auth from '../../auth/auth'

const router = Router();
const OrderMaintenance = new RegisterOrderMaintenance();
const jwt = new Auth();

/** 
 *  ROTA DE CADASTRO DE LOCAL INSTALAÇÃO
 * */ 

router.post('/', async (req: any, res: any) => {
  try {
    await jwt.jwtVerify(req)
    const response = await OrderMaintenance.run(req);

    res.status(200).send({ response });
  } catch (err) {
    console.log('deu erro mesmo', err);

    res.status(404).send({ statusCode: 404, err });
  }
});

module.exports = router;