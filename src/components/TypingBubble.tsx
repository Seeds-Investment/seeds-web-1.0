import { useEffect, useState } from 'react';

export interface MessageSpan {
  text: string;
  isBold?: boolean;
  newLine?: boolean;
};

interface Props {
  message: MessageSpan[];
};

export default function TypingBubble({ message }: Props): JSX.Element {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [charIndex, setCharIndex] = useState<number>(0);
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const [finalSpans, setFinalSpans] = useState<MessageSpan[]>([]);

  useEffect(() => {
    if (messageIndex >= message.length) return;
  
    const currentSpan = message[messageIndex];
    const fullText = currentSpan.text;
  
    if ((currentSpan.newLine ?? false) || fullText === '') {
      setFinalSpans((prev) => [...prev, currentSpan]);
      setCharIndex(0);
      setDisplayedText('');
      setMessageIndex((prev) => prev + 1);
      return;
    }
  
    const interval = setInterval(() => {
      if (charIndex < fullText.length) {
        setDisplayedText((prev) => prev + fullText[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setFinalSpans((prev) => [...prev, currentSpan]);
        setCharIndex(0);
        setDisplayedText('');
        setMessageIndex((prev) => prev + 1);
        clearInterval(interval);
      }
    }, 40);
  
    return () => { clearInterval(interval); };
  }, [charIndex, messageIndex, message]);  

  const currentSpan =
    messageIndex < message.length ? message[messageIndex] : null;

  return (
    <div className="flex items-start w-full">
      <div className="relative w-full">
        <div className="text-sm font-poppins text-black leading-relaxed">
          {finalSpans?.map((span, i) =>
            (span.newLine ?? false) ? (
              <br key={i} />
            ) : (
              <span
                key={i}
                className={(span.isBold ?? false) ? 'font-semibold' : 'font-normal'}
              >
                {span.text}
              </span>
            )
          )}
          {((currentSpan?.newLine) ?? false) ? (
            <br />
          ) : (
            <span
              className={(currentSpan?.isBold ?? false) ? 'font-semibold' : 'font-normal'}
            >
              {displayedText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
