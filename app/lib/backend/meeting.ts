'use server';

import axios, { AxiosError } from 'axios';
import { BACKEND_URL } from '@/app/config';
import { getFirstStudentId } from '@/app/lib/backend/user';
import { getAccessTokenCookie } from '@/app/lib/utils';
import { randomUUID } from 'node:crypto';

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

export async function createNewMeeting(): Promise<CreateMeetingResponse> {
  try {
    const accessToken = getAccessTokenCookie();
    const defaultStudentId = await getFirstStudentId();
    const response = await axios.post(
      BACKEND_URL + '/meeting',
      {
        topic: `test-topic-${randomUUID().toString()}`,
        studentId: defaultStudentId,
      },
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

export async function getAllMeetings(): Promise<GetMeetingResponse[]> {
  try {
    const accessToken = getAccessTokenCookie();
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
