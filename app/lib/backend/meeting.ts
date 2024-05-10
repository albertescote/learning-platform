'use server';

import axios, { AxiosError } from 'axios';
import { BACKEND_URL } from '@/app/config';
import { getFirstStudentId } from '@/app/lib/backend/user';

export interface CreateMeetingResponse {
  id: string;
  topic: string;
  studentId: string;
  signature: string;
}

export interface GetMeetingResponse {
  id: string;
  topic: string;
  studentId: string;
}

export async function createNewMeeting(
  accessToken: string,
): Promise<CreateMeetingResponse> {
  try {
    const defaultStudentId = await getFirstStudentId(accessToken);
    const response = await axios.post(
      BACKEND_URL + '/meeting',
      { topic: 'test-topic', studentId: defaultStudentId },
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

export async function getAllMeetings(
  accessToken: string,
): Promise<GetMeetingResponse[]> {
  try {
    const response = await axios.get(BACKEND_URL + '/meeting', {
      headers: { Authorization: 'Bearer ' + accessToken },
    });
    return response.data as GetMeetingResponse[];
  } catch (error) {
    throw new Error(
      `Error status: ${(error as AxiosError).code}. Error message: ${
        (error as AxiosError).message
      }`,
    );
  }
}
