const mongoose = require('mongoose');
const { Schema } = mongoose;

// simple deep equality for validator (handles nested objects/arrays/primitives)
function deepEqual(a, b) {
    if (a === b) return true;
    if (a && b && typeof a === 'object' && typeof b === 'object') {
        if (Array.isArray(a) !== Array.isArray(b)) return false;
        if (Array.isArray(a)) {
            if (a.length !== b.length) return false;
            for (let i = 0; i < a.length; i++) {
                if (!deepEqual(a[i], b[i])) return false;
            }
            return true;
        } else {
            const aKeys = Object.keys(a);
            const bKeys = Object.keys(b);
            if (aKeys.length !== bKeys.length) return false;
            for (let k of aKeys) {
                if (!Object.prototype.hasOwnProperty.call(b, k) || !deepEqual(a[k], b[k])) return false;
            }
            return true;
        }
    }
    return false;
}

const questionSchema = new Schema(
    {
        exam_id: {
            type: Schema.Types.ObjectId,
            ref: 'Exam',
            required: true
        },
        // question type: numerical, single_choice, multiple_choice, match, true_false
        question_type: {
            type: String,
            enum: ['numerical', 'single_choice', 'multiple_choice', 'match', 'true_false'],
            required: true
        },
        // allow question content in any format (string, object, etc.)
        text: {
            type: Schema.Types.Mixed,
            required: true
        },
        // options can be any format; for choice types expect an array, for match expect { left: [...], right: [...] }, for true_false default is [true,false]
        options: {
            type: Schema.Types.Mixed,
            required: function () {
                return ['single_choice', 'multiple_choice', 'match', 'true_false'].includes(this.question_type);
            },
            default: function () {
                return this.question_type === 'true_false' ? [true, false] : undefined;
            },
            validate: {
                validator: function (v) {
                    const t = this.question_type;
                    if (t === 'numerical') {
                        // numerical questions don't require options
                        return true;
                    }
                    if (t === 'match') {
                        // expect an object with left and right arrays
                        return v && typeof v === 'object' && Array.isArray(v.left) && Array.isArray(v.right) && v.left.length >= 1 && v.right.length >= 1;
                    }
                    // for single/multiple/true_false expect an array with at least two entries
                    return Array.isArray(v) && v.length >= 2;
                },
                message: props => `Invalid options for question_type "${props && props.instance ? props.instance.question_type : 'unknown'}".`
            }
        },
        // correct_answer shape depends on question_type:
        // numerical: number or { value: number, tolerance?: number }
        // single_choice: one option (deep-equals an element of options)
        // multiple_choice: array of options (each deep-equals an element of options)
        // match: array of pairs [{ left: <value>, right: <value> }, ...] matching left/right lists in options
        // true_false: boolean or one of the options
        correct_answer: {
            type: Schema.Types.Mixed,
            required: true,
            validate: {
                validator: function (v) {
                    const t = this.question_type;
                    if (t === 'numerical') {
                        if (typeof v === 'number') return true;
                        if (v && typeof v === 'object' && typeof v.value === 'number') {
                            return v.tolerance === undefined || typeof v.tolerance === 'number';
                        }
                        return false;
                    }
                    if (t === 'single_choice') {
                        return Array.isArray(this.options) && this.options.some(opt => deepEqual(opt, v));
                    }
                    if (t === 'multiple_choice') {
                        return Array.isArray(v) && Array.isArray(this.options) && v.length >= 1 && v.every(ans => this.options.some(opt => deepEqual(opt, ans)));
                    }
                    if (t === 'true_false') {
                        if (typeof v === 'boolean') return true;
                        return Array.isArray(this.options) && this.options.some(opt => deepEqual(opt, v));
                    }
                    if (t === 'match') {
                        // options expected as { left: [...], right: [...] }
                        if (!Array.isArray(v)) return false;
                        if (!this.options || typeof this.options !== 'object') return false;
                        const left = this.options.left || [];
                        const right = this.options.right || [];
                        // expect same length as left (or right) and each entry has left and right referencing existing items (by value or index)
                        if (v.length !== left.length) return false;
                        return v.every(pair => {
                            if (!pair || typeof pair !== 'object') return false;
                            if (!('left' in pair) || !('right' in pair)) return false;
                            const leftValid = left.includes(pair.left) || (Number.isInteger(pair.left) && left[pair.left] !== undefined);
                            const rightValid = right.includes(pair.right) || (Number.isInteger(pair.right) && right[pair.right] !== undefined);
                            return leftValid && rightValid;
                        });
                    }
                    // fallback: require deep-equal to one of options if options is array
                    return Array.isArray(this.options) && this.options.some(opt => deepEqual(opt, v));
                },
                message: 'correct_answer is not valid for the specified question_type/options.'
            }
        },
        marks: {
            type: Number,
            required: true,
            min: [0, 'Marks must be a non-negative integer.'],
            validate: {
                validator: Number.isInteger,
                message: 'Marks must be an integer.'
            }
        },
        explanation: {
            type: Schema.Types.Mixed,
            default: ''
        }
    },
    {
        timestamps: true
    }
);

questionSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model('Question', questionSchema);