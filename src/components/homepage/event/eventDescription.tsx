import { MDXProvider } from '@mdx-js/react';
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import React, { useEffect, useState } from 'react';

interface EventDescriptionProps {
  description: string;
}

const components = {
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p style={{ marginBottom: '20px' }} {...props} />,
};

const convertNewlinesAndBrsToBreaks = (text: string): string => {
  return text.replace(/<br>/g, '<br />').replace(/\n/g, '\n\n');
};

export const EventDescription: React.FC<EventDescriptionProps> = ({ description }) => {
  const [mdxContent, setMdxContent] = useState<MDXRemoteSerializeResult | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (description !== undefined) {
        const convertedDescription = convertNewlinesAndBrsToBreaks(description);
        const mdxSource = await serialize(convertedDescription);
        setMdxContent(mdxSource);
      }
    };

    void fetchData();
  }, [description]);

  return (
    <div className="text-[#7C7C7C] mt-4">
      {mdxContent != null ? (
        <MDXProvider components={components}>
          <MDXRemote {...mdxContent} />
        </MDXProvider>
      ) : null}
    </div>
  );
};
