import { useEffect, useRef, type ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface BackdropProps {
  onClose: () => void;
  className?: string;
  style?: object;
}

interface ModalOverlayProps {
  children: ReactNode;
  className?: string;
  style?: object;
}

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  modalClasses?: string;
  backdropClasses?: string;
  modalStyle?: object;
  backdropStyle?: object;
}

const backdropDefaultClasses =
  'z-20 fixed top-0 left-0 w-full h-screen bg-black/75';

const modalDefaultClasses =
  'z-30 animate-slide-down fixed sm:left-[50%] top-[50%] left-[5%] sm:ml-[-13.125rem] mt-[-12.35rem] sm:w-[26.25rem] w-[90%] h-fit p-4 text-center rounded-3xl shadow-[0 2px 8px rgba(0, 0, 0, 0.25)] bg-white';

const Backdrop: React.FC<BackdropProps> = ({ className, style, onClose }) => {
  return <div className={className} style={style} onClick={onClose} />;
};

const ModalOverlay: React.FC<ModalOverlayProps> = ({
  className,
  style,
  children
}) => {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

const Modal: React.FC<ModalProps> = ({
  modalClasses,
  backdropClasses,
  modalStyle,
  backdropStyle,
  onClose,
  children
}) => {
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('#portal');
  }, []);

  return ref.current !== null ? (
    <>
      {ReactDOM.createPortal(
        <Backdrop
          onClose={onClose}
          className={backdropClasses ?? backdropDefaultClasses}
          style={backdropStyle}
        />,
        ref.current
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          className={modalClasses ?? modalDefaultClasses}
          style={modalStyle}
        >
          {children}
        </ModalOverlay>,
        ref.current
      )}
    </>
  ) : null;
};

export default Modal;
