'use client';
import { createNewMeeting } from '@/app/lib/backend/meeting';

export default function MeetingButton({
  text,
  role,
}: {
  text: string;
  role: number;
}) {
  async function createMeeting() {
    const meetingNumber = await createNewMeeting();
    window.open(
      `/meeting?role=${role}&topic=${meetingNumber}`,
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
