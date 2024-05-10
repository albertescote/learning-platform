'use server';

import axios, { AxiosError } from 'axios';
import { BACKEND_URL } from '@/app/config';
import { decodeJwt } from 'jose';

export interface GetUserResponse {
  id: string;
  firstName: string;
  familyName: string;
  email: string;
  role: string;
}

export async function getUserInfo(
  accessToken: string,
): Promise<GetUserResponse> {
  try {
    const jwtPayload = decodeJwt(accessToken);
    const response = await axios.get(BACKEND_URL + '/user/' + jwtPayload.sub, {
      headers: { Authorization: 'Bearer ' + accessToken },
    });
    return response.data as GetUserResponse;
  } catch (error) {
    throw new Error(
      `Error status: ${(error as AxiosError).code}. Error message: ${
        (error as AxiosError).message
      }`,
    );
  }
}

export async function getFirstStudentId(accessToken: string): Promise<string> {
  try {
    const response = await axios.get(BACKEND_URL + '/user', {
      headers: { Authorization: 'Bearer ' + accessToken },
    });
    const allUsers = response.data as GetUserResponse[];
    return allUsers.find((user) => user.role === 'Student')!.id;
  } catch (error) {
    throw new Error(
      `Error status: ${(error as AxiosError).code}. Error message: ${
        (error as AxiosError).message
      }`,
    );
  }
}
