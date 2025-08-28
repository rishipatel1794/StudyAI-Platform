import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
// Auto-create a superuser on startup.
// Keeps logic simple: try immediately, otherwise wait for mongoose connection.
export const attemptCreate = () => {
    try {
        const AdminModel = (mongoose.models && mongoose.models.Admin)
            ? mongoose.models.Admin
            : (mongoose.modelNames && mongoose.modelNames().includes('Admin') ? mongoose.model('Admin') : null);

        if (AdminModel) {
            AdminModel.createSuperuser().catch(err => {
                // eslint-disable-next-line no-console
                console.error('createSuperuser failed:', err);
            });
            return;
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error checking Admin model:', err);
        return;
    }

    mongoose.connection.once('open', () => {
        try {
            const AdminModel = mongoose.model('Admin');
            AdminModel.createSuperuser().catch(err => {
                // eslint-disable-next-line no-console
                console.error('createSuperuser failed (on open):', err);
            });
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Error during superuser creation (on open):', err);
        }
    });
};

// Schedule without blocking module initialization.

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

export const Admin = mongoose.model('Admin', AdminSchema);
