interface form {
  content_text: string;
  privacy: string;
  media_urls: string[];
}

interface props {
  form: form;
  handleFormChange: any;
}

const CirclePostInputText: React.FC<props> = ({ form, handleFormChange }) => {
  return (
    <div className="pl-16 mb-[60px]">
      <textarea
        name="content_text"
        id="circle-post"
        onChange={handleFormChange}
        value={form.content_text}
        className="w-[100%] h-12 focus:outline-none bg-transparent font-poppins"
        placeholder={
          'What do you want to disscuss?\nUse @ to tag user, @ to tag circle, # to add hashtags user, $ to tag assets'
        }
      ></textarea>
    </div>
  );
};

export default CirclePostInputText;
