'use server';

import axios, { AxiosError } from 'axios';
import { BACKEND_URL } from '@/app/config';

export async function createNewMeeting(): Promise<number> {
  try {
    const response = await axios.post(BACKEND_URL + '/meeting');
    return response.data.id;
  } catch (error) {
    throw new Error(
      `Error status: ${(error as AxiosError).code}. Error message: ${
        (error as AxiosError).message
      }`,
    );
  }
}
