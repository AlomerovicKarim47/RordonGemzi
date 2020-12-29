//Ovo je testni file, sve ostale kontrolere napraviti u njihovim fileovima
const helloWorldController = async(req, res, next)=>{
    res.send("Hello world!")
}

export{
    helloWorldController
}