import app from "./src";

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`)
})