import jwt from 'jsonwebtoken'

export default class Auth {

  jwtToken(res: any) {
    return new Promise((resolve, reject) => {
      jwt.sign(res.query, 'twoWheelsSenai', { expiresIn: '12h' }, (err: any, token: any) => {
        if (err) reject(err);
        resolve(token);
      })
    })
  }

  jwtVerify(token: any) {
    return new Promise(async (resolve, reject) => {
      const bearer: any = await this.getBearerToken(token)

      jwt.verify(bearer, 'twoWheelsSenai', (err: any, authData: any) => {
        if (err) reject('Erro ao autenticar!');
        resolve({body: authData});
      })
    })
  }

  getBearerToken(token: any) {
    return new Promise((resolve, reject) => {
      const bearerHeader = token.headers['authorization'];
      if (typeof bearerHeader == undefined) reject('token inválido!');
      const bearer = bearerHeader.split(' ')[1]
      
      resolve(bearer);
    })
  }
}