const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;

const QuizSchema = new Schema({
    name: {
        type: String,
        maxLength: 128,
        trim: true,
        required: true
    },
    description: {
        type: String,
        maxLength: 1024
    },
    startDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: TimeRanges,
        required: true
    },
    organizedBy: {
        type: String,
        trim: true,
        required: true,
    },
    durationForEachQuestion: {
        type: Int32Array
    },
    questions: {
        type: [],
        required: true,
        default: []
    },
    result: {
        
    },
    totalMarks: {
        type: Float32Array,
        default: 0.0
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model("Quiz", QuizSchema);