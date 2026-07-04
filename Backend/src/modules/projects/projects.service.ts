import { Project, IProject } from '../../models/Project';
import { Types } from 'mongoose';
import { AppError } from '../../middleware/errorHandler';
import { getUploadPresignedUrl } from '../../config/s3';

export async function createProject(userId: Types.ObjectId, projectData: Partial<IProject>): Promise<IProject> {
  const newProject = await Project.create({
    ...projectData,
    userId,
    screenshotUrls: [],
    isFeatured: false,
  });
  return newProject;
}

export async function getProjectById(projectId: Types.ObjectId): Promise<IProject> {
  const project = await Project.findById(projectId).populate('userId', 'username name profileImageUrl');
  if (!project) {
    throw new AppError('Project not found.', 404, 'PROJECT_NOT_FOUND');
  }
  return project;
}

export interface ListProjectsFilter {
  category?: string;
  tech?: string;
  userId?: string;
  page?: number;
  limit?: number;
}

export async function listProjects(filters: ListProjectsFilter): Promise<{ projects: IProject[]; total: number; page: number; pages: number }> {
  const query: any = {};
  
  if (filters.category) {
    query.category = filters.category;
  }
  
  if (filters.tech) {
    // Search within the techStack array (case-insensitive or exact)
    query.techStack = { $in: [filters.tech] };
  }
  
  if (filters.userId) {
    query.userId = new Types.ObjectId(filters.userId);
  }

  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const skip = (page - 1) * limit;

  const total = await Project.countDocuments(query);
  const projects = await Project.find(query)
    .populate('userId', 'username name profileImageUrl')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    projects,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
}

export async function updateProject(
  projectId: Types.ObjectId,
  userId: Types.ObjectId,
  updateData: Partial<IProject>
): Promise<IProject> {
  const project = await getProjectById(projectId);
  
  if (project.userId._id.toString() !== userId.toString()) {
    throw new AppError('You do not own this project.', 403, 'FORBIDDEN');
  }

  // Update fields
  if (updateData.title !== undefined) project.title = updateData.title;
  if (updateData.description !== undefined) project.description = updateData.description;
  if (updateData.category !== undefined) project.category = updateData.category;
  if (updateData.techStack !== undefined) project.techStack = updateData.techStack;
  if (updateData.githubUrl !== undefined) project.githubUrl = updateData.githubUrl;
  if (updateData.demoUrl !== undefined) project.demoUrl = updateData.demoUrl;
  if (updateData.teamSize !== undefined) project.teamSize = updateData.teamSize;
  if (updateData.status !== undefined) project.status = updateData.status;

  await project.save();
  return project;
}

export async function deleteProject(projectId: Types.ObjectId, userId: Types.ObjectId): Promise<void> {
  const project = await getProjectById(projectId);
  
  if (project.userId._id.toString() !== userId.toString()) {
    throw new AppError('You do not own this project.', 403, 'FORBIDDEN');
  }

  // Wait! Under actual deployment we would also delete the files from S3 using AWS SDK.
  // Here, we just delete the Project document from MongoDB
  await Project.deleteOne({ _id: projectId });
}

export async function toggleFeaturedStatus(projectId: Types.ObjectId, userId: Types.ObjectId): Promise<IProject> {
  const project = await getProjectById(projectId);
  
  if (project.userId._id.toString() !== userId.toString()) {
    throw new AppError('You do not own this project.', 403, 'FORBIDDEN');
  }

  project.isFeatured = !project.isFeatured;
  await project.save();
  return project;
}

export async function getScreenshotsUploadUrls(
  projectId: Types.ObjectId,
  userId: Types.ObjectId,
  screenshots: Array<{ filename: string; contentType: string }>
): Promise<Array<{ filename: string; presignedUrl: string; fileKey: string }>> {
  const project = await getProjectById(projectId);
  
  if (project.userId._id.toString() !== userId.toString()) {
    throw new AppError('You do not own this project.', 403, 'FORBIDDEN');
  }

  const result = [];
  const timestamp = Date.now();

  for (const file of screenshots) {
    const sanitizedFilename = file.filename.replace(/\s+/g, '-');
    const fileKey = `projects/${projectId}/${timestamp}-${sanitizedFilename}`;
    const presignedUrl = await getUploadPresignedUrl(fileKey, file.contentType);
    
    result.push({
      filename: file.filename,
      presignedUrl,
      fileKey,
    });

    // Save key in database (up to 5 keys total)
    if (project.screenshotUrls.length < 5) {
      project.screenshotUrls.push(fileKey);
    }
  }

  await project.save();
  return result;
}
