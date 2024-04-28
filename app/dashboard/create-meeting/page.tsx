import { Metadata } from 'next';
import MeetingButton from '@/app/ui/meeting/meeting-button';

export const metadata: Metadata = {
  title: 'Create Zoom Meeting',
};

export default async function Page() {
  return (
    <main>
      <h1>Hola! Bienvendio a Create Zoom Page</h1>
      <MeetingButton text={'Create meeting'}></MeetingButton>
    </main>
  );
}
