import ZoomMeeting from '@/app/ui/meeting/zoom-meeting';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meeting',
};

export default async function Page({
  searchParams,
}: {
  searchParams: {
    accessToken: string;
  };
}) {
  return (
    <main>
      <div>
        <ZoomMeeting accessToken={searchParams.accessToken}></ZoomMeeting>
      </div>
    </main>
  );
}
