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
}
const UniqueInputButton: React.FC<props> = ({
  setPages,
  setMedia,
  openPieModal,
  setDocument
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
      return setMedia(fileMedia);
    }
    const validation =
      fileMedia?.type !== 'image/jpg' &&
      fileMedia?.type !== 'image/jpeg' &&
      fileMedia?.type !== 'image/png';
    const maxFileMediaSize = 5;
    const sizeFileOnMB: any = parseFloat(
      (fileMedia?.size / 1024 / 1024).toFixed(20)
    );
    if (sizeFileOnMB > maxFileMediaSize && !validation) {
      fileMediaEle.value = null;
      return new Error(
        'Foto yang anda Upload melebihi batas maksimal Upload (5 Megabyte)'
      );
    } else {
      return setMedia(fileMedia);
    }
  };

  const handlePDF = (event: any): any => {
    const fileMedia = event.target.files[0];
    return setDocument(fileMedia);
  };
  return (
    <div className="flex justify-between pb-10">
      <input
        type="file"
        id="MediaUpload"
        onChange={handleImage}
        className="hidden"
        accept="image/jpg,image/jpeg,image/png,video/mp4"
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
      <div className="flex justify-end h-full">
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
