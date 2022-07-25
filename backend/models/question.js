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
    image: {
        data: Buffer,
        contentType: String
    },
    options: [String],
    optionImages: [{
        data: Buffer,
        contentType: String
    }],
    duration: {
        type: Number,
        required: true
    },
    marks: {
        type: Number,
        default: 0.0
    },
    answers: {
        type: [],
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Question", QuestionSchema);