import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: false },
  techStack: { type: [String], default: [] },
  imageUrl: { type: String, required: false },
  github: { type: String, required: false },
  gitlab: { type: String, required: false },
  youtube: { type: String, required: false },
  tag: { type: String, required: false },
  extraProofOfWork: {
    type: [{ title: String, link: String }],
    default: [],
  },
  views: { type: Number, default: 0 },
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  topics: { type: [String], default: [] },
  date: { type: Date, default: Date.now },
});

const analyticsSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  views: { type: Number, default: 0 },
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
export const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
export const Analytics = mongoose.models.Analytics || mongoose.model('Analytics', analyticsSchema);
