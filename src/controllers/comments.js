import * as CommService from '../services/comments.js';

export const getAll = async (req, res) => {
    const comments = await CommService.getAll();

    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });

    res.send(comments);
};

export const getOne = async (req, res) => {
    const { id } = req.params;
    const foundComm = await CommService.getById(id);

    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });

    if (!foundComm) { 
        res.sendStatus(404);
        return;
    }

    res.send(foundComm);
};

export const add = async (req, res) => {
    const { user_name, email, home_page, text, parent_id, file } = req.body;

    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });

    if (!text || !user_name || !email) {
        res.sendStatus(422);
        return;
    }

    const newComm = await CommService.create(user_name, email, home_page, text, parent_id, file);

    res.sendStatus = 201;
    res.send(newComm);
};