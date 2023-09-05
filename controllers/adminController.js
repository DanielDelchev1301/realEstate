import express from 'express';
import multer from 'multer';
import { adaptProperty } from '../services/propertyHelperFunctions.js';
import { createProperty } from '../services/propertyService.js';
import sendmail from 'sendmail';
const useSendmail = sendmail();
const router = express.Router();

const upload = multer({dest: 'uploads/'});

router.post('/create', upload.array('images'), async (req, res) => {
    try {
        const propertyInfo = adaptProperty(req.body, req.files);
        const property = await createProperty(propertyInfo);
        res.status(200).json(property);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error.message});
    } 
});

router.post('/sendMail', async(req, res) => {
    try {
        const {name, email, message} = req.body;
        
        useSendmail({
            from: email,
            to: 'ddelchev@astea.net',
            subject: name,
            text: message,
        }, (err, reply) => {
            console.log(`ERROR: ${err && err.stack}`);
            console.dir(`REPLY: ${reply}`);
        });
        res.status(200).json({message: 'Mail sent successfully'});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error.message});
    }
});

export const adminController = router;