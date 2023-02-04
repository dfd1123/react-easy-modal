import { FunctionComponent, ReactNode } from 'react';
import ModalProvider from './provider/ModalProvider';
import useModal from './hooks/useModal';

export interface ModalType {
  id: number;
  props?: any;
  component: any;
  resolve: <T>(value: T) => void;
  reject: (reason?: any) => void;
}

export interface ModalComponentPropsType {
  children?: ReactNode;
  className?: string;
  close?: () => void;
  resolve?: <T>(value: T) => void;
}

type PropsOf<T> = T extends FunctionComponent<infer P> ? P : {};

export type AddModalType = <T extends FunctionComponent<any>>(params : { component: T, props?: PropsOf<T>, duplicateCheck?: boolean, isScrollFreeze?: boolean }) => Promise<any>;
export type OpenModalType = <T extends FunctionComponent<any>>(component: T, props?: PropsOf<T>, duplicateCheck?: boolean) => Promise<any>;
export type CloseModalType = (id: number) => void;
export type ResolveModalType = <T extends ModalType, R>(modal: T, result: R) => void;
export type CheckModalType = <T extends FunctionComponent>(component: T, onlyLastCheck?: boolean) => boolean;


export {ModalProvider, useModal};
