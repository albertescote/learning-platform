'use client';

export default function JoinMeetingButton({ topic }: { topic: string }) {
  function joinMeeting() {
    window.open(`/meeting?topic=${topic}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <div>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={joinMeeting}
      >
        Join meeting
      </button>
    </div>
  );
}
