import Image from 'next/image';
import { GIFV2, galleryV2 } from 'public/assets/circle';

interface props {
  setPages: any;
  setMedia: any;
}
const UniqueInputComment: React.FC<props> = ({ setPages, setMedia }) => {
  const handlePages = (page: string): any => {
    return setPages(page);
  };
  const handleGallery = (): any => {
    document.getElementById('MediaUpload')?.click();
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

  return (
    <div className="flex justify-between pb-10">
      <input
        type="file"
        id="MediaUpload"
        onChange={handleImage}
        className="hidden"
        accept="image/jpg,image/jpeg,image/png,video/mp4"
      />
      <div className="flex gap-2">
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
              src={GIFV2}
              className="h-6 w-6 object-cover"
            />
          </button>
        </div>
        {/* gallery */}
        <div className="flex flex-col">
          <button type="button" onClick={handleGallery} className="p-2">
            <Image
              alt="unique_post"
              src={galleryV2}
              className="h-6 w-6 object-cover"
            />
          </button>
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

export default UniqueInputComment;
