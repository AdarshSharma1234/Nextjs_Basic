import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Create a connection function with proper error handling
async function connectToDatabase() {
    try {
        // Establish the MongoDB connection using the URI from the environment variable
        await mongoose.connect('mongodb://127.0.0.1:27017/next-js-registration-login-example', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with failure
    }
}

// Call the function to connect to MongoDB
connectToDatabase();

// Set mongoose Promise to global Promise
mongoose.Promise = global.Promise;

export const db = {
    User: userModel()
};

// mongoose models with schema definitions
function userModel() {
    const schema = new Schema({
        username: { type: String, unique: true, required: true },
        hash: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    }, {
        timestamps: true, // automatically manage createdAt and updatedAt
        versionKey: false
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id; // remove _id from the returned object
            delete ret.hash; // remove hash from the returned object
        }
    });

    return mongoose.models.User || mongoose.model('User', schema);
}
