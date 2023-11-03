const express= require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const port = 4700;
const videopath = 'video.mp4'
app.listen(port, function(err){
    if(err) throw err;else console.log(`listening on ${port}`);
});
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/video.html'));
   
})
app.get('/video', function(req, res){
    const range = req.headers.range 
    
    const videoSize = fs.statSync(videopath).size 
    const chunkSize = 1 * 1e6; 
    const start = Number(range.replace(/\D/g, "")) 
    const end = Math.min(start + chunkSize, videoSize - 1) 
    const contentLength = end - start + 1; 
    const headers = { 
        "Content-Range": `bytes ${start}-${end}/${videoSize}`, 
        "Accept-Ranges": "bytes", 
        "Content-Length": contentLength, 
        "Content-Type": "video/mp4"
    } 
    res.writeHead(206, headers) 
    const stream = fs.createReadStream(videopath, { 
        start, 
        end 
    }) 
    stream.pipe(res) })