import ZoomMeeting from '@/app/ui/meeting/zoom-meeting';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meeting',
};

export default async function Page() {
  return (
    <main>
      <div>
        <ZoomMeeting></ZoomMeeting>
      </div>
    </main>
  );
}
