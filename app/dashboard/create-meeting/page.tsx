import { Metadata } from 'next';
import CreateMeetingButton from '@/app/ui/dashboard/create-meeting-button';

export const metadata: Metadata = {
  title: 'Create Zoom Meeting',
};

export default function Page() {
  return (
    <main>
      <h1>Hola! Bienvendio a Create Zoom Page</h1>
      <CreateMeetingButton></CreateMeetingButton>
    </main>
  );
}
