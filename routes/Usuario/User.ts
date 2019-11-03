const { Router } = require("express");
import LoginValidate from '../../controller/loginController/loginValidate'
const router = Router();

const login = new LoginValidate()

router.post("/", async (req: any, res: any) => {
  try {
    console.log('Body / headers', req.body);
    const response = await login.run(req)
    res.status(200).send(response)
  } catch (err) {
    console.log('deu erro mesmo', err);
    res.status(400).send(err);
  }
});

module.exports = router;
