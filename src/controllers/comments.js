import * as CommService from '../services/comments.js';

export const getAll = async (req, res) => {
    const comments = await CommService.getAll();

    res.send(comments);
};

export const getOne = async (req, res) => {
    const { id } = req.params;
    const foundComm = await CommService.getById(id);

    if (!foundComm) { 
        res.sendStatus(404);
        return;
    }

    res.send(foundComm);
};

export const add = async (req, res) => {
    const { user_name, email, home_page, text, parent_id, file } = req.body;

    if (!text || !user_name || !email) {
        res.sendStatus(422);
        return;
    }

    const newComm = await CommService.create(user_name, email, home_page, text, parent_id, file);

    res.sendStatus = 201;
    res.send(newComm);
};