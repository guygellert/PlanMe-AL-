import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import httpStatus from "http-status"

export const authenticate = (req: Request, res: Response, next: any) => {
    const token = req.headers.authorization?.split(" ")[1]

    if (token == null)
        return res.status(httpStatus.UNAUTHORIZED).send()

    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
        if (err)
            return res.status(httpStatus.FORBIDDEN).send(err.message)

        next()
    })
}