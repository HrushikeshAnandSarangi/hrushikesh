import { connectDB } from "./src/lib/db.ts";
import { User, Project, Post } from "./src/lib/models.ts";

async function verify() {
  console.log("Starting DB Verification...");
  // Load Env from .env just string replace in code for test if needed, but vinxi load it.
  import("dotenv/config");
  
  await connectDB();
  
  const users = await User.find();
  console.log("Users in DB:", users);
  
  const projects = await Project.find();
  console.log("Projects in DB:", projects.length);
  
  const posts = await Post.find();
  console.log("Posts in DB:", posts.length);
  
  console.log("Verification checks complete. Exiting...");
  process.exit(0);
}

verify().catch(console.error);
