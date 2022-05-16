const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Readable } = require('stream');
const { ObjectId } = require('mongodb')
const moment = require('moment')
const fs = require('fs'); 
const { log } = require('console');

router.post('/mydiary/create', async(req,res, next) => {
    const storage = multer.memoryStorage()
    const upload = multer({ storage: storage, limits: { fileSize: 6000000 }});
    
    upload.single('file')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: "Upload Request Validation Failed" });
        } else if(!req.body.name) {
            return res.status(400).json({ message: "No track name in request body" });
        }

        console.log(req.body);
        console.log(req.file)

        const readStream = Readable.from(req.file.buffer);
        // const readStream = fs.createReadStream(req.body.name)

        const options = ({ title: req.body.title, date: req.body.date, filename: req.body.name, contenttype: 'audio/wav'});
        req.app.locals.Attachment.write(options, readStream, (err, file) => {
            if (err)
                return res.status(400).json({message: "Bad Request"});
            else {
                console.log("Posted! \n" + file.toString());
                return res.status(200).json({
                    message: "Successfully Saved!",
                    file: file,
                    options: options,
            });
            } 
        })
    });
})

router.get('/mydiary/recordings', async (req,res, next) => {

    // res.set('content-type', 'audio/wav');
    // res.set('accept-ranges', 'bytes');
    
 req.app.locals.Attachment.find()
 .then((allRecordings) => res.json(allRecordings))
 .catch((err)=> console.log(err))
})





router.get('/mydiary/:id', async (req,res, next) => {
    if(!req.params.id) {
        return res.status(400).json({
            message: "Invalid trackID in URL parameter."
        });
    }
    res.set('content-type', 'audio/wav');
    res.set('accept-ranges', 'bytes');
    
    try {
        const reader = req.app.locals.Attachment.read({_id: ObjectId(req.params.id)});   
        reader.on('data', (chunk)=> {
            res.write(chunk);
        });
        reader.on('close', () => {
            console.log("All Sent!");
            res.end();
        });
    } catch(err) {
        console.log(err);
        res.status(404).json({
            message:"Cannot find files that have the ID!",
        });
    }
})

router.delete("/mydiary/:id", (req, res)=> {
    if(!req.params.id) {
        return res.status(400).json({
            message: "Invalid trackID in URL parameter."
        });
    }
    
    req.app.locals.Attachment.unlink({_id: ObjectId(req.params.id)}, (err, file)=> {
        if (err) {
            console.log("Failed to delete\n" + err);
            return res.status(400).json({
                message: "Wrong Request",
                error: err.message,
            });
        }
        
        console.log('Deleted\n' + file);
        return res.status(200).json({
            message: "Successfully Deleted",
            file: file,
        });
    });   
});


module.exports = router;
