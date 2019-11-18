const { Router } = require("express");
import RegisterCentroTrabalhoValidate from '../../controller/registerCentroTrabalho/registerCentroTrabalhoValidate'
import Auth from '../../auth/auth'

const router = Router();
const CentroTrabalho = new RegisterCentroTrabalhoValidate();
const jwt = new Auth();

/** 
 *  ROTA DE CADASTRO DE CENTRO DE TRABALHO
 * */ 

router.post('/', async (req: any, res: any) => {
  try {
    await jwt.jwtVerify(req)
    const response = await CentroTrabalho.run(req);

    res.status(200).send({ response });
  } catch (err) {
    console.log('deu erro mesmo', err);

    res.status(404).send({ statusCode: 404, err });
  }
});

module.exports = router;