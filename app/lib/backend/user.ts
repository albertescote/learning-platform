'use server';

import axios, { AxiosError } from 'axios';
import { BACKEND_URL } from '@/app/config';
import { decodeJwt } from 'jose';
import { getAccessTokenCookie } from '@/app/lib/utils';

export interface GetUserResponse {
  id: string;
  firstName: string;
  familyName: string;
  email: string;
  role: string;
}

export async function getUserInfo(): Promise<GetUserResponse> {
  const accessToken = getAccessTokenCookie();
  if (!accessToken) {
    throw new Error(
      'Access token validation failed: access token cookie not found',
    );
  }
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

export async function getFirstStudentId(): Promise<string> {
  try {
    const accessToken = getAccessTokenCookie();
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
