const { Router } = require("express");
import RegisterTipoOrdem from '../../controller/registerTipoOrdem/registerTipoOrdemValidate'
import Auth from '../../auth/auth'

const router = Router();
const TipoOrdem = new RegisterTipoOrdem();
const jwt = new Auth();

/** 
 *  ROTA DE CADASTRO DE TIPO DE ORDEM DE MANUTENÇÃO
 * */ 

router.post('/', async (req: any, res: any) => {
  try {
    await jwt.jwtVerify(req)
    const response = await TipoOrdem.run(req);

    res.status(200).send({ response });
  } catch (err) {
    console.log('deu erro mesmo', err);

    res.status(404).send({ statusCode: 404, err });
  }
});

module.exports = router;