'use server';
import { BACKEND_PUBLIC_KEY, BACKEND_URL } from '@/app/config';
import axios, { AxiosError } from 'axios';
import { importJWK, JWK, jwtVerify } from 'jose';

export interface AuthenticationResult {
  valid: boolean;
  accessToken?: string;
  errorMessage?: string;
}

export async function authenticate(
  prevState: AuthenticationResult,
  formData: FormData,
): Promise<AuthenticationResult> {
  try {
    const loginBody = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    const response = await axios.post(BACKEND_URL + '/auth/login', loginBody);
    if (!response.data.access_token) {
      return {
        valid: false,
        errorMessage: 'An error occurred while being authenticated',
      };
    }
    return { valid: true, accessToken: response.data.access_token };
  } catch (error) {
    console.log(
      `Error status: ${(error as AxiosError).code}. Error message: ${
        (error as AxiosError).message
      }`,
    );
    return { valid: false, errorMessage: 'Invalid credentials!' };
  }
}

export async function validateAccessToken(
  accessToken: string,
): Promise<boolean> {
  try {
    const jsonString = Buffer.from(BACKEND_PUBLIC_KEY, 'base64').toString(
      'utf-8',
    );
    const jwk: JWK = JSON.parse(jsonString);
    const keyLike = await importJWK(jwk, jwk.alg ?? 'ES256');
    await jwtVerify(accessToken, keyLike, {
      algorithms: [jwk.alg ?? 'ES256'],
    });
    return true;
  } catch (error) {
    console.log('Access token validation failed: ' + (error as Error).message);
    return false;
  }
}
