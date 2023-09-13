'use client';
import {
  ArrowDown,
  ArrowUp,
  Bookmark,
  ChatBubble,
  Dot,
  Pin,
  ShareBlack,
  TripleDots
} from '@/constants/assets/icons';
import { Sprout } from '@/constants/assets/images';
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import ImageCarousel from './CarouselImage';
import PieCirclePost from './PieCirclePost';
interface props {
  dataPost: any;
}
const PostSection: React.FC<props> = ({ dataPost }) => {
  function formatDate(inputDateString: any): string {
    const date = new Date(inputDateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString();

    return `${day}/${month}/${year}`;
  }
  const words = dataPost.content_text.split(' ');
  function categorizeURL(url: string[]): any {
    // const imageExtensions = [
    //   'jpg',
    //   'jpeg',
    //   'png',
    //   'jfif',
    //   'pjpeg',
    //   'pjp',
    //   'gif',
    //   'svg',
    //   'heic',
    //   'heif'
    // ];
    const documentExtensions = ['pdf'];
    const media: string[] = [];
    const document: string[] = [];

    url?.map((el: string) => {
      const urlParts = el.split('.');
      const extension = urlParts[urlParts.length - 1].toLowerCase();
      if (!documentExtensions.includes(extension)) {
        media.push(el);
      } else {
        document.push(el);
      }
      return <></>;
    });
    if (media.length > 0) {
      return <ImageCarousel images={media} />;
    } else if (document.length > 0) {
      return <></>;
    }
  }
  return (
    <div className="w-full mb-10 pb-10 border-b border-neutral-soft">
      <div className="flex gap-4 md:gap-8">
        <div className="hidden md:flex">
          <div>
            <Image
              src={dataPost.issuer_data.avatar}
              alt="AVATAR"
              width={48}
              height={48}
              className=" w-15 h-15 aspect-square rounded-full outline outline-black"
            />
          </div>
        </div>
        <div className="w-full">
          <div className="mb-4">
            <div className="flex gap-5">
              <div className="md:hidden flex">
                <div>
                  <Image
                    src={dataPost.issuer_data.avatar}
                    alt="AVATAR"
                    width={48}
                    height={48}
                    className=" w-11 h-11  rounded-full outline outline-black"
                  />
                </div>
              </div>

              <div className="w-full">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <Typography className="font-bold md:text-lg">
                      @{dataPost.issuer_data.seeds_tag}
                    </Typography>
                    <Image
                      src={Sprout.src}
                      alt={Sprout.alt}
                      width={20}
                      height={20}
                    />
                  </div>
                  <Image
                    src={TripleDots.src}
                    alt={TripleDots.alt}
                    height={8}
                    width={8}
                    className="w-auto h-auto"
                  />
                </div>
                <div className="flex gap-1 items-center text-gray-500">
                  <Typography className="text-xs md:text-sm">
                    {formatDate(dataPost.created_at)}
                  </Typography>
                  <Image src={Dot.src} alt={Dot.alt} width={5} height={5} />
                  <Typography className="text-xs md:text-sm">
                    12.39 PM
                  </Typography>
                </div>
              </div>
            </div>

            {categorizeURL(dataPost.media_urls)}
            <div className="flex">
              {words.map((el: string, i: number) => {
                el += '\xa0';
                return el.startsWith('#') ? (
                  <>
                    <Typography key={i}>
                      <h1 className="text-[#5E44FF]">{el}</h1>
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography key={i}>{el}</Typography>
                  </>
                );
              })}
            </div>
          </div>
          <PieCirclePost data={dataPost} />
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-1 md:gap-5">
              <div className="flex items-center gap-1">
                <Image
                  src={ArrowUp.src}
                  alt={ArrowUp.alt}
                  width={20}
                  height={20}
                />
                <Typography className="text-[#50E6AF] text-sm">+32</Typography>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src={ArrowDown.src}
                  alt={ArrowDown.alt}
                  width={20}
                  height={20}
                />
                <Typography className="text-[#c94343] text-sm">-32</Typography>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src={ChatBubble.src}
                  alt={ChatBubble.alt}
                  width={20}
                  height={20}
                />
                <Typography>32</Typography>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src={ShareBlack.src}
                  alt={ShareBlack.alt}
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex items-center gap-1">
                <Image src={Pin.src} alt={Pin.alt} width={20} height={20} />
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src={Bookmark.src}
                  alt={Bookmark.alt}
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostSection;
