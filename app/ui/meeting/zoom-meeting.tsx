'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { signVideoToken } from '@/app/lib/backend/signature';
import uitoolkit from '@zoom/videosdk-ui-toolkit';
import '@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css';

export default function ZoomMeeting() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') as string;
  const topic = searchParams.get('topic') as string;

  useEffect(() => {
    const getAccessToken = async () => {
      return signVideoToken(parseInt(role), topic);
    };

    getAccessToken().then((accessToken) => {
      videoInit(accessToken);
    });
  }, []);

  const sessionClosed = () => {
    console.log('session closed');
    const sessionContainer = document.getElementById(
      'sessionContainer',
    ) as HTMLElement;
    uitoolkit.closeSession(sessionContainer);
    window.close();
  };

  function videoInit(accessToken: string) {
    console.log('initiating session');
    const config = {
      videoSDKJWT: accessToken,
      sessionName: topic,
      userName: 'React',
      sessionPasscode: '123',
      features: ['video', 'audio', 'settings', 'users', 'chat', 'share'],
    };
    const sessionContainer = document.getElementById(
      'sessionContainer',
    ) as HTMLElement;
    console.log({ accessToken });
    uitoolkit.joinSession(sessionContainer, config);

    uitoolkit.onSessionClosed(sessionClosed);
  }
  return <div id="sessionContainer"></div>;
}
