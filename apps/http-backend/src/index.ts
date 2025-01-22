import express, { Request, Response } from "express"
import Jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {CreateUserSchema, CreateRoomSchema, SigninSchema} from "@repo/common/types";
import {client} from '@repo/db/client'
import bcrypt from 'bcrypt'

const app = express();
const port = 3001;
const prisma =  client

// signup
app.post('/signup', async (req:Request, res:Response) => {

    //check for schema
    const data = CreateUserSchema.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({
            message: "Incorrect inputs",
            errors: data.error.errors
        });
    }

    const { username, password } = req.body;

    // check if user already exists, if not the save to db
    const doesExists = await prisma.user.findFirst({
        where:{
            username: username
        }
    })

    if (doesExists) {
        res.status(409).json({
            message: "User with this username already exists. Please try another or sign in.",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword,
                name: req.body.name || "PK's guest",
            },
        });
    
        res.status(201).json({
            userId: user.id,
        });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            message: "Internal server error",
        });
    }

})

//signin
app.post("/signin", async (req: Request, res: Response) => {
    // Validate input
    const data = SigninSchema.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({
            message: "Incorrect inputs",
        });
    } else {
        const { username, password } = req.body;

        try {
            // Find user by username
            const user = await prisma.user.findUnique({
                where: { username },
            });

            if (!user) {
                res.status(404).json({
                    message: "User not found",
                });
            } else {

                // Compare password
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    res.status(401).json({
                        message: "Invalid credentials",
                    });

                } else {
                    // Generate JWT
                    const token = Jwt.sign({ userId: user.id }, JWT_SECRET, {
                        expiresIn: "1d",
                    });

                    res.json({
                        token,
                    });
                }
            }
        } catch (error) {
            console.error("Error during signin:", error);
            res.status(500).json({
                message: "Internal server error",
            });
        }
    }
});


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