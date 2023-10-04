'use client';
import Modal from '@/components/ui/modal/Modal';
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
import { PDFViewer } from 'public/assets/circle';
import { useState } from 'react';
import ImageCarousel from './CarouselImage';
import PollingView from './PollingView';

interface props {
  dataPost: any;
}
const PostSection: React.FC<props> = ({ dataPost }) => {
  const [docModal, setDocModal]: any = useState<boolean>(false);

  function formatDate(inputDateString: any): string {
    const date = new Date(inputDateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  function formatTime(inputDateString: any): string {
    const date = new Date(inputDateString);
    date.setUTCHours(date.getUTCHours() + 7);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    // const seconds = date.getUTCSeconds().toString().padStart(2, '0');

    let ampm = 'AM';
    if (hours >= 12) {
      ampm = 'PM';
      if (hours > 12) hours -= 12;
    }
    if (hours === 0) hours = 12;
    return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  }

  const words = dataPost.content_text.split(' ');
  const media: string[] = [];
  const document: string[] = [];
  const voice: string[] = [];
  function categorizeURL(url: string[]): any {
    const documentExtensions = ['pdf'];
    const voiceExtension: string[] = ['mp3'];

    return url?.map((el: string) => {
      const urlParts = el.split('.');

      const extension = urlParts[urlParts.length - 1].toLowerCase();

      if (voiceExtension.includes(extension)) {
        voice.push(el);
      } else if (!documentExtensions.includes(extension)) {
        media.push(el);
      } else {
        document.push(el);
      }
      return <></>;
    });
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
                    {formatTime(dataPost.created_at)}
                  </Typography>
                </div>
              </div>
            </div>

            {categorizeURL(dataPost.media_urls)}
            {voice.length > 0 && (
              <audio controls>
                <source
                  src={voice[0]}
                  type="audio/wav"
                  className="w-full mb-4"
                />
                Your browser does not support the audio element.
              </audio>
            )}
            {document.length > 0 && (
              <div className="flex justify-start md:pl-0 pl-14 mb-4">
                <div className="flex flex-col">
                  <div
                    className="flex justify-start cursor-pointer"
                    onClick={() => {
                      setDocModal(true);
                    }}
                  >
                    <Image
                      src={PDFViewer}
                      alt="pdf"
                      className="w-[100px] h-[100px]"
                    />
                  </div>
                </div>
                {docModal === true && (
                  <Modal
                    onClose={() => {
                      setDocModal(false);
                    }}
                    modalClasses="z-30 animate-slide-down fixed left-[100px] widthPDF h-fit text-center rounded-3xl shadow-[0 2px 8px rgba(0, 0, 0, 0.25)] bg-transparent"
                  >
                    <embed
                      src={document[0]}
                      type="application/pdf"
                      className="widthPDF h-screen"
                    />
                    <button
                      className="z-50 fixed text-white top-3 -right-14"
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
                )}
              </div>
            )}
            {media.length > 0 && <ImageCarousel images={media} />}

            <div className="flex">
              {words.map((el: string, i: number) => {
                el += '\xa0';
                return el.startsWith('#') ? (
                  <>
                    <Typography key={`${i} + ${el}  + 'hashtags'`}>
                      <h1 className="text-[#5E44FF]">{el}</h1>
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography key={`${i} + ${el} + 'normal text'`}>
                      {el}
                    </Typography>
                  </>
                );
              })}
            </div>

            {dataPost.pollings?.length > 0 && (
              <PollingView
                data={dataPost.pollings}
                totalVote={dataPost.total_polling}
                pollingDate={dataPost.polling_date}
              />
            )}
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-1 md:gap-5">
              <div className="flex items-center gap-1 pr-2">
                <Image
                  src={ArrowUp.src}
                  alt={ArrowUp.alt}
                  width={20}
                  height={20}
                />
                <Typography className="text-[#50E6AF] text-sm">
                  +{dataPost.total_upvote}
                </Typography>
              </div>
              <div className="flex items-center gap-1 pr-2">
                <Image
                  src={ArrowDown.src}
                  alt={ArrowDown.alt}
                  width={20}
                  height={20}
                />
                <Typography className="text-[#c94343] text-sm">
                  -{dataPost.total_downvote}
                </Typography>
              </div>
              <div className="flex items-center gap-1 pr-2">
                <Image
                  src={ChatBubble.src}
                  alt={ChatBubble.alt}
                  width={20}
                  height={20}
                />
                <Typography>{dataPost.total_comment}</Typography>
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
