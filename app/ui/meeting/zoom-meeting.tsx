'use client';
import '@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { validateAccessToken } from '@/app/lib/backend/auth';

export default function ZoomMeeting() {
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic') as string;
  const sessionJwt = searchParams.get('session') as string;

  useEffect(() => {
    validateAccessToken().then((accessTokenPayload) => {
      videoInit(accessTokenPayload!.email, sessionJwt).then();
    });
  }, [sessionJwt]);

  function sessionClosed(uitoolkit: any, sessionContainer: HTMLElement) {
    console.log('session closed');
    uitoolkit.closeSession(sessionContainer);
    window.close();
  }

  async function videoInit(username: string, sessionJwt: string) {
    console.log('initiating session');
    const uitoolkit = (await import('@zoom/videosdk-ui-toolkit')).default;
    const config = {
      videoSDKJWT: sessionJwt,
      sessionName: topic,
      userName: username,
      sessionPasscode: '123',
      features: ['video', 'audio', 'settings', 'users', 'chat', 'share'],
    };
    const sessionContainer = document.getElementById(
      'sessionContainer',
    ) as HTMLElement;
    uitoolkit.joinSession(sessionContainer, config);

    uitoolkit.onSessionClosed(() => sessionClosed(uitoolkit, sessionContainer));
  }
  return <div id="sessionContainer"></div>;
}
