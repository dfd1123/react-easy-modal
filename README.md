# **react-easy-modal (🪄REMO)**

This library is a library that makes it easier to use modals, provides a high degree of freedom for easy customization, and helps manage modals efficiently.

By using this library, we can now develop services more quickly and keep our source simpler.

Let me introduce you. Easy, convenient and intuitive modal REMO!


## **Getting Started**

1. Enter the next-easy-keepalive installation command as shown below:

```bash
npm i react-easy-modal
# or 
yarn add react-easy-modal
```

2. You need to add ModalProvider to `/pages/_app.tsx` or `/App.tsx`. The important thing here is to wrap it right
   outside `<ModalProvider > ... </ModalProvider>`.
   The important thing here is that you must pass the pathname. The reason is that all modals should be closed when the page is moved.

```js
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ModalProvider } from 'react-easy-modal'; // import ModalProvider

export default function App({Component, pageProps}: AppProps) {
  const router = useRouter();
  const { pathname } = router;
  
  return (
    // should be wrapped right outside <ModalProvider > ... </ModalProvider>`
    <ModalProvider pathname={pathname}>
      <Component {...pageProps} />
    </ModalProvider>
  );
}
```

Now you are ready to use REMO! It's that simple, right? 😎

REMO has some basic options and options that can be specified when using it.

Then, we will tell you how to use REMO in earnest.

## **How to use useModal Hook**

1. To use REMO, you must import and use a hook called useModal.
2. If you want to use the Modal form as a framework provided by REMO by default, import the ModalTemplate component. (You are free to make your own.)
3. Be sure to define the props type of the Modal component! ModalPropsType must be imported from REMO and extended.
4. Among the values ​​returned by the useModal hook, the `modal` function is assigned, and as the first argument of the modal function, enter the functional component you want to display modally.
5. The 2nd argument of the `modal` function can deliver `various options and props values ​​to be passed to the component received as the 1st argument`.

```tsx
import { useModal, ModalPropsType, ModalTemplate } from 'react-easy-modal';

interface PropsType extends ModalPropsType {
  className?: string;
  text: string;
}

const TestModal = ({ className, text, close, resolve }: PropsType) => {
  return (
    <ModalTemplate className={className} showDim close={close}>
      TestModal {text}
      <div className="btn-cont">
        <button onClick={close}>취소</button>
        <button onClick={() => resolve && resolve(true)}>확인</button>
      </div>
    </ModalTemplate>
  );
};

export default function Home() {
  const { modal } = useModal();

  const openModal = async () => {
    const res = await modal(TestModal, { text: 'TEST');
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

```

If you want to create and use a modal template yourself, you can create and use it yourself.

One thing to be aware of when creating a template is to import `ModalTemplatePropsType` from REMO and specify the props type of the Modal template component.

Even if you don't use typescript, `{children, close}` must be passed as props!

See examples below and create your own Modal templates!

```tsx
import React from 'react';
import styled from 'styled-components';
import { ModalTemplatePropsType } from 'react-easy-modal';

const ModalTemplateComp = ({ className, showDim, children, close }: ModalTemplatePropsType) => {
  return (
    <div className={className}>
      {!!showDim && (
        <div tabIndex={-1} role="button" aria-label="modal-dim" className="dim" onClick={close} />
      )}
      <div className="modal-cont">
        {children}
      </div>
    </div>
  );
};

const ModalTemplate = styled(ModalTemplateComp)`
  position: fixed; top: 0; left:0; bottom: 0; right: 0; z-index: 1; display: flex; justify-content: center; align-items: center;
  button{ cursor:pointer; border: none; background-color: transparent; }
  .dim{ position: absolute; top: 0; left:0; bottom: 0; right: 0; z-index: 1; background-color: rgba(0,0,0,0.5); }
  .modal-cont{ position: relative; z-index: 2;  width: 500px; height: 500px;  padding: 20px; border-radius: 8px; background-color: white;  }

  &.fade{  opacity: 0; transition-property: opacity;
    &.enter{ opacity: 1; }
    &.leave{ opacity: 0; }
  }

  @keyframes fade {
    0%{ opacity: 0; }
    100%{ opacity: 1;}
  }
`;

export default ModalTemplate;
```


## **Want to put some animation effects on your modal?**

REMO helps you easily reflect various animations.

If you want to add animation effects to the modal, first put animation keyframes (@keyframes) in your css file (scss, less, etc.)

```css
// When creating keyframes, be sure to put `modal-` as a prefix.

@keyframes modal-fade {
    0% {
        opacity: 0;
        transform: scale(0.95);
    }
    100%{
        opacity: 1;
        transform: scale(1);
    }
}
```

Then, pass the option value related to animation to the second argument of the modal function assigned with the useModal hook.

```tsx
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
```


The output of this is shown below.

![test modal](https://user-images.githubusercontent.com/42544793/236751261-24fc13ec-7cdd-4446-b666-db3234b7e135.gif)

It actually works very smoothly...😅




## **About default option values**

ModalProvider can receive default option values.

| option                | type                                                                                   | default value                 | description                                                                                                                                                                                                                                                   |
|-----------------------|----------------------------------------------------------------------------------------|-------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| className             | `string`                                                                               | `jw-modal`                    | This option specifies the class name of the element surrounding the modal component.                                                                                                                    |
| pathname              | `string`                                                                               | `undefined`                   | In order to detect page movement, the location or pathname of the next router must be passed.                                                                                                                       |
| animation             | `{ name: string, duration: number }`                                                   | `{ name: '', duration: 250 }` | In the animation name, enter the name of the keyframe name written in the css file by removing only the prefix modal-. (ex. @keyframes modal-fade -> animation={{name:'fade'}})                                                                                                              |
| backActionControl     | `{ func: (value: { modals: MutableRefObject<ModalType[]> }) => void;, deps?: any[]; }` | `undefined`                   | This function is used when you need to control the modal when going back. In func, you can write your own logic to close the modal when going back. The argument of the func function receives an array value of currently exposed modal information. deps is a dependency array, and you can think of it as the same as useEffect's deps.                                             |


For example:
```tsx
//...

export default function App({Component, pageProps}: AppProps) {
  const backActionControl = (value: : MutableRefObject<ModalType[]>) => {
    // router action pop control
  }


  return (
    <ModalProvider animation={{name: 'fade', duration: 300}} backActionControl={{func: backActionControl, deps: []}} >
      <Component {...pageProps} />
    </ModalProvider>
  );
}
```


## **About modal function option values**

Options of the modal function returned using the useModal hook can be specified by passing them along with props values ​​as the second argument.

| option                | type                                                                                   | default value                  | description                                                                                                                                                                                                                                                   |
|-----------------------|----------------------------------------------------------------------------------------|--------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| animation             | `{ name: string, duration: number }` `undefined`                                       | `{ name: '', duration: 250 }`  | For animation name, enter the keyframe name written in the css file with only the prefix `modal-` removed (ex. @keyframes modal-fade -> animation={{name:'fade'}})                                                                                                             |
| duplicateCheck        | `boolean` `undefined`                                                                  | `false`                        | This option exposes the modal component after checking whether the modal component to be exposed is already open. Among the opened modals, if the same modal is opened immediately before, it is automatically ignored even if this option value is set to false.                                                                                                      |


## **Thanks!**

Contact mail: dfd11233@gmail.com
