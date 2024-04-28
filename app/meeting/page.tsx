import ZoomMeeting from '@/app/ui/meeting/zoom-meeting';
import { Metadata } from 'next';
import { ZOOM_LEAVE_URL, ZOOM_SDK_KEY } from '@/app/config';

export const metadata: Metadata = {
  title: 'Meeting',
};

export default async function Page() {
  return (
    <main>
      <div>
        <ZoomMeeting
          leaveUrl={ZOOM_LEAVE_URL}
          sdkKey={ZOOM_SDK_KEY}
        ></ZoomMeeting>
      </div>
    </main>
  );
}
