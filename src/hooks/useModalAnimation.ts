import { AnimationOptions } from '../index';
import { useEffect, useState } from 'react';

const useModalAnimation = (params: { close?: () => void, animation?: AnimationOptions }) => {
  const { close, animation } = params;
  const { duration: animationDuration = 250, className: animationClassName = '' } = animation || {};

  const [open, setOpen] = useState(false);
  const [transitionClass, setTransitionClass] = useState('');

  const closeModal = () => {
    if (close) {
      setOpen(false);
      setTimeout(() => {
        close();
      }, animation ? animationDuration : 0);
    }
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setTransitionClass(`${open ? 'enter' : 'leave'}`);
    }, 10);
  }, [open]);

  return { transitionClass, animationClassName, closeModal };
};

export default useModalAnimation;
