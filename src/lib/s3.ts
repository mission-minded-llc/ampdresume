import {
  CopyObjectCommand,
  HeadObjectCommand,
  NotFound,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

/**
 * Internal helper to create an S3 client instance.
 *
 * @returns an S3 client instance.
 */
export const getS3Client = () => {
  if (
    !process.env?.AWS_REGION ||
    !process.env?.AWS_S3_USER_ACCESS_KEY_ID ||
    !process.env?.AWS_S3_USER_SECRET_ACCESS_KEY ||
    !process.env?.AWS_S3_BUCKET_NAME
  ) {
    throw new Error("AWS environment variables are required.");
  }

  return new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_S3_USER_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_USER_SECRET_ACCESS_KEY,
    },
  });
};

/**
 * Helper function to check if an object exists in S3.
 *
 * @param key the key of the object to check.
 * @returns true if the object exists, false otherwise.
 * @throws an error if the object exists but there was an error checking it.
 */
export const objectExists = async (key: string): Promise<boolean> => {
  const s3Client = getS3Client();

  try {
    await s3Client.send(
      new HeadObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
      }),
    );
    return true;
  } catch (error) {
    if (error instanceof NotFound) {
      return false;
    }

    // Re-throw if it's a different kind of error (permissions, network, etc.)
    throw error;
  }
};

/**
 *
 * @param key the key of the object to upload.
 * @param body the body of the object to upload.
 * @param contentType the content type of the object to upload.
 */
export const uploadObject = async (key: string, body: Buffer, contentType: string) => {
  const s3Client = getS3Client();

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );
};

/**
 * Deletes or undeletes an object from S3.
 *
 * @param key the key of the object to delete.
 * @param deleteFlag the flag to set on the object to mark it for deletion.
 */
const updateDeleteFlag = async (key: string, deleteFlag: boolean) => {
  const sanitizedKey = key.trim();
  const s3Client = getS3Client();

  await s3Client.send(
    new CopyObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: sanitizedKey,
      CopySource: encodeURIComponent(`${process.env.AWS_S3_BUCKET_NAME}/${sanitizedKey}`),
      MetadataDirective: "REPLACE",
      Metadata: {
        // AWS will automatically prefix the meta key with "x-amz-meta-"
        delete: deleteFlag.toString(),
      },
    }),
  );
};

/**
 * Deletes an object from S3 by updating the metadata to flag it for deletion
 * by a separate process.
 *
 * @param key the key of the object to delete.
 */
export const flagForDeletion = async (key: string) => {
  updateDeleteFlag(key, true);
};

/**
 * Helper to revert the metadata flag for deletion on an object.
 *
 * @param key the key of the object to delete.
 */
export const revertFlagForDeletion = async (key: string) => {
  updateDeleteFlag(key, false);
};
