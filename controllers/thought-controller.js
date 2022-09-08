const { Thought } = require('../models');

const thoughtController = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            // finds all the thoughts and sorts 
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
            // finds the thought for the specific id
            const dbThoughtData = await Thought.find({ _id: params.id })
                .select('-__v')
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // create new thought
    async createThought({ body }, res) {
        try {
            // creates a new thought using the body and gets the id
            const { _id } = await Thought.create(body);

            const dbUserData = await User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            ).populate({
                path: 'thoughts',
                select: '-__v'
            }).populate({
                path: 'friends',
                select: '-__v'
            });

            if (!dbUserData) {
                // if the user did not exist, will find and delete the newly created comment
                await Thought.findOneAndDelete({ _id });
                res.status(404).json({ message: 'No User with this ID!' });
                return;
            }

            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // update a thought by id
    async updateThought({ params, body }, res) {
        try {
            // finds and updates the specified thought
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: params.id },
                body,
                { new: true, runValidators: true }
            );

            // if the thought did not exist
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No Thought with that ID!' });
                return;
            }

            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // delete a thought by id
    async deleteThought({ params }, res) {
        try {
            // attempts to delete the thought for the specific id
            const dbThoughtData = await Thought.findOneAndDelete({ _id: params.thoughtId });

            // if the thought did not exist
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No Thought with that ID!' });
                return;
            }

            // attempts to remove the thought from the user's array of thoughts
            const dbUserData = await User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            ).populate({
                path: 'thoughts',
                select: '-__v'
            }).populate({
                path: 'friends',
                select: '-__v'
            });

            // if the user did not exist
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this ID!' });
                return;
            }

            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // create reaction to thought
    async createReaction({ params, body }, res) {
        try {
            // attempts to add a new reaction to the thought 
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: body } },
                { new: true, runValidators: true }
            );

            // if the thought did not exist
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No Thought with this ID!' });
                return;
            }

            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // delete reaction to thought by id
    async deleteReaction({ params }, res) {
        try {
            // attempts to pull the specified reaction from the reactions array
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: params.replyId } },
                { new: true }
            );

            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }
}

module.exports = thoughtController;