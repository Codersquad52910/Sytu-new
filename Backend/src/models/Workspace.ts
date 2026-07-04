import { Schema, model, Document, Types } from 'mongoose';

export interface IWorkspace extends Document {
  userId: Types.ObjectId;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  projects: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const WorkspaceSchema = new Schema<IWorkspace>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String },
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
}, {
  timestamps: true
});

export const Workspace = model<IWorkspace>('Workspace', WorkspaceSchema);
export default Workspace;
