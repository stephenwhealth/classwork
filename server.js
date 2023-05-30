const express= require('express')
const mongoose= require('mongoose')
const PORT = 4090
const app = express()
app.use(express.json())


const contacts = new mongoose.Schema ( {
    data:{
    name:String,
    course:String,
    designation:String},
    score: {
    html: Number,
    css: Number,
    Javascript: Number,
    Node: Number},
})

const user = mongoose.model("contactbook", contacts)

app.get("/",(req,res) => {
    res.status(200).json("welcome to my contactbook")

})

// creating a data

app.post("/createinfo", async(req, res)=>{
    const newData = await new user (req.body);
    newData.save()

    res.status(200).json(newData)
})

// get all datas

app.get("/getallinfo", async(req, res) =>{
    const all = await user.find();

    res.status(200).json({
        message: "the available user are" + all.length, data:all
    })
})

// getting one data by id

app.get("/getone/:id", async(req, res) =>{
    const id = req.params.id
    const onecontact = await user.findById(id)
    // console.log(oneuser)

    res.status(200).json({
        message: `the information of user id: ${id}`, 
        data: onecontact
    })
})

// delete a contact

app.delete("/deletedata/:id", async(req, res) =>{
    const contact = req.params.id
    const deleteuser = await user.findByIdAndDelete(contact)
        
        res.status(200).json({
            message: `the deleted user is recongnised with id: ${contact}`,
            data: deleteuser
    })

})

// updating a contact info

app.put("/updatedata/:id", async(req, res)=>{
    const contact = req.params.id
    const update = await user.findByIdAndUpdate(contact, req.body);
    update.save()

    res.status(200).json({
        message: `the data taged with id: ${contact} has been updated`,
        data: update
    })
})


mongoose.connect("mongodb+srv://ujunwastephen8:rARbdqyyfOzwPgLo@cluster0.tdmydgt.mongodb.net/").then(()=>{
    console.log("connection is true")
});

app.listen(PORT, (req,res)=>{
    console.log(`app is listening to port: ${PORT}`)
})