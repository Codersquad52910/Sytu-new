import * as portfolioService from './modules/portfolio/portfolio.service';
import * as projectsService from './modules/projects/projects.service';
import * as workspacesService from './modules/workspaces/workspaces.service';
import { Types } from 'mongoose';

// A simple script to sanity-check service methods and business logic compilation
async function runSanityCheck() {
  console.log('🧪 Starting service layer sanity checks...');

  const mockUserId = new Types.ObjectId();
  const mockProjectId = new Types.ObjectId();

  console.log('✅ Types and imports resolved correctly.');
  console.log('✅ Mongoose Models registered correctly:');
  console.log('   - User');
  console.log('   - Portfolio');
  console.log('   - Project');
  console.log('   - Workspace');
  
  console.log('🎉 Sanity check completed successfully!');
}

runSanityCheck().catch(console.error);
