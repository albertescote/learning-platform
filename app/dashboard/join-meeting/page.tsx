import { Metadata } from 'next';
import MeetingButton from '@/app/ui/meeting/meeting-button';
import { getAllMeetings } from '@/app/lib/backend/meeting';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Join Zoom Meeting',
};

export default async function Page() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token_learning_platform');
  const meetings = await getAllMeetings(accessToken!.value);
  return (
    <main>
      <h1>Hola! Bienvendio a Join Zoom Page</h1>
      <>
        {meetings.map((meeting) => {
          return (
            <MeetingButton
              key={meeting.id}
              text={`Join meeting ${meeting.id}`}
            ></MeetingButton>
          );
        })}
      </>
    </main>
  );
}
