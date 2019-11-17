const { Router } = require("express");
import LoginValidate from '../../controller/loginController/loginValidate'
import registerUserValidate from '../../controller/registerUser/registerUserValidate'
import getUsers from '../../controller/getUsers/getUsers'
import Auth from '../../auth/auth'

const router = Router();
const login = new LoginValidate();
const register = new registerUserValidate();
const getUser = new getUsers();
const jwt = new Auth();

/** 
 *  ROTA DE VALIDAÇÃO DE LOGIN
 * */ 

router.post('/', async (req: any, res: any) => {
  try {
    const response = await login.run(req);
    const token = await jwt.jwtToken(response)

    res.status(200).send({ token: token });
  } catch (err) {
    console.log('deu erro mesmo', err);

    res.status(404).send({ statusCode: 404, err });
  }
});

/** 
 *  ROTA DE REGISTRO DE USUÁRIO
 * */ 

router.post('/register', async (req: any, res: any) => {
  try {
    await jwt.jwtVerify(req)
    console.log('DEU CERTO');
    const response = await register.run(req);

    console.log('user response', response);
    
    res.status(200).send({msg: response});
  } catch (err) {
    console.log('deu erro mesmo', err);

    res.status(404).send({ statusCode: 404, err });
  }
});

/**
 * ROTA DE REGISTRO DE EQUIPAMENTO
 */

router.post('/equipamento', async (req: any, res: any) => {
  try {
    await jwt.jwtVerify(req)
    console.log('DEU CERTO');
    const response = await register.run(req);

    console.log('user response', response);
    
    res.status(200).send({msg: response});
  } catch (err) {
    console.log('deu erro mesmo', err);

    res.status(404).send({ statusCode: 404, err });
  }
});


/** 
 *  ROTA PARA PEGAR TODOS OS USUÁRIOS CADASTRADOS
 * */ 

router.get('/get', async (req: any, res: any) => {
  try {
    await jwt.jwtVerify(req)
    console.log('DEU CERTO');
    const response = await getUser.run(req);

    console.log('user response', response);
    
    res.status(200).send(response);
  } catch (err) {
    console.log('deu erro mesmo', err);

    res.status(404).send({ statusCode: 404, err });
  }
});

/** 
 *  ROTA DE VALIDAÇÃO DE TOKEN
 * */ 

router.post('/token', async (req: any, res: any) => {
  try {
    const response = await jwt.jwtVerify(req)
    await login.run(response)

    res.status(200).send({ authorized: true })
  } catch (err) {
    console.log('Deu erro mesmo', err);

    res.status(401).send({ statusCode: 401, err })
  }
})

module.exports = router;
