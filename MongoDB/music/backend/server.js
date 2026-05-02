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
mongoose.connect("mongodb://127.0.0.1:27017/music")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));
//create schema and collection 
const songSchema =new mongoose.Schema({
    songname:String,
    film:String,
    music_director:String,
    singer:String,
    actor:String,
    actress:String
});
const Song=mongoose.model("songdetails",songSchema);
//inssert 5 osngs
app.get("/insert",async (req, res)=>{
     await Song.insertMany([
        
    { songname: "Kesariya", film: "Brahmastra", music_director: "Pritam", singer: "Arijit Singh" },
    { songname: "Tum Hi Ho", film: "Aashiqui 2", music_director: "Mithoon", singer: "Arijit Singh" },
    { songname: "Kal Ho Na Ho", film: "KHNH", music_director: "Shankar", singer: "Sonu Nigam" },
    { songname: "Channa Mereya", film: "ADHM", music_director: "Pritam", singer: "Arijit Singh" },
    { songname: "Raabta", film: "Agent Vinod", music_director: "Pritam", singer: "Arijit Singh" }
  ]);
    res.send("5 songs inserted");
});
//display count+al songs
app.get("/songs",async(req,res)=>{
    const songs=await Song.find();
    const count=await Song.countDocuments();
    res.send({total:count,data:songs});
});
//songs by music Director

app.get("/director/:name",async(req,res)=>{
    const songs=await songSchema.find({music_director:req.params.name});
    res.send(songs);
});
//Songs By Director +singer
app.get("/filter",async (req,res)=>{
    const{director,singer}=req.query;
    const songs=await Song.find({
        music_director:director,
        singer:singer
    });
    res.send(songs);
});
//delete song
app.get("/delete/:name",async(req,res)=>{
    await Song.deleteOne({songname:req.params.name});
    res.send("song deleted");
});
// add your fav song
app.get("/add", async (req, res) => {
  const { songname, film, director, singer } = req.query;

  const song = new Song({
    songname,
    film,
    music_director: director,
    singer
  });

  await song.save();

  res.send("Song added successfully");
});
// how to add uisng browser 
//http://localhost:3000/add?songname=Apna%20Bana%20Le&film=Bhediya&director=Sachin&singer=Arijit


//Songs by singer + film
app.get("/film-singer", async (req, res) => {
  const { film, singer } = req.query;

  const songs = await Song.find({
    film: film,
    singer: singer
  });

  res.send(songs);
});
//how to  use this in browser//

//http://localhost:3000/film-singer?film=Brahmastra&singer=Arijit Singh

// update the documnet by adding   actyor and actoress name
app.get("/update/:name", async (req, res) => {
  await Song.updateOne(
    { songname: req.params.name },   // find this song
    { actor: "Ranbir Kapoor", actress: "Alia Bhatt" } // add/update fields
  );

  res.send("Updated successfully");
});
//display in Table format
app.get("/table", async (req, res) => {
  const songs = await Song.find();

  let html = `
  <table border="1">
    <tr>
      <th>Song</th>
      <th>Film</th>
      <th>Director</th>
      <th>Singer</th>
      <th>Actor</th>
      <th>Actress</th>
    </tr>
  `;

  songs.forEach(s => {
    html += `
      <tr>
        <td>${s.songname}</td>
        <td>${s.film}</td>
        <td>${s.music_director}</td>
        <td>${s.singer}</td>
        <td>${s.actor || ""}</td>
        <td>${s.actress || ""}</td>
      </tr>
    `;
  });

  html += "</table>";

  res.send(html);
});
//stat sewrver
app.listen(5000, () => {
  console.log("Server running on port 5000");
});