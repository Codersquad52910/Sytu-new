import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from './env';

const hasCredentials = !!env.AWS_ACCESS_KEY_ID && !!env.AWS_SECRET_ACCESS_KEY;

let s3Client: S3Client | null = null;
if (hasCredentials) {
  s3Client = new S3Client({
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
    },
  });
}

/**
 * Generate a presigned URL for direct S3 upload
 * @param fileKey S3 key (file path) for the uploaded file
 * @param contentType MIME type of the file
 * @param expiresInSeconds Lifetime of the URL (default: 5 min)
 */
export async function getUploadPresignedUrl(
  fileKey: string,
  contentType: string,
  expiresInSeconds = 300
): Promise<string> {
  if (!s3Client) {
    // If no credentials, return a mock URL for local testing
    console.log(`[S3-Mock] Presigning upload for key: ${fileKey}`);
    return `http://localhost:${env.PORT}/api/mock-upload/${fileKey}?expires=${expiresInSeconds}&contentType=${encodeURIComponent(contentType)}`;
  }

  const command = new PutObjectCommand({
    Bucket: env.S3_BUCKET_NAME,
    Key: fileKey,
    ContentType: contentType,
  });

  return getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
}
