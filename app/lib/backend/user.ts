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
