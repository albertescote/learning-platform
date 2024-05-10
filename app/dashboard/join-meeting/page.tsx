import { Metadata } from 'next';
import { getAllMeetings } from '@/app/lib/backend/meeting';
import JoinMeetingButton from '@/app/ui/dashboard/join-meeting-button';

export const metadata: Metadata = {
  title: 'Join Zoom Meeting',
};

export default async function Page() {
  const meetings = await getAllMeetings();
  return (
    <main>
      <h1>Hola! Bienvendio a Join Zoom Page</h1>
      <>
        {meetings.map((meeting) => {
          return (
            <JoinMeetingButton
              key={meeting.id}
              topic={meeting.topic}
            ></JoinMeetingButton>
          );
        })}
      </>
    </main>
  );
}
