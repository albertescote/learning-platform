'use server';

import axios, { AxiosError } from 'axios';
import { BACKEND_URL } from '@/app/config';

export interface CreateMeetingResponse {
  id: string;
  topic: string;
  role: string;
  signature: string;
}

export async function createNewMeeting(
  accessToken: string,
): Promise<CreateMeetingResponse> {
  try {
    const response = await axios.post(
      BACKEND_URL + '/meeting',
      { topic: 'test-topic' },
      { headers: { Authorization: 'Bearer ' + accessToken } },
    );
    return response.data as CreateMeetingResponse;
  } catch (error) {
    throw new Error(
      `Error status: ${(error as AxiosError).code}. Error message: ${
        (error as AxiosError).message
      }`,
    );
  }
}
