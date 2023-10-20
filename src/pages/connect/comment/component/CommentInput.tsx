import { getUserInfo } from '@/repository/profile.repository';
import { Typography } from '@material-tailwind/react';
import { useEffect, useRef, useState } from 'react';

interface CirclePeopleData {
  id: string;
  name: string;
  avatar: string;
  tag: string;
  type: string;
}

interface form {
  content_text: string;
  media_urls: string[];
}

interface props {
  form: form;
  handleFormChange: any;
  showDropdown: boolean;
  dropDownData: CirclePeopleData[] | [];
  setSelectedValue: any;
  setIsLoading: any;
}

interface UserData {
  name: string;
  seedsTag: string;
  email: string;
  pin: string;
  avatar: string;
  bio: string;
  birthDate: string;
  phone: string;
  _pin: string;
}

const CommentInput: React.FC<props> = ({
  form,
  handleFormChange,
  showDropdown,
  dropDownData,
  setSelectedValue,
  setIsLoading
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await getUserInfo();
        setUserInfo(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, []);

  useEffect(() => {
    if (textAreaRef.current !== null && showDropdown) {
      const rect = textAreaRef.current.getBoundingClientRect();
      const { selectionStart } = textAreaRef.current;
      const textBeforeCaret = textAreaRef.current.value.substring(
        0,
        selectionStart
      );
      const textLines = textBeforeCaret.split('\n');
      const lastLine = textLines[textLines.length - 1];
      const lineHeight = 20;
      setPosition({
        top: rect.top + lineHeight * textLines.length,
        left: rect.left + lastLine.length * 5
      });
    }
  }, [showDropdown, form.content_text]);

  return (
    <div className="mb-4">
      <div className="flex justify-start gap-4 h-fit">
        <img
          alt="bg-avatar-sm"
          src={userInfo?.avatar}
          className="h-[48px] w-[48px] rounded-full object-cover"
        />
        <div className="flex h-full w-full items-center">
          <textarea
            name="content_text"
            ref={textAreaRef}
            id="circle-post"
            onChange={handleFormChange}
            value={form.content_text}
            className="w-[100%] h-fit focus:outline-none bg-transparent font-poppins placeholder:font-poppins placeholder:text-neutral-medium"
            placeholder={'Reply...'}
          ></textarea>
        </div>
      </div>
      {showDropdown && (
        <div
          className="absolute shadow-lg border-x border-b border-black/20 bg-white pb-2 rounded-b-xl max-h-[300px] overflow-auto"
          style={{ left: position.left }}
        >
          {dropDownData !== undefined && dropDownData.length > 0 ? (
            dropDownData.map((el: CirclePeopleData, i: number): any => {
              return (
                <div
                  className="min-w-[250px] max-w-[300px] my-2 flex justify-start gap-4 px-2 cursor-pointer hover:bg-black/10"
                  key={el.id}
                  onClick={(): void => {
                    if (el.type === 'circle') {
                      setSelectedValue(el.name);
                    } else {
                      setSelectedValue(el.tag);
                    }
                  }}
                >
                  <div className="flex flex-col justify-center">
                    <img
                      src={el.avatar}
                      alt={`image ${el.name}`}
                      className="rounded-full h-[48px] w-[48px] object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Typography className="text-lg text-black font-poppins font-medium">
                      {el.type === 'assets' ? el.tag : el.name}
                    </Typography>
                    <Typography className="font-poppins text-neutral-medium text-base">
                      {el.type === 'user'
                        ? `@${el.tag}`
                        : el.type === 'assets'
                        ? el.name
                        : el.type}
                    </Typography>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="min-w-[250px] max-w-[300px] flex justify-center">
              <Typography className="text-base font-poppins text-black">
                Please write at least 3 char
              </Typography>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentInput;
