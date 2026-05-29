import Button from './Button';

export default function BottomNav() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div
        className="flex items-center gap-4 bg-white dark:bg-[#111111] rounded-full px-8 py-2"
        style={{
          boxShadow:
            '0 1px 2px 0 rgba(5,26,36,0.1), 0 4px 8px 0 rgba(5,26,36,0.08), 0 12px 20px 0 rgba(5,26,36,0.06), 0 0 0 0.5px rgba(0,0,0,0.05)',
        }}
      >
        <span className="font-serif text-2xl font-semibold text-[#051A24] dark:text-[#F6FCFF]">
          C
        </span>
        <Button variant="primary" className="!px-5 !py-2 text-sm">
          Start a chat
        </Button>
      </div>
    </div>
  );
}
