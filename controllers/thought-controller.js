const { Thought } = require('../models');

const thoughtController = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const dbThoughtData = await Thought.find({})
                .select('-__v')
                .sort({ _id: -1 });
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // get thought by id
    async getThoughtById({ params }, res) {
        try {
            const dbThoughtData = await Thought.find({ _id: params.id })
                .select('-__v')
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // create thought

    // update a thought by id

    // delete a thought by id

    // create reaction to thought

    // delete reaction to thought by id
}

module.exports = thoughtController;