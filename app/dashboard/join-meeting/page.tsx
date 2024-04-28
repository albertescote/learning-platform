import { Metadata } from 'next';
import MeetingButton from '@/app/ui/meeting/meeting-button';

export const metadata: Metadata = {
  title: 'Join Zoom Meeting',
};

export default async function Page() {
  return (
    <main>
      <h1>Hola! Bienvendio a Join Zoom Page</h1>
      <MeetingButton text={'Join meeting'}></MeetingButton>
    </main>
  );
}
