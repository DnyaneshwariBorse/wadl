const express=require("express");
const mongoose=require("mongoose");
const path=require("path");
const app=express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

// Serve index.html explicitly
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});
mongoose.connect("mongodb://127.0.0.1:27017/student")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));
//creating schema
const studentSchema=new mongoose.Schema({
    Name:String,
    Roll_No:Number,
    WAD_Marks:Number,
    CC_Marks:Number,
    DSBDA_Marks:Number,
    CNS_Marks:Number,
    AI_Marks:Number
});
// connects schema to collection studnetMARKS
const Student=mongoose.model("studentmarks",studentSchema);
// insert data
app.get("/insert",async(req,res)=>{
    try{
        const data=[
            {
                Name:"ABC",
                Roll_No:111,
                WAD_Marks:25,
                CC_Marks:25,
                DSBDA_Marks:25,
                CNS_Marks:25,
                AI_Marks:25
            },
              {
                Name:"XYZ",
                Roll_No:112,
                WAD_Marks:35,
                CC_Marks:20,
                DSBDA_Marks:28,
                CNS_Marks:22,
                AI_Marks:27
            }
        ];
        await Student.insertMany(data);
        res.send("data Inserted");
    }
    catch(err){
        res.send("Error");
    }
});

//quewtion d  display total count of  dopumnets and lsit all documnets in the browser
app.get("/students",async(req,res)=>{
     const students=await Student.find();
     const count=await Student.countDocuments();
     res.send({
        total_students:count,
        data:students
     });
});
//e 
app.get("/dsbda",async(req,res)=>{
    try{
        const students=await Student.find(
            {DSBDA_Marks:{$gt:20}},
            {
            
                Name:1,_id:0}
            );
            res.send(students);

            }catch(err){
                res.send("Error");
            }
        
    
});
// f update specified students marks
app.get("/update/:name",async (req,res)=>{
     try{
         await Student.updateOne(
             {
                Name:req.params.name},{
                    $inc:{DSBDA_Marks:10}}
                
             
         );
         res.send("Marks Updated");

     }catch(err){
        res.send("error");
     }
});
//(g) Students having >25 in ALL subjects
app.get("/all25",async(req,res)=>{
     try{
        const data=await Student.find({
            WAD_Marks:{$gt:25},
             CC_Marks:{$gt:25},
                DSBDA_Marks:{$gt:25},
                CNS_Marks:{$gt:25},
                AI_Marks:{$gt:25}
        });
        res.send(data);
     }catch(err){
        res.send("error");
     }
});
// (h) Students with marks <40 in Maths & Science

// 👉 Assume:

// Maths = WAD
// Science = CNS
app.get("/less40", async (req, res) => {
    try {
        const data = await Student.find({
            WAD_Marks: { $lt: 40 },
            CNS_Marks: { $lt: 40 }
        });

        res.send(data);
    } catch (err) {
        res.send("Error");
    }
});
// (i) Remove specified student
// ✅ Code
app.get("/delete/:name", async (req, res) => {
    try {
        await Student.deleteOne({ Name: req.params.name });
        res.send("Student Deleted");
    } catch (err) {
        res.send("Error");
    }
});
app.get("/table", async (req, res) => {
    const students = await Student.find();

    let html = `<table border="1">
    <tr>
    <th>Name</th><th>Roll</th><th>WAD</th>
    <th>DSBDA</th><th>CNS</th><th>CC</th><th>AI</th>
    </tr>`;

    students.forEach(s => {
        html += `<tr>
        <td>${s.Name}</td>
        <td>${s.Roll_No}</td>
        <td>${s.WAD_Marks}</td>
        <td>${s.DSBDA_Marks}</td>
        <td>${s.CNS_Marks}</td>
        <td>${s.CC_Marks}</td>
        <td>${s.AI_Marks}</td>
        </tr>`;
    });

    html += "</table>";
    res.send(html);
});
app.listen(6000,()=>{
     console.log("Server running on port 6000");

});

