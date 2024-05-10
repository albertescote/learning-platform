'use client';
import { createNewMeeting } from '@/app/lib/backend/meeting';

export default function CreateMeetingButton() {
  async function createMeeting() {
    const newMeeting = await createNewMeeting();
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
        Join meeting
      </button>
    </div>
  );
}
