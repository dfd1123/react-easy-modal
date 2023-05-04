import { CloseModalType, DEFAULT_ANIMATION_DURATION, ModalType } from '../index';
import { useEffect, useMemo, useRef, useState } from 'react';

const useModalAnimation = (modal: ModalType, close: CloseModalType) => {
  const timeOutIds = useRef<number[]>([]);

  const { animation } = modal.props || {};
  const { duration: animationDuration = DEFAULT_ANIMATION_DURATION, name: animationClassName = '' } = animation || {};

  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  const transitionClass = useMemo(() => {
    let name = '';
    if (open && !done) {
      name = 'enter';
    } else if (!open && done) {
      name = 'leave';
    } else if (open && done) {
      name = 'enter-done';
    }
    return name;
  }, [open, done]);

  const closeModal = () => {
    if (!open || !done) return;

    setOpen(false);
    const id = window.setTimeout(() => {
      close(modal.id);
    }, animationClassName ? animationDuration - 50 : 0);

    timeOutIds.current.push(id);
  };

  const changeDoneStatus = () => {
    if (!open) return;

    const timeOutId = window.setTimeout(() => {
      setDone(done => !done);
    }, animationDuration);

    timeOutIds.current.push(timeOutId);
  };

  useEffect(() => {
    setOpen(true);

    return () => {
      timeOutIds.current.forEach(id => {
        window.clearTimeout(id);
      });
    };
  }, []);

  useEffect(() => {
    changeDoneStatus();
  }, [open]);

  return { transitionClass, animationClassName, closeModal };
};

export default useModalAnimation;
