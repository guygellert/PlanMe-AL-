import { Request, Response } from "express"
import { User } from "../entity/User"
import jwt, { verify } from "jsonwebtoken"

export const generateAccessToken = (user: User) => {
  const { id } = user;
  const accessToken = jwt.sign(
    { id: id },
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
