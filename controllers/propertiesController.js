import express from 'express';
import { deleteProperty, editProperty, getAllProperties, getPropertiesById, getPropertyById } from '../services/propertyService.js';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const properties = await getAllProperties();
        res.status(200).json(properties);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error.message});
    }
});

router.get('/details/one/:id', async (req, res) => {
    try {
        const property = await getPropertyById(req.params.id);
        res.status(200).json(property);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error.message});
    }
});

router.get('/details/many/:ids', async (req, res) => {
    try {
        const ids = req.params.ids.split(',');
        const properties = await getPropertiesById(ids);
        res.status(200).json(properties);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error.message});
    }
});

router.put('/edit', async (req, res) => {
    try {
        const property = await editProperty(req.body);
        res.status(200).json(property);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error.message});
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const property = await deleteProperty(req.params.id);
        res.status(200).json(property);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error.message});
    }
});

export const propertiesController = router;