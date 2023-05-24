import { NextFunction, Request, Response } from "express"
import { User } from "../entities/User"
import jwt, { verify } from "jsonwebtoken"
import { ExtractJwt,Strategy  } from "passport-jwt";
import { UserData } from "../utils/types";
import passport from "passport";
import AppDataSource from "../../config/ormconfig";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env['ACCESS_SECRET'],
}

export const JwtStrategy = new Strategy(jwtOptions,async ({email, password},done) => {
  const loggedUser = await AppDataSource.getRepository(User).findOneBy({mail: email,password: password})
  if(!loggedUser){
      return done(new Error('No user found in token'), false);
  }

  return done(null,{id: loggedUser.id});
})

export const userPassportMiddleware =  (
  req: Request<any, any, any, any>,
  res: Response,
  next: NextFunction) => {
    passport.authenticate(['userJwt'], { session: false }, async (err:any, user: UserData) => {
      if(err || !user){
        res.status(401).json({error:'Invalid user token', err});
      } else {
        req.user = user;
        next()
      }
    })(req,res,next);
  };

export const generateAccessToken = (user: User) => {
  const accessToken = jwt.sign(
    { 
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.mail
    },
    process.env.ACCESS_SECRET,
    { expiresIn: "5m" }
  );
  
  return accessToken;
};

export const generateRefreshToken = (user: User) => {
  return jwt.sign(
    { id: user.id },
    process.env.ACCESS_REFRESH_SECRET!,
    { expiresIn: "6h" }
  );
};

//Receiving the refresh token from the cookie and if valid generating a new access token
export const refreshToken = (req: Request, res: Response) => {
  const refresh_token = req.cookies.refresh_token;

  if (refresh_token) {
    try {
      const user = verify(
        refresh_token,
        process.env.ACCESS_REFRESH_SECRET
      ) as User;

      res.send({ newToken: generateAccessToken(user) });
    } catch {
      res.status(404).send("Not a valid refresh token");
    }
  } else {
    res.status(404).send("no refresh token - please login");
  }
};
