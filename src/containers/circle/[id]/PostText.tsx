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
  privacy: string;
  media_urls: string[];
}

interface props {
  form: form;
  handleFormChange: any;
  showDropdown: boolean;
  dropDownData?: CirclePeopleData[] | [];
  setSelectedValue: any;
}

const CirclePostInputText: React.FC<props> = ({
  form,
  handleFormChange,
  showDropdown,
  dropDownData,
  setSelectedValue
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
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
    <div className="pl-16 mb-[60px]">
      <textarea
        name="content_text"
        ref={textAreaRef}
        id="circle-post"
        onChange={handleFormChange}
        value={form.content_text}
        className="w-[100%] h-12 focus:outline-none bg-transparent font-poppins"
        placeholder={
          'What do you want to disscuss?\nUse @ to tag user, @ to tag circle, # to add hashtags user, $ to tag assets'
        }
      ></textarea>
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

export default CirclePostInputText;
