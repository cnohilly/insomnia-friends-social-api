const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// virtuals will return undefined and not be included in the output data 
//      if the necessary field is excluded
UserSchema.virtual('thoughtCount').get(function () {
    return (this.thoughts) ? this.thoughts.length : undefined;
});

UserSchema.virtual('friendCount').get(function () {

    return (this.friends) ? this.friends.length : undefined;
});

const User = model('User', UserSchema);

module.exports = User;
