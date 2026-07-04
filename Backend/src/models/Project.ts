import { Schema, model, Document, Types } from 'mongoose';

export interface IProject extends Document {
  userId: Types.ObjectId;
  title: string;
  description: string;
  category: 'Web' | 'Mobile' | 'ML' | 'Design' | 'Other';
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  screenshotUrls: string[];
  teamSize: number;
  status: 'in_progress' | 'completed' | 'abandoned';
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Web', 'Mobile', 'ML', 'Design', 'Other'], 
    required: true,
    index: true 
  },
  techStack: { type: [String], default: [] },
  githubUrl: { type: String },
  demoUrl: { type: String },
  screenshotUrls: { 
    type: [String], 
    default: [], 
    validate: [
      (val: string[]) => val.length <= 5, 
      '{PATH} exceeds the limit of 5 screenshot URLs'
    ] 
  },
  teamSize: { type: Number, default: 1 },
  status: { 
    type: String, 
    enum: ['in_progress', 'completed', 'abandoned'], 
    default: 'in_progress' 
  },
  isFeatured: { type: Boolean, default: false },
}, {
  timestamps: true
});

ProjectSchema.index({ techStack: 1 });

export const Project = model<IProject>('Project', ProjectSchema);
export default Project;
