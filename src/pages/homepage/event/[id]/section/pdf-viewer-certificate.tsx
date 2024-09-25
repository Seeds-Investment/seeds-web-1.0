import Modal from '@/components/ui/modal/Modal';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { toast } from 'react-toastify';

interface props {
  file: File | string;
  preview: boolean
  setPreview: Dispatch<SetStateAction<boolean>>;
}

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PDFViewer: React.FC<props> = ({ file, preview, setPreview }) => {
  const [docModal, setDocModal] = useState<boolean>(false);
  const [showPDF, setShowPDF] = useState<boolean>(false);
  
  useEffect(() => {
    if (preview) {
      setDocModal(true);
    }
    if (!docModal) {
      setPreview(false)
    }
  }, [preview, docModal]);
  
  useEffect(() => {
    setTimeout(() => {
      setShowPDF(true)
    }, 2000)
  }, []);
  
  return (
    <div className="flex flex-col w-full h-full justify-start items-start md:justify-center md:items-center pt-4 md:pt-0 bg-[#DCFCE4] relative">
      {docModal && (
        <>
          <Modal
            onClose={() => {
              setDocModal(false);
            }}
            modalClasses="flex md:hidden z-50 animate-slide-down absolute left-0 right-0 m-auto w-full h-auto text-center rounded-3xl shadow-[0 2px 8px rgba(0, 0, 0, 0.25)]"
          >
            <embed
              src={
                typeof file === 'string' ? file : URL.createObjectURL(file)
              }
              type="application/pdf"
              className="w-full h-screen relative"
            />
            <button
              className="z-50 absolute text-white top-[80px] left-[13px] m-auto shadow-lg hover:scale-110 transition ease-out bg-[#262626] rounded-full"
              onClick={() => {
                setDocModal(false);
              }}
            >
              <svg
                className="h-8 w-8 text-white bg-black/20 rounded-full"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {' '}
                <circle cx="12" cy="12" r="10" />{' '}
                <line x1="15" y1="9" x2="9" y2="15" />{' '}
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </button>
          </Modal>
          <Modal
            onClose={() => {
              setDocModal(false);
            }}
            modalClasses="hidden md:flex z-50 animate-slide-down absolute left-0 right-0 m-auto w-full md:w-[80%] h-auto text-center rounded-3xl shadow-[0 2px 8px rgba(0, 0, 0, 0.25)]"
          >
            <embed
              src={
                typeof file === 'string' ? file : URL.createObjectURL(file)
              }
              type="application/pdf"
              className="widthPDF h-screen relative"
            />
            <button
              className="z-50 absolute text-white top-[80px] right-[40px] bg-[#262626] rounded-full hover:scale-110 transition ease-out"
              onClick={() => {
                setDocModal(false);
              }}
            >
              <svg
                className="h-8 w-8 text-white bg-black/20 rounded-full"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {' '}
                <circle cx="12" cy="12" r="10" />{' '}
                <line x1="15" y1="9" x2="9" y2="15" />{' '}
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </button>
          </Modal>
        </>
      )}
      {
        showPDF ?
          <Document
            file={file}
            onError={(error: any) => {
              toast.error('Error while loading document!', error.message);
            }}
            className='md:hidden w-full h-auto md:w-[80%] flex justify-center items-center text-center'
          >
            {Array.from({ length: 1 }, (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                width={300}
              />
            ))}
          </Document>
          :
          <div className='w-full flex md:hidden justify-center items-center'>
            <div className="w-full flex justify-center items-center h-screen mt-8">
              <div className="h-[60px]">
                <div className="animate-spinner w-16 h-16 border-8 border-gray-200 border-t-seeds-button-green rounded-full" />
              </div>
            </div>
          </div>
      }
      {
        showPDF ?
          <Document
            file={file}
            onError={(error: any) => {
              toast.error('Error while loading document!', error.message);
            }}
            className='hidden md:flex h-auto md:w-[80%] justify-center items-center text-center'
          >
            {Array.from({ length: 1 }, (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            ))}
          </Document>
          :
          <div className='hidden w-full md:flex justify-center items-center'>
            <div className="w-full flex justify-center items-center h-screen mt-8">
              <div className="h-[60px]">
                <div className="animate-spinner w-16 h-16 border-8 border-gray-200 border-t-seeds-button-green rounded-full" />
              </div>
            </div>
          </div>
      }
    </div>
  );
};

export default PDFViewer;
