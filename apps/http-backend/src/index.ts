import express, { Request, Response } from "express"
import Jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {CreateUserSchema, CreateRoomSchema, SigninSchema} from "@repo/common/types";
import {prismaClient} from '@repo/db/client'
import bcrypt from 'bcrypt'

const app = express();
const port = 3001;
const prisma =  prismaClient

app.use(express.json())

// signup
app.post('/signup', async (req:Request, res:Response) => {

    //check for schema
    const data = CreateUserSchema.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({
            message: "Incorrect inputs",
            errors: data.error.errors
        });
        return
    }

    const { username, password } = req.body;

    // check if user already exists, if not the save to db
    const doesExists = await prisma.user.findUnique({
        where:{
            email: username
        }
    })

    if (doesExists) {
        res.status(409).json({
            message: "User with this username already exists. Please try another or sign in.",
        });
        return
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                email:username,
                password: hashedPassword,
                name: req.body.name || "guest",
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
        return
    } else {
        const { username, password } = req.body;

        try {
            // Find user by username
            const user = await prisma.user.findUnique({
                where: { email: username },
            });

            if (!user) {
                res.status(404).json({
                    message: "User not found",
                });
                return
            } else {

                // Compare password
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    res.status(401).json({
                        message: "Invalid credentials",
                    });
                    return

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
            return
        }
    }
});


app.post('/room', middleware, async (req: Request, res: Response) => {
    const parsedData = CreateRoomSchema.safeParse(req.body)
    if(!parsedData.success){
        res.json({
            message: "incorrect Inputs"
        })
        return
    }

    const userId = req.userId
    if (!userId) {
        res.status(401).json({
            message: "Unauthorized: User ID is missing",
        });
        return
    }

    try {
        const room = await prisma.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        })

        res.json({
            roomId: room.id
        })
    } catch(e) {
        res.status(411).json({
            message: "Room already exists with this name"
        })
        return
    }
})

app.get("/chats/:roomId", async (req: Request, res: Response) => {
    try{
        const roomId = Number(req.params.roomId);
        const messages = await prismaClient.chat.findMany({
            where:{
                roomId: roomId
            },
            orderBy: {
                id: "desc"
            },
            take:50
        })
    
        res.json({
            messages
        })

    }catch(e) {
        console.log(e);
        res.json({
            messages:[]
        })
    }
})

app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
            slug
        }
    });

    res.json({
        room
    })
})



app.listen(port, () => {
    console.log(`http server is running on : http://localhost:${port}`)
})