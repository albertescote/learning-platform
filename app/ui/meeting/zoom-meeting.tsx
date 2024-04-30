'use client';
import '@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { signVideoToken } from '@/app/lib/backend/signature';

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

  function sessionClosed(uitoolkit: any, sessionContainer: HTMLElement) {
    console.log('session closed');
    uitoolkit.closeSession(sessionContainer);
    window.close();
  }

  async function videoInit(accessToken: string) {
    console.log('initiating session');
    const uitoolkit = (await import('@zoom/videosdk-ui-toolkit')).default;
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

    uitoolkit.onSessionClosed(() => sessionClosed(uitoolkit, sessionContainer));
  }
  return <div id="sessionContainer"></div>;
}
