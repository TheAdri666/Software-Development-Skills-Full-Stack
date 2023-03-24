import mongoose from 'mongoose';

const { Schema } = mongoose;

// Users have: a unique email address, a password, a profile picture, an admin status and code snippets they have posted.
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: 'default-profile-picture.png',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  codeSnippets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CodeSnippet'
    }
  ]
});

const User = mongoose.model('User', userSchema);

export default User;
