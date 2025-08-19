const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const LogEntrySchema = new Schema({
    action: { type: String, required: true },          // e.g. 'created', 'login', 'password-change'
    message: { type: String, default: '' },
    ip: { type: String },
    meta: { type: Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now }
}, { _id: false });

const AdminSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' },
    isSuper: { type: Boolean, default: false },
    logs: { type: [LogEntrySchema], default: [] }
}, { timestamps: true });

// hide sensitive fields when converting to JSON
AdminSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

// hash password before save
AdminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

AdminSchema.methods.comparePassword = async function (candidate) {
    return bcrypt.compare(candidate, this.password);
};

// static helper to create a superuser; uses provided params or environment vars
AdminSchema.statics.createSuperuser = async function ({ username, email, password } = {}) {
    username = username || process.env.SUPERUSER_USERNAME;
    email = email || process.env.SUPERUSER_EMAIL;
    password = password || process.env.SUPERUSER_PASSWORD;

    if (!username || !email || !password) {
        throw new Error('Missing superuser credentials (username, email, password)');
    }

    // if already exists (by username or email), return existing
    const existing = await this.findOne({ $or: [{ username }, { email }] });
    if (existing) return existing;

    const admin = new this({
        username,
        email,
        password,
        role: 'admin',
        isSuper: true,
        logs: [{ action: 'created', message: 'Superuser created' }]
    });

    await admin.save();
    return admin;
};

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;