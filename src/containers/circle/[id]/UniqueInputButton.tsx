import gallery from '@/assets/circle-page/gallery.svg';
import gif from '@/assets/circle-page/gif.svg';
import pdf from '@/assets/circle-page/pdf.svg';
import pie from '@/assets/circle-page/pie.svg';
import poll from '@/assets/circle-page/poll.svg';
import talk from '@/assets/circle-page/talk.svg';
import Image from 'next/image';

interface props {
  setPages: any;
  setMedia: any;
  openPieModal: any;
  setDocument: any;
  setErrorMessage: any;
  setIsError: any;
}
const UniqueInputButton: React.FC<props> = ({
  setPages,
  setMedia,
  openPieModal,
  setDocument,
  setErrorMessage,
  setIsError
}) => {
  const handlePages = (page: string): any => {
    return setPages(page);
  };
  const handleGallery = (): any => {
    document.getElementById('MediaUpload')?.click();
  };

  const handleDocument = (): any => {
    document.getElementById('dokumenFile')?.click();
  };

  const handleImage = (event: any): any => {
    const fileMedia = event.target.files[0];
    const fileMediaEle = event.target;

    if (fileMedia?.type?.includes('video') === true) {
      const validation =
        fileMedia?.type !== 'video/mp4' && fileMedia?.type !== 'video/mov';
      const maxFileMediaSize = 20;
      const sizeFileOnMB: any = parseFloat(
        (fileMedia?.size / 1024 / 1024).toFixed(20)
      );
      if (validation) {
        fileMediaEle.value = null;
        setIsError(true);
        setErrorMessage(
          'You can only insert image in JPG, JPEG, PNG, .HEIC, .HEIF. format.'
        );
        return new Error(
          'You can only insert image in JPG, JPEG, PNG, .HEIC, .HEIF. format.'
        );
      }
      if (sizeFileOnMB > maxFileMediaSize) {
        fileMediaEle.value = null;
        setIsError(true);
        setErrorMessage('Your image is exceeding the 5MB size limit');
        return new Error('Your image is exceeding the 5MB size limit');
      } else {
        return setMedia(fileMedia);
      }
    }
    const validation =
      fileMedia?.type !== 'image/jpg' &&
      fileMedia?.type !== 'image/jpeg' &&
      fileMedia?.type !== 'image/heic' &&
      fileMedia?.type !== 'image/heif' &&
      fileMedia?.type !== 'image/png';
    const maxFileMediaSize = 5;
    const sizeFileOnMB: any = parseFloat(
      (fileMedia?.size / 1024 / 1024).toFixed(20)
    );

    if (validation) {
      fileMediaEle.value = null;
      setIsError(true);
      setErrorMessage(
        'You can only insert image in JPG, JPEG, PNG, .HEIC, .HEIF. format.'
      );
      return new Error(
        'You can only insert image in JPG, JPEG, PNG, .HEIC, .HEIF. format.'
      );
    }
    if (sizeFileOnMB > maxFileMediaSize) {
      fileMediaEle.value = null;
      setIsError(true);
      setErrorMessage('Your image is exceeding the 5MB size limit');
      return new Error('Your image is exceeding the 5MB size limit');
    } else {
      return setMedia(fileMedia);
    }
  };

  const handlePDF = (event: any): any => {
    const fileMedia = event.target.files[0];
    return setDocument(fileMedia);
  };

  return (
    <div className="flex justify-between pb-10 border-t border-neutral-ultrasoft">
      <input
        type="file"
        id="MediaUpload"
        onChange={handleImage}
        className="hidden"
        accept="image/jpg,image/jpeg,image/png,video/mp4,video/mov"
      />
      <div className="flex gap-[18px]">
        {/* gallery */}
        <div className="flex flex-col">
          <button type="button" onClick={handleGallery} className="p-2">
            <Image
              alt="unique_post"
              src={gallery}
              className="h-5 w-5 object-cover"
            />
          </button>
          <h1 className="font-poppins font-semibold text-xs text-center">
            Gallery
          </h1>
        </div>
        {/* GIF */}
        <div className="flex flex-col">
          <button
            type="button"
            onClick={() => {
              handlePages('gif');
            }}
            className="p-2"
          >
            <Image
              alt="unique_post"
              src={gif}
              className="h-5 w-5 object-cover"
            />
          </button>
          <h1 className="font-poppins font-semibold text-xs text-center">
            GIF
          </h1>
        </div>
        {/* Poll */}
        <div className="flex flex-col">
          <button
            type="button"
            className="p-2"
            onClick={() => {
              handlePages('poll');
            }}
          >
            <Image
              alt="unique_post"
              src={poll}
              className="h-5 w-5 object-cover"
            />
          </button>
          <h1 className="font-poppins font-semibold text-xs text-center">
            Poll
          </h1>
        </div>
        {/* Pie */}
        <div className="flex flex-col">
          <button
            type="button"
            className="p-2"
            onClick={() => {
              handlePages('pie');
              openPieModal();
            }}
          >
            <Image
              alt="unique_post"
              src={pie}
              className="h-5 w-5 object-cover"
            />
          </button>
          <h1 className="font-poppins font-semibold text-xs text-center">
            Pie
          </h1>
        </div>
        {/* Voice */}
        <div className="flex flex-col">
          <button
            type="button"
            onClick={() => {
              handlePages('talk');
            }}
            className="p-2"
          >
            <Image
              alt="unique_post"
              src={talk}
              className="h-5 w-5 object-cover"
            />
          </button>
          <h1 className="font-poppins font-semibold text-xs text-center">
            Talk
          </h1>
        </div>
        {/* PDF */}
        <div className="flex flex-col">
          <button type="button" onClick={handleDocument} className="p-2">
            <Image
              alt="unique_post"
              src={pdf}
              className="h-5 w-5 object-cover"
            />
            <input
              type="file"
              id="dokumenFile"
              onChange={handlePDF}
              className="hidden"
              accept=".pdf"
            />
          </button>
          <h1 className="font-poppins font-semibold text-xs text-center">
            PDF
          </h1>
        </div>
      </div>
      {/* post button */}
      <div className="flex items-center">
        <button
          type="submit"
          className="flex justify-center py-2 items-center rounded-full px-6 text-white font-semibold font-poppins h-fit bg-seeds-button-green"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default UniqueInputButton;
