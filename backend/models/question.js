const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;

const QuestionSchema = new Schema( {
    content: {
        type: String,
        maxLength: 1024,
        required: true,
        trim: true
    },
    options: {
        type: [],
        
    },
    duration: {
        type: Int32Array,
        required: true
    },
    marks: {
        type: Float32Array,
        default: 0.0
    },
    answers: {
        type: [],
    }
},
{
    timestamps: true
});