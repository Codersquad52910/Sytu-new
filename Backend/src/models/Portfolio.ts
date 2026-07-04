import { Schema, model, Document, Types } from 'mongoose';

export interface IExperience {
  company: string;
  role: string;
  from: Date;
  to: Date | null; // null represents current job
  description?: string;
}

export interface IEducation {
  institution: string;
  degree: string;
  from: Date;
  to?: Date;
}

export interface IAchievement {
  title: string;
  description?: string;
  date: Date;
}

export interface ICertification {
  name: string;
  issuer: string;
  url?: string;
  date: Date;
}

export interface IPortfolio extends Document {
  userId: Types.ObjectId;
  about?: string;
  headline?: string;
  experience: IExperience[];
  education: IEducation[];
  achievements: IAchievement[];
  certifications: ICertification[];
  theme: 'default' | 'minimal' | 'dark';
  isPublished: boolean;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema<IExperience>({
  company: { type: String, required: true },
  role: { type: String, required: true },
  from: { type: Date, required: true },
  to: { type: Date, default: null },
  description: { type: String },
}, { _id: false });

const EducationSchema = new Schema<IEducation>({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  from: { type: Date, required: true },
  to: { type: Date },
}, { _id: false });

const AchievementSchema = new Schema<IAchievement>({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
}, { _id: false });

const CertificationSchema = new Schema<ICertification>({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  url: { type: String },
  date: { type: Date, required: true },
}, { _id: false });

const PortfolioSchema = new Schema<IPortfolio>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
  about: { type: String },
  headline: { type: String },
  experience: { type: [ExperienceSchema], default: [] },
  education: { type: [EducationSchema], default: [] },
  achievements: { type: [AchievementSchema], default: [] },
  certifications: { type: [CertificationSchema], default: [] },
  theme: { type: String, enum: ['default', 'minimal', 'dark'], default: 'default' },
  isPublished: { type: Boolean, default: false },
  viewCount: { type: Number, default: 0 },
}, {
  timestamps: true
});

export const Portfolio = model<IPortfolio>('Portfolio', PortfolioSchema);
export default Portfolio;
