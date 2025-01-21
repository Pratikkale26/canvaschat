import express, { Request, Response } from "express"
import Jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {CreateUserSchema, CreateRoomSchema, SigninSchema} from "@repo/common/types"

const app = express();
const port = 3001;

app.post('/signup', (req:Request, res:Response) => {

    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success) {
        res.json({
            messge: "incorrect inputs"
        })
        return;
    }

    // db call 
    res.json({
        userId: "4545"
    })

})

app.post('/signin', (req: Request, res: Response) => {
    const data = SigninSchema.safeParse(req.body)
    if(!data.success){
        res.json({
            message: "incorrect Inputs"
        })
        return
    }
    res.send("hello this is pratik");

    const userId = 1;
    const token = Jwt.sign({
        userId
    }, JWT_SECRET)

    res.json({
        token
    })
})

app.post('/room', middleware, (req: Request, res: Response) => {
    const data = CreateRoomSchema.safeParse(req.body)
    if(!data.success){
        res.json({
            message: "incorrect Inputs"
        })
        return
    }
    res.send("hello this is pratik");
    // db call

    res.json({
        roomId: 345
    })
})




app.listen(port, () => {
    console.log(`http server is running on : http://localhost:${port}`)
})