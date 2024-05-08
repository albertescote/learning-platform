'use client';
import { createNewMeeting } from '@/app/lib/backend/meeting';
import { getCookie } from 'cookies-next';

export default function MeetingButton({ text }: { text: string }) {
  async function createMeeting() {
    const accessToken = getCookie('access_token_learning_platform');
    const newMeeting = await createNewMeeting(accessToken!);
    window.open(
      `/meeting?topic=${newMeeting.topic}&session=${newMeeting.signature}`,
      '_blank',
      'noopener,noreferrer',
    );
  }
  return (
    <div>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={createMeeting}
      >
        {text}
      </button>
    </div>
  );
}
