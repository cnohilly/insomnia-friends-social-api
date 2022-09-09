const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        createdBy: {
            type: String,
            required: true,
            trim: true
        },
        reactionBody: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
)

const ThoughtSchema = new Schema(
    {
        createdBy: {
            type: String,
            required: true,
            trim: true
        },
        thoughtBody: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// virtual will return undefined and be excluded from output data if the
//      necessary field is not selected to avoid errors
ThoughtSchema.virtual('reactionCount').get(function () {
    return (this.reactions) ? this.reactions.length : undefined;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;