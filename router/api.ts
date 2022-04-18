require("../config/database").connect();
import express from 'express';
const cors = require('cors');
const router = express.Router();
const Client = require('../model/crudmodel.ts');
router.use(cors());

router.get('/fetch', (req, res) => {

    Client.find().exec((err: any, doc: any) => {
        res.status(200).json(err ? err : doc);
    });

})

router.post('/insert', async (req, res) => {

    try {
        const { name, cnum } = req.body.postData;
        // console.log(name,cnum)
        if (name && cnum && typeof name === 'string') {
            let client = new Client();
            client.name = name;
            client.cnum = cnum;
            // client.cdate = Date.now();
            await client.save();
            res.status(201).json("Task created")
            // Client.find().exec((err: any, doc: any) => {
            //     res.status(200).json(err ? err : doc);
            // });
        }
        else
            res.status(200).send('Enter valid input for post');
    }
    catch (err) {
        res.send(err);
    }
});

router.put('/update', (req, res) => {

    try {
        const { name, cnum,id } = req.body.putData;
        // console.log(req.body);
        if (name && cnum && typeof name === 'string') {
            Client.findOneAndUpdate({ _id: id },
                { $set: { name: name, cnum: cnum } },
                { new: true }, (err: any, doc: any) => {
                    if (err) res.status(404).send(err);
                    // Client.find().exec((err: any, doc: any) => {
                    //     res.status(200).json(err ? err : doc);
                    // });
                    res.status(200).json('Task updated..');
                });
        }
        else
            res.status(200).send('Enter valid input for put');
    }
    catch (err) {
        res.send(err);
    }
})

router.delete('/delete', (req, res) => {
    // console.log(req.body, req.params);
    try {
        const id = req.body.id;
        // console.log(id,req.body.id);
        Client.findOneAndDelete({ _id: id },
            (err: any, doc: any) => {
                if (err) res.status(404).send(err);
                res.status(200).json('Task Deleted')
                // Client.find().exec((err: any, doc: any) => {
                //     res.status(200).json(err ? err : doc);
                // });
            });
    }
    catch (err) {
        res.send(err);
    }
});

module.exports = router;