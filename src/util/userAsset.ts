export type UploadUserAssetResponse = {
  status: number;
  url?: string;
  error?: string;
};

/**
 * Upload an asset to the server. Typically images, these are
 * stored in S3 if they pass back-end validation.
 *
 * @param {File} file - The file to upload.
 * @returns {Promise<{ status: number; src?: string; error?: string }>}
 */
export const uploadUserAsset = async (file: File): Promise<UploadUserAssetResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/user-asset/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const { error } = await response.json();
    return { status: response.status, error };
  }

  const { url } = await response.json();

  return { status: 200, url };
};

/**
 * Helper function to manage images in the user's S3 folder.
 *
 * @param src the S3 URL of the image to manage
 * @param action the action to perform ('delete' or 'undelete')
 */
export const manageUserAsset = async (src: string, action: "delete" | "undelete") => {
  try {
    const response = await fetch(`/api/user-asset/${action}`, {
      method: "POST",
      body: JSON.stringify({ src }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(`Error (${response.status}): ${error}`);
    }
  } catch (error) {
    throw new Error(`${action} failed: ${(error as Error).message}`);
  }
};

export const deleteUserAsset = (src: string) => manageUserAsset(src, "delete");
export const undeleteUserAsset = (src: string) => manageUserAsset(src, "undelete");
