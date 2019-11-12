const { Router } = require("express");
import LoginValidate from '../../controller/loginController/loginValidate'
import Auth from '../../auth/auth'

const router = Router();
const login = new LoginValidate()
const jwt = new Auth()

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
