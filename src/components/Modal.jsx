import {useRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children , buttonCaption}, ref) {
    const dialog = useRef();
    useImperativeHandle(ref,() => {
        return{
            open(){
                dialog.current.showModal();
            },
            close(){
                dialog.current.close();
            }
        };
    });

    return createPortal(
        <dialog ref={dialog}>
            {children}
            <form method='dialog'>
                <button className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100">
                    {buttonCaption || 'Close'}
                </button>
            </form>
        </dialog>,
        document.getElementById('modal-root')
    );

}