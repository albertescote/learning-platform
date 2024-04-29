'use client';
import { useEffect, useState } from 'react';
import { ZoomMtg } from '@zoom/meetingsdk';
import { getZoomAuthToken } from '@/app/lib/actions';

export default function ZoomMeeting({
  leaveUrl,
  sdkKey,
  role,
  meetingNumber,
}: {
  leaveUrl: string;
  sdkKey: string;
  role: number;
  meetingNumber: number;
}) {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();

    const getAccessToken = async () => {
      return getZoomAuthToken(role, meetingNumber);
    };

    getAccessToken().then((accessToken) => setAccessToken(accessToken));
  }, []);

  useEffect(() => {
    // @ts-ignore
    document.getElementById('zmmtg-root').style.display = 'block';

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      patchJsMedia: true,
      success: (success: any) => {
        console.log(success);

        ZoomMtg.join({
          signature: accessToken,
          sdkKey: sdkKey,
          meetingNumber: meetingNumber,
          passWord: '',
          userName: 'TestName',
          userEmail: '',
          tk: '',
          zak: '',
          success: (success: any) => {
            console.log(success);
          },
          error: (error: any) => {
            console.log(error);
          },
        });
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }, [accessToken]);

  return <div></div>;
}
