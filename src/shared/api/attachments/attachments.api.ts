'use client'

import { useMutation } from '@tanstack/react-query'
import { APIClient } from '@/shared/api'
import { ENDPOINTS } from '@/shared/config'

interface ITempAttachmentRequest {
  filename: string
  acl?: string
}

interface ITempAttachmentUrlResponse {
  attachment: {
    public_url: string
    presigned_url: string
  }
}

interface IUploadFileToServerRequest {
  uploadUrl: string
  file: File
}

export const useFetchTempAttachment = () =>
  useMutation<ITempAttachmentUrlResponse, Error, ITempAttachmentRequest>({
    mutationFn: async data => {
      try {
        const response = await APIClient().post<
          ITempAttachmentUrlResponse,
          ITempAttachmentRequest
        >(ENDPOINTS.TEMP_ATTACHMENTS, data)
        return response.data
      } catch (error: any) {
        throw new Error(
          error.response?.data?.message ||
            'Failed to fetch temporary attachment'
        )
      }
    }
  })

export const useUploadFile = () =>
  useMutation<void, Error, IUploadFileToServerRequest>({
    mutationFn: async ({ uploadUrl, file }) => {
      try {
        await APIClient({ isDirectUrl: true, baseURL: uploadUrl }).put<
          void,
          File
        >(uploadUrl, file)
      } catch (error: any) {
        throw new Error(
          error.response?.data?.message || 'Failed to upload file'
        )
      }
    }
  })
