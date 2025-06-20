'use client'

import { useCallback, useState } from 'react'
import { useFetchTempAttachment, useUploadFile } from '@/shared/api/attachments'

const useUploadFileToServer = () => {
  const tempAttachmentMutate = useFetchTempAttachment()
  const uploadMutate = useUploadFile()

  const [publicUrl, setPublicUrl] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleUpload = useCallback(
    async (file: File) => {
      setPublicUrl(null)
      setIsSuccess(false)

      try {
        const {
          attachment: { presigned_url, public_url }
        } = await tempAttachmentMutate.mutateAsync({
          filename: file.name
        })
        await uploadMutate.mutateAsync({
          uploadUrl: presigned_url,
          file: file
        })
        setPublicUrl(public_url)
        setPublicUrl(public_url)
        setPreview(URL.createObjectURL(file))
      } catch (error) {
        console.error('Error uploading file:', error)
      }
    },
    [tempAttachmentMutate, uploadMutate]
  )

  return {
    handleUpload,
    error: uploadMutate.error,
    isPending: uploadMutate.isPending,
    isSuccess,
    isError: uploadMutate.isError,
    publicUrl,
    preview,
    setPreview
  }
}

export { useUploadFileToServer }
