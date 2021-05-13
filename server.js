const express = require ("express");
const path= require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// allows us to recieve data from post requ and retrieve data from body
// app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/index.html"));        
});

app.get("/notes",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/notes.html"));         
});

app.get("/api/notes",(req,res)=>{
    res.json(getData());            
});

app.post("/api/notes",(req,res)=>{
    const newNote=req.body;
    newNote.id=Date.now();
    const data=getData();
    data.push(newNote);
    saveData(data);
    res.send();    
});

app.delete("/api/notes/:id",(req,res)=>{
    const id=req.params.id;
    const data=getData();
    const index=data.findIndex(note => note.id===id);
    if (index>=0)data.splice(index,1);
    res.send();               
});

app.listen(3000, () =>console.log("Express listening on port 3000"));

function getData(){
    const text =fs.readFileSync("./db/db.json");
    return JSON.parse(text);
}

function saveData(data) {
    fs.writeFileSync("./db/db.json",JSON.stringify(data));    
}
