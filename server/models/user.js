import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    trim: true,
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  subscribedSubs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subreddit',
    },
  ],
});

export default mongoose.model("User", userSchema);