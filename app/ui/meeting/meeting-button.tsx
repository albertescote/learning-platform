'use client';
export default function MeetingButton({ text }: { text: string }) {
  function createMeeting() {
    window.open('/meeting', '_blank', 'noopener,noreferrer');
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
