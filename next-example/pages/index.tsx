import {useModal} from 'react-easy-modal';
import TestModal from '@/components/TestModal';

export default function Home() {
  const {modal} = useModal();

  const openModal = () => {
    modal(TestModal);
  }

  return (
    <div>
      <div className="container">
        <button onClick={openModal}>Open Modal</button>
      </div>
    </div>
  )
}
