const { Router } = require("express");
import RegisterCauseValidate from '../../controller/CausaSintoma/registerCausaValidate'
import RegisterSintomaValidate from '../../controller/CausaSintoma/registerSintomaValidate'
import Auth from '../../auth/auth'

const router = Router();
const cause = new RegisterCauseValidate()
const symptom = new RegisterSintomaValidate()
const jwt = new Auth();

/** 
 *  ROTA DE CADASTRO DE CAUSA
 * */ 

router.post('/causa', async (req: any, res: any) => {
  try {
    await jwt.jwtVerify(req)
    const response = await cause.run(req);

    res.status(200).send(response);
  } catch (err) {
    console.log('deu erro mesmo', err);

    res.status(404).send(err);
  }
});

router.post('/sintoma', async (req: any, res: any) => {
  try {
    await jwt.jwtVerify(req)
    const response = await symptom.run(req);

    res.status(200).send(response);
  } catch (err) {
    console.log('deu erro mesmo', err);

    res.status(404).send(err);
  }
});

module.exports = router;