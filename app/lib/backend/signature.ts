'use server';

import axios, { AxiosError } from 'axios';
import { BACKEND_URL } from '@/app/config';

export async function signMeetingToken(
  role: number,
  meetingNumber: number,
): Promise<string> {
  try {
    const requestBody = {
      role: Number(role),
      meetingNumber: Number(meetingNumber),
    };
    const response = await axios.post(
      BACKEND_URL + '/signature/meeting',
      requestBody,
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    );
    return response.data.signature;
  } catch (error) {
    throw new Error(JSON.stringify((error as AxiosError).response?.data));
  }
}

export async function signVideoToken(
  role: number,
  topic: string,
): Promise<string> {
  try {
    const requestBody = {
      role: Number(role),
      topic: topic,
    };
    const response = await axios.post(
      BACKEND_URL + '/signature/video',
      requestBody,
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    );
    return response.data.signature;
  } catch (error) {
    throw new Error(JSON.stringify((error as AxiosError).response?.data));
  }
}
