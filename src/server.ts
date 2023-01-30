import app from "./app"


const PORT =  Number(process.env.PORT) || 2000

app.listen(PORT,  ()=>console.log("server is running on port " + PORT))

