'use client';
import { useEffect } from 'react';
import { ZoomMtg } from '@zoom/meetingsdk';

export default function ZoomMeeting({ accessToken }: { accessToken: string }) {
  useEffect(() => {
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();
  }, []);
  return <div></div>;
}
