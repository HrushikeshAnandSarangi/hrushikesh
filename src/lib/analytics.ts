import { connectDB } from "./db";
import { Analytics, Project } from "./models";

export const incrementPageView = async (path: string) => {
  "use server";
  try {
    await connectDB();
    await Analytics.findOneAndUpdate(
      { path },
      { $inc: { views: 1 } },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error(`Failed to increment page view for ${path}:`, error);
  }
};

export const incrementProjectView = async (projectId: string) => {
  "use server";
  try {
    await connectDB();
    await Project.findByIdAndUpdate(
      projectId,
      { $inc: { views: 1 } }
    );
  } catch (error) {
    console.error(`Failed to increment project view for ${projectId}:`, error);
  }
};
