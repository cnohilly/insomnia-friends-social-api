const { User } = require('../models');

const userController = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const dbUserData = await User.find({})
                .populate({
                    path: 'thoughts',
                    select: '-__v'
                })
                .populate({
                    path: 'friends',
                    select: '-__v'
                })
                .select('-__v')
                .sort({ _id: -1 });
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }

    },

    // get one user by id
    async getUserById({ params }, res) {
        try {
            const dbUserData = await User.findOne({ _id: params.id })
                .populate({
                    path: 'thoughts',
                    select: '-__v'
                })
                .populate({
                    path: 'friends',
                    select: '-__v'
                })
                .select('-__v')
                .sort({ _id: -1 });
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // create a new user
    async createUser({ body }, res) {
        try {
            const dbUserData = await User.create(body);
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // update a user by id
    async updateUser({ params, body }, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: params.id },
                body,
                { new: true, runValidators: true }
            );

            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }

            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // delete a user by id
    async deleteUser({ params }, res) {
        try {
            const dbUserData = await User.findOneAndDelete({ _id: params.id });
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }
}

module.exports = userController;