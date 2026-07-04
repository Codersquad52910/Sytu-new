import { Schema, model, Document } from 'mongoose';

export interface ISkill {
  name: string;
  proficiency: 'beginner' | 'intermediate' | 'expert';
}

export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash?: string;
  name?: string;
  bio?: string;
  profileImageUrl?: string;
  headline?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  skills: ISkill[];
  interests: string[];
  isPremium: boolean;
  isEmailVerified: boolean;
  isSuspended: boolean;
  role: 'user' | 'admin';
  lastSeen: Date;
  githubId?: string;
  githubUsername?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>({
  name: { type: String, required: true, lowercase: true },
  proficiency: { type: String, enum: ['beginner', 'intermediate', 'expert'], required: true },
}, { _id: false });

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  passwordHash: { type: String },
  name: { type: String },
  bio: { type: String, maxlength: 300 },
  profileImageUrl: { type: String },
  headline: { type: String },
  linkedinUrl: { type: String },
  websiteUrl: { type: String },
  skills: { type: [SkillSchema], default: [] },
  interests: { type: [String], default: [] },
  isPremium: { type: Boolean, default: false },
  isEmailVerified: { type: Boolean, default: false },
  isSuspended: { type: Boolean, default: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  lastSeen: { type: Date, default: Date.now },
  githubId: { type: String, unique: true, sparse: true },
  githubUsername: { type: String },
}, {
  timestamps: true
});

// Indexes from System Design page 7
UserSchema.index({ 'skills.name': 1 });
UserSchema.index({ interests: 1 });

export const User = model<IUser>('User', UserSchema);
export default User;
