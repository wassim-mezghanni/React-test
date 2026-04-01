import AppLayout from '../../layouts/AppLayout.tsx';
import { ChatInput } from '../../components/ui/ChatInput.tsx';

const suggestions = [
  'Analyze monthly payment variance',
  'upcoming customer payments',
  'Forecast my income for the year',
  'Compare Q1 versus Q2 revenue',
];

export default function Chat() {
  return (
    <AppLayout activeNavId="chat">
      <div className="flex flex-col items-center justify-center h-[calc(100vh-56px)] px-8">
        <ChatInput
          suggestions={suggestions}
          onSend={(msg) => console.log('Send:', msg)}
        />
      </div>
    </AppLayout>
  );
}
