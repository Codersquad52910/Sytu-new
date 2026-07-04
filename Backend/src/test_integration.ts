import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import RedisMock from 'ioredis-mock';
import supertest from 'supertest';
import { setRedisClient } from './config/redis';
import { signAccessToken } from './utils/jwt';
import { User } from './models/User';
import { Portfolio } from './models/Portfolio';
import { Project } from './models/Project';
import { Workspace } from './models/Workspace';

// Declare a main function to wrap our async test runner
async function runTests() {
  console.log('🚀 Starting SYTU Backend Integration Tests...\n');

  // 1. Start in-memory MongoDB
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  // Override environment variable before connecting
  process.env.MONGODB_URI = mongoUri;
  
  // 2. Mock Redis client
  const mockRedis = new RedisMock();
  setRedisClient(mockRedis as any);
  console.log('⚡ Mock Redis connected.');

  // Connect to the in-memory MongoDB
  await mongoose.connect(mongoUri);
  console.log('🔌 Mock MongoDB connected.');

  // 3. Import app after environment variables are set and database/redis are mocked
  const { app } = require('./app');
  const request = supertest(app);

  let authToken = '';
  let premiumToken = '';
  let userId = '';
  let premiumUserId = '';
  let projectId = '';
  let workspaceId = '';

  try {
    // --- SETUP: Create test users ---
    console.log('\n--- SETUP: Creating test users ---');
    const user = await User.create({
      username: 'testuser',
      email: 'test@sytu.com',
      role: 'user',
      isPremium: false,
    });
    userId = user._id.toString();
    authToken = `Bearer ${signAccessToken({ userId, role: 'user', isPremium: false, jti: 'test-jti-1' })}`;
    console.log(`Created standard user: ${user.username} (${userId})`);

    const premiumUser = await User.create({
      username: 'premiumuser',
      email: 'premium@sytu.com',
      role: 'user',
      isPremium: true,
    });
    premiumUserId = premiumUser._id.toString();
    premiumToken = `Bearer ${signAccessToken({ userId: premiumUserId, role: 'user', isPremium: true, jti: 'test-jti-2' })}`;
    console.log(`Created premium user: ${premiumUser.username} (${premiumUserId})`);

    // --- TEST CASE 1: Status endpoint ---
    console.log('\n--- TEST CASE 1: Status checks ---');
    const statusRes = await request.get('/');
    if (statusRes.status === 200 && statusRes.body.status === 'online') {
      console.log('✅ GET / is online.');
    } else {
      throw new Error(`GET / failed: ${JSON.stringify(statusRes.body)}`);
    }

    // --- TEST CASE 2: Portfolio own profile ---
    console.log('\n--- TEST CASE 2: Portfolio - retrieve own profile ---');
    const getPortRes = await request.get('/api/v1/portfolio/me/details').set('Authorization', authToken);
    if (getPortRes.status === 200 && getPortRes.body.success && getPortRes.body.data.userId === userId) {
      console.log('✅ GET /portfolio/me/details successfully initialized empty portfolio.');
    } else {
      throw new Error(`GET /portfolio/me/details failed: ${JSON.stringify(getPortRes.body)}`);
    }

    // --- TEST CASE 3: Portfolio update ---
    console.log('\n--- TEST CASE 3: Portfolio - partial update sections ---');
    const updatePortRes = await request
      .patch('/api/v1/portfolio/me')
      .set('Authorization', authToken)
      .send({
        about: 'I am a passionate software developer building scalable apps.',
        headline: 'Full-Stack Developer Extraordinaire',
        experience: [
          {
            company: 'Tech Corp',
            role: 'Software Engineer',
            from: new Date('2024-01-01').toISOString(),
            to: new Date('2025-01-01').toISOString(),
            description: 'Wrote microservices and endpoints.'
          }
        ],
        theme: 'dark'
      });
    
    if (
      updatePortRes.status === 200 &&
      updatePortRes.body.data.about === 'I am a passionate software developer building scalable apps.' &&
      updatePortRes.body.data.theme === 'dark'
    ) {
      console.log('✅ PATCH /portfolio/me successfully updated about & experience arrays.');
    } else {
      throw new Error(`PATCH /portfolio/me failed: ${JSON.stringify(updatePortRes.body)}`);
    }

    // --- TEST CASE 4: Portfolio publish / public view / analytics ---
    console.log('\n--- TEST CASE 4: Portfolio - publish, public view, and analytics ---');
    
    // Check that public view fails before publish (returns 404)
    const viewUnpublishedRes = await request.get('/api/v1/portfolio/testuser');
    if (viewUnpublishedRes.status === 404) {
      console.log('✅ GET /portfolio/:username correctly returns 404 when not published.');
    } else {
      throw new Error(`GET /portfolio/:username should have returned 404 for unpublished, but got: ${viewUnpublishedRes.status}`);
    }

    // Publish portfolio
    const publishRes = await request.post('/api/v1/portfolio/me/publish').set('Authorization', authToken);
    if (publishRes.status === 200 && publishRes.body.data.isPublished === true) {
      console.log('✅ POST /portfolio/me/publish successfully set isPublished = true.');
    } else {
      throw new Error(`POST /portfolio/me/publish failed: ${JSON.stringify(publishRes.body)}`);
    }

    // View public portfolio (should pass and increment viewCount)
    const viewRes = await request.get('/api/v1/portfolio/testuser');
    if (viewRes.status === 200 && viewRes.body.data.viewCount === 1) {
      console.log('✅ GET /portfolio/:username returned details and successfully incremented viewCount to 1.');
    } else {
      throw new Error(`GET /portfolio/:username failed: ${JSON.stringify(viewRes.body)}`);
    }

    // Premium analytics check (standard user should be blocked with 403)
    const standardAnalyticsRes = await request.get('/api/v1/portfolio/me/analytics').set('Authorization', authToken);
    if (standardAnalyticsRes.status === 403) {
      console.log('✅ GET /portfolio/me/analytics successfully blocked standard user (403).');
    } else {
      throw new Error(`GET /portfolio/me/analytics allowed standard user: ${standardAnalyticsRes.status}`);
    }

    // Premium analytics check (premium user should get access)
    const premiumAnalyticsRes = await request.get('/api/v1/portfolio/me/analytics').set('Authorization', premiumToken);
    if (premiumAnalyticsRes.status === 200 && premiumAnalyticsRes.body.data.viewCount === 0) {
      console.log('✅ GET /portfolio/me/analytics successfully permitted premium user.');
    } else {
      throw new Error(`GET /portfolio/me/analytics failed for premium user: ${JSON.stringify(premiumAnalyticsRes.body)}`);
    }

    // --- TEST CASE 5: Project creation ---
    console.log('\n--- TEST CASE 5: Projects - creation ---');
    const createProjectRes = await request
      .post('/api/v1/projects')
      .set('Authorization', authToken)
      .send({
        title: 'Lumina AI Search',
        description: 'An AI-powered contextual search engine.',
        category: 'ML',
        techStack: ['Python', 'PyTorch', 'Next.js'],
        demoUrl: 'https://lumina-search.com',
        teamSize: 2,
        status: 'in_progress',
      });
    
    // Check for custom success status 218
    if (createProjectRes.status === 218 && createProjectRes.body.data.title === 'Lumina AI Search') {
      projectId = createProjectRes.body.data._id;
      console.log(`✅ POST /projects successfully created project Lumina AI Search with ID: ${projectId}.`);
    } else {
      throw new Error(`POST /projects failed: ${JSON.stringify(createProjectRes.body)}`);
    }

    // --- TEST CASE 6: Project showcase & filtering ---
    console.log('\n--- TEST CASE 6: Projects - list, paginate & filter ---');
    const listRes = await request.get('/api/v1/projects?category=ML&tech=Python');
    if (listRes.status === 200 && listRes.body.data.projects.length === 1) {
      console.log('✅ GET /projects returned filtered ML/Python project successfully.');
    } else {
      throw new Error(`GET /projects filtering failed: ${JSON.stringify(listRes.body)}`);
    }

    // --- TEST CASE 7: Project update & featuring ---
    console.log('\n--- TEST CASE 7: Projects - update and toggle featured status ---');
    const patchRes = await request
      .patch(`/api/v1/projects/${projectId}`)
      .set('Authorization', authToken)
      .send({ title: 'Lumina AI Search V2' });
    
    if (patchRes.status === 200 && patchRes.body.data.title === 'Lumina AI Search V2') {
      console.log('✅ PATCH /projects/:id successfully updated project title.');
    } else {
      throw new Error(`PATCH /projects/:id failed: ${JSON.stringify(patchRes.body)}`);
    }

    const featureRes = await request.patch(`/api/v1/projects/${projectId}/feature`).set('Authorization', authToken);
    if (featureRes.status === 200 && featureRes.body.data.isFeatured === true) {
      console.log('✅ PATCH /projects/:id/feature toggled isFeatured to true.');
    } else {
      throw new Error(`PATCH /projects/:id/feature failed: ${JSON.stringify(featureRes.body)}`);
    }

    // --- TEST CASE 8: Project screenshot presign url generation ---
    console.log('\n--- TEST CASE 8: Projects - screenshot presigned upload URLs ---');
    const presignRes = await request
      .post(`/api/v1/projects/${projectId}/screenshots`)
      .set('Authorization', authToken)
      .send({
        screenshots: [
          { filename: 'landing-page.png', contentType: 'image/png' }
        ]
      });
    
    if (
      presignRes.status === 200 &&
      presignRes.body.data[0].presignedUrl.includes('mock-upload') &&
      presignRes.body.data[0].fileKey.includes('landing-page.png')
    ) {
      console.log('✅ POST /projects/:id/screenshots returned valid presigned URL.');
      
      // Attempt uploading using the presigned URL directly (to test our S3 mock API)
      const uploadRes = await request
        .put(`/api/mock-upload/${presignRes.body.data[0].fileKey}`)
        .send('mock-file-content');
      
      if (uploadRes.status === 200 && uploadRes.body.success) {
        console.log('   -> ✅ Direct PUT request to S3 mock handler uploaded file successfully.');
      } else {
        throw new Error(`PUT upload failed: ${JSON.stringify(uploadRes.body)}`);
      }
    } else {
      throw new Error(`POST /projects/:id/screenshots failed: ${JSON.stringify(presignRes.body)}`);
    }

    // --- TEST CASE 9: Workspace creation ---
    console.log('\n--- TEST CASE 9: Workspaces - creation ---');
    const createWsRes = await request
      .post('/api/v1/workspaces')
      .set('Authorization', authToken)
      .send({
        title: 'My Engineering Workspace',
        description: 'Where I coordinate lumina-search coding tasks.',
        category: 'Engineering',
        projects: [projectId],
      });
    
    if (createWsRes.status === 201 && createWsRes.body.data.projects[0] === projectId) {
      workspaceId = createWsRes.body.data._id;
      console.log(`✅ POST /workspaces created workspace Engineering with referenced project ID: ${workspaceId}.`);
    } else {
      throw new Error(`POST /workspaces failed: ${JSON.stringify(createWsRes.body)}`);
    }

    // --- TEST CASE 10: Workspace list ---
    console.log('\n--- TEST CASE 10: Workspaces - listing ---');
    const listWsRes = await request.get('/api/v1/workspaces').set('Authorization', authToken);
    if (listWsRes.status === 200 && listWsRes.body.data.length === 1 && listWsRes.body.data[0]._id === workspaceId) {
      console.log('✅ GET /workspaces listed correct user workspace.');
    } else {
      throw new Error(`GET /workspaces failed: ${JSON.stringify(listWsRes.body)}`);
    }

    console.log('\n⭐ ALL INTEGRATION TESTS PASSED SUCCESSFULLY! ⭐');

  } catch (err: any) {
    console.error('\n❌ Integration Test Failed:', err.message || err);
    process.exit(1);
  } finally {
    // Cleanup databases
    await mongoose.disconnect();
    await mongoServer.stop();
    console.log('\n🔌 Cleaned up connections. Exiting.');
  }
}

runTests();
