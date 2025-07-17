/**
 * Helper functions for handling file uploads
 */

/**
 * Handles file upload to the public directory
 * @param files - FileList object from input
 * @returns Promise<string[]> - Array of file paths relative to public directory
 */
export const uploadFilesToPublic = async (
  files: FileList
): Promise<string[]> => {
  const uploadedPaths: string[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]

    try {
      // Since we're working locally, we'll simulate the upload
      // In a real implementation, you'd send this to an API endpoint
      // For now, we'll just create the blob URL and save it for display
      const reader = new FileReader()

      await new Promise<void>((resolve, reject) => {
        reader.onload = () => {
          const base64Data = reader.result as string
          uploadedPaths.push(base64Data)
          localStorage.setItem(`uploaded_file_${file.name}`, base64Data)
          resolve()
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    } catch (error) {
      console.error('Error uploading file:', error)
      throw new Error(`Failed to upload ${file.name}`)
    }
  }

  return uploadedPaths
}

/**
 * Gets the file URL for display
 * @param filePath - Path to the file
 * @returns string - URL for the file
 */
export const getFileUrl = (filePath: string): string => {
  const fileName = filePath.split('/').pop()
  const storedData = localStorage.getItem(`uploaded_file_${fileName}`)
  return storedData || filePath
}

/**
 * Validates file types and sizes
 * @param files - FileList object
 * @returns boolean - Whether files are valid
 */
export const validateFiles = (
  files: FileList
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []
  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
  ]
  const maxSize = 5 * 1024 * 1024 // 5MB

  for (let i = 0; i < files.length; i++) {
    const file = files[i]

    if (!allowedTypes.includes(file.type)) {
      errors.push(
        `${file.name}: Only image files are allowed (JPG, PNG, GIF, WebP)`
      )
    }

    if (file.size > maxSize) {
      errors.push(`${file.name}: File size must be less than 5MB`)
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const getFileById = (id: string): string | null => {
  return localStorage.getItem(`uploaded_file_${id}`)
}
