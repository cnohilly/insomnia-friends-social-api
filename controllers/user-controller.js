const { User } = require('../models');

const userController = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const dbUserData = await User.find({})
                // populates the thoughts
                .populate({
                    path: 'thoughts',
                    select: '-__v'
                })
                // populates the friends with only the username
                .populate({
                    path: 'friends',
                    select: 'username',

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
                // populates the thoughts
                .populate({
                    path: 'thoughts',
                    select: '-__v'
                })
                // populates the friends with only the username
                .populate({
                    path: 'friends',
                    select: 'username'
                })
                .select('-__v')
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // create a new user
    async createUser({ body }, res) {
        try {
            // attempts to create a new user using the data provided in the body
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
            // attempts to find the specified user and update their data
            const dbUserData = await User.findOneAndUpdate(
                { _id: params.id },
                body,
                { new: true, runValidators: true }
            );

            // if the user does not exist
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
            // attempts to delete the user for the specific id
            const dbUserData = await User.findOneAndDelete({ _id: params.id });

            // if the user did not exist
            if (!dbUserData) {
                res.status(404).json({ message: 'No User with this ID!' });
                return;
            }

            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // add a friend
    async addFriend({ params }, res) {
        try {
            // finds the user with the specified userId and attempts to add the friendId to their friends
            const dbUserData = await User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { friends: params.friendId } },
                { new: true }
                // populates the thoughts
            ).populate({
                path: 'thoughts',
                select: '-__v'
                // populates the friends with only the username
            }).populate({
                path: 'friends',
                select: 'username'
            });;

            // if the user did not exist
            if (!dbUserData) {
                res.status(404).json({ message: 'No User with this ID!' });
                return;
            }

            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // remove a friend
    async removeFriend({ params }, res) {
        try {
            // finds user with the specific userId and attempts to remove the friendId from their friends
            const dbUserData = await User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendId } },
                { new: true }
                // populates the thoughts
            ).populate({
                path: 'thoughts',
                select: '-__v'
                // populates the friends with only the username
            }).populate({
                path: 'friends',
                select: 'username'
            });

            // if the user did not exist
            if (!dbUserData) {
                res.status(404).json({ message: 'No user with this ID!' });
                return;
            }

            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }

}

module.exports = userController;