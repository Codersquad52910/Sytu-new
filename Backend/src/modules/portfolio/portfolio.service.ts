import { Portfolio, IPortfolio } from '../../models/Portfolio';
import { User } from '../../models/User';
import { AppError } from '../../middleware/errorHandler';
import { Types } from 'mongoose';

export async function getPortfolioByUserId(userId: Types.ObjectId): Promise<IPortfolio> {
  let portfolio = await Portfolio.findOne({ userId });
  if (!portfolio) {
    // Proactively initialize a blank portfolio for the user
    portfolio = await Portfolio.create({
      userId,
      experience: [],
      education: [],
      achievements: [],
      certifications: [],
      theme: 'default',
      isPublished: false,
      viewCount: 0,
    });
  }
  return portfolio;
}

export async function getPublicPortfolioByUsername(username: string): Promise<IPortfolio> {
  const user = await User.findOne({ username: username.toLowerCase() });
  if (!user) {
    throw new AppError('User profile not found.', 404, 'USER_NOT_FOUND');
  }

  const portfolio = await Portfolio.findOne({ userId: user._id });
  if (!portfolio || !portfolio.isPublished) {
    throw new AppError('Portfolio is not published or does not exist.', 404, 'PORTFOLIO_NOT_PUBLISHED');
  }

  // Increment view count asynchronously/inline
  portfolio.viewCount += 1;
  await portfolio.save();

  return portfolio;
}

export async function updatePortfolio(userId: Types.ObjectId, updateData: Partial<IPortfolio>): Promise<IPortfolio> {
  const portfolio = await getPortfolioByUserId(userId);
  
  // Update fields
  if (updateData.about !== undefined) portfolio.about = updateData.about;
  if (updateData.headline !== undefined) portfolio.headline = updateData.headline;
  if (updateData.experience !== undefined) portfolio.experience = updateData.experience;
  if (updateData.education !== undefined) portfolio.education = updateData.education;
  if (updateData.achievements !== undefined) portfolio.achievements = updateData.achievements;
  if (updateData.certifications !== undefined) portfolio.certifications = updateData.certifications;
  if (updateData.theme !== undefined) portfolio.theme = updateData.theme;

  await portfolio.save();
  return portfolio;
}

export async function setPublishStatus(userId: Types.ObjectId, isPublished: boolean): Promise<IPortfolio> {
  const portfolio = await getPortfolioByUserId(userId);
  portfolio.isPublished = isPublished;
  await portfolio.save();
  return portfolio;
}

export async function getPortfolioAnalytics(userId: Types.ObjectId): Promise<any> {
  const portfolio = await getPortfolioByUserId(userId);
  
  // Return mocked analytical distribution along with real viewCount
  return {
    viewCount: portfolio.viewCount,
    viewsOverTime: [
      { date: 'Monday', count: Math.floor(portfolio.viewCount * 0.15) },
      { date: 'Tuesday', count: Math.floor(portfolio.viewCount * 0.20) },
      { date: 'Wednesday', count: Math.floor(portfolio.viewCount * 0.10) },
      { date: 'Thursday', count: Math.floor(portfolio.viewCount * 0.25) },
      { date: 'Friday', count: Math.floor(portfolio.viewCount * 0.30) },
    ],
    topReferrers: [
      { source: 'GitHub', percentage: 45 },
      { source: 'LinkedIn', percentage: 35 },
      { source: 'Direct', percentage: 20 },
    ],
    approximateGeography: [
      { country: 'India', percentage: 70 },
      { country: 'United States', percentage: 15 },
      { country: 'Germany', percentage: 5 },
      { country: 'Other', percentage: 10 },
    ]
  };
}
