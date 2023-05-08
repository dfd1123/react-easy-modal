import { FunctionComponent, MutableRefObject, ReactNode } from 'react';
import ModalProvider from './provider/ModalProvider';
import ModalTemplate from './components/ModalTemplate';
import useModal from './hooks/useModal';
import useModalAnimation from './hooks/useModalAnimation';

export interface ModalType {
  id: number;
  props?: any;
  component: any;
  resolve: <T>(value: T) => void;
  reject: (reason?: any) => void;
}

export interface ModalContextType {
  className?: string;
  modals: MutableRefObject<ModalType[]>;
  animation?: AnimationOptions;
  setModals: (modals: ModalType[]) => void;
  scrollRelease?: () => void;
  scrollFreeze?: () => void;
}

export interface ModalTemplatePropsType {
  className?: string;
  children: React.ReactNode;
  showDim?: boolean;
  close: () => void;

}

export interface ModalPropsType {
  children?: ReactNode;
  className?: string;
  close: () => void;
  resolve: <T>(value: T) => void;
}

export interface AnimationOptions {
  duration?: number;
  timingFunction?: string;
  name?: string;
}

type PropsOf<T> = (T extends FunctionComponent<infer P> ? Omit<P, 'close' | 'resolve'> & { animation?: AnimationOptions; duplicateCheck?: boolean; } : { animation?: AnimationOptions; duplicateCheck?: boolean; });

export type AddModalType = <T extends FunctionComponent<any>>(params : { component: T, props?: PropsOf<T>, isScrollFreeze?: boolean }) => Promise<any>;
export type OpenModalType = <P = any, T extends FunctionComponent<any> = FunctionComponent>(component: T, props?: PropsOf<T>) => Promise<P>;
export type CloseModalType = (id: number) => void;
export type ResolveModalType = <T extends ModalType, R>(modal: T, result: R) => void;
export type CheckModalType = <T extends FunctionComponent>(component: T, onlyLastCheck?: boolean) => boolean;

export const DEFAULT_ANIMATION_DURATION = 250;

export { ModalProvider, ModalTemplate, useModal, useModalAnimation };
