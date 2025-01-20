import express, { Request, Response } from "express"

const app = express();
const port = 3001;

app.get('/', (req: Request, res: Response) => {
    res.send("hello this is pratik");
})


app.listen(port, () => {
    console.log(`http server is running on : http://localhost:${port}`)
})