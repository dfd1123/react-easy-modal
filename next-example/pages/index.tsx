import { useModal } from 'react-easy-modal';
import TestModal from '@/components/TestModal';

export default function Home() {
  const { modal } = useModal();

  const openModal = async () => {
    const res = await modal(TestModal, { text: 'Test', animation: { name: 'fade', duration: 250 }, duplicateCheck: true });
    console.log('response:', res);
  };

  return (
    <div>
      <div className="container">
        <button onClick={openModal}>Open Modal</button>
      </div>
    </div>
  );
}
