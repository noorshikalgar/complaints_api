const { Complaint, Validate } = require('../models/complaint');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    Complaint.find()
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(err));

});

router.get('/:id', (req, res) => {

    if (req.params.id === null) return res.status(400).send(result.error.details[0].message);

    Complaint.findById({ _id: req.params.id })
        .then(result => res.status(200).send(result))
        .catch(err => res.status(404).send("Data not found."));

});

router.post('/', auth, (req, res) => {

    const result = Validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const complaint = new Complaint({
        complaint_title: req.body.title,
        complaint_body: req.body.body,
        user_id: req.user._id
    });

    complaint.save()
        .then(result => res.status(200).json(result))
        .catch(err => res.status(400).send(err));

});

router.put('/:id', auth, (req, res) => {

    if (req.params.id === null) return res.status(400).send(result.error.details[0].message);

    const result = Validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    Complaint.findOneAndUpdate(req.params.id, {
        complaint_title: req.body.title,
        complaint_body: req.body.body
    })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(400).json(err));
});

router.delete('/:id', auth, async (req, res) => {
    if (req.params.id === null) return res.status(400).send(result.error.details[0].message);

    try {
        const complaint = await Complaint.findOneAndRemove(req.params.id);
        res.status(200).send(complaint);
    } catch (ex) {
        res.status(400).send(ex.message);
    }

});

module.exports = router;