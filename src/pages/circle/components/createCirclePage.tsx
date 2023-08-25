import CCard from '@/components/CCard';
import { freeCircle, premiumCircle } from '@/constants/assets/icons';
import { getHashtag } from '@/repository/hashtag';
import LanguageContext from '@/store/language/language-context';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Input,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CreatableSelect from 'react-select/creatable';
import ModalMembershipType from './modalMembershipType';

interface HashtagInterface {
  value: string;
  label: string;
}

const initialFilterHashtags = {
  page: 1,
  limit: 200,
  search: ''
};

interface OptionType {
  value: string;
  label: string;
}

const customStyles = {
  multiValue: (base: any, state: any) => ({
    ...base,
    backgroundColor: '#3AC4A0',
    color: 'white',
    borderRadius: '4px'
  }),
  multiValueLabel: (base: any, state: any) => ({
    ...base,
    color: 'white'
  }),
  input: (base: any, state: any) => ({
    ...base,
    border: 'none'
  }),
  placeholder: (base: any, state: any) => ({
    ...base,
    marginLeft: '4px'
  })
};

const formatOptionLabel = ({ label }: { label: string }): any => {
  return <div style={{ display: 'flex', alignItems: 'center' }}># {label}</div>;
};

const CreateCirclePage = ({
  formRequest,
  changeStep,
  change,
  uploadImage,
  changeHashtag,
  error
}: any): JSX.Element => {
  const [hashtags, setHashtag] = useState<HashtagInterface[]>();
  const [openModalMembership, setOpenModalMembership] = useState(false);
  const [isAgree, setIsAgree] = useState();
  const { t } = useTranslation();
  const languageCtx = useContext(LanguageContext);

  const handleOpenModalMembership = (): void => {
    setOpenModalMembership(!openModalMembership);
  };

  const handleCheckBox = (event: any): void => {
    const target = event.target;
    const value = target.checked;

    setIsAgree(value);
  };

  const fetchHashtags = async (): Promise<void> => {
    try {
      getHashtag(initialFilterHashtags)
        .then(res => {
          const mappedOptions: OptionType[] = res.data.map((item: any) => ({
            value: item.id,
            label: item.name
          }));

          setHashtag(mappedOptions);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error: any) {
      console.error('Error fetching circle data:', error.message);
    }
  };

  useEffect(() => {
    fetchHashtags()
      .then()
      .catch(() => {});
  }, []);

  return (
    <div>
      {formRequest !== undefined && (
        <>
          <ModalMembershipType
            openModal={openModalMembership}
            handleOpenModal={handleOpenModalMembership}
            change={change}
            formRequest={formRequest}
          />
          <form>
            <div className="mb-4">
              <h6 className="mb-4 text-center text-lg font-poppins font-semibold">
                {t('circle.create.title')}
              </h6>
            </div>
            <div className="flex items-center justify-center rounded-xl md:mx-8 lg:mx-20 xl:mx-[13rem]">
              <label className="relative w-full h-44">
                <Image
                  height={0}
                  width={0}
                  src={formRequest?.cover}
                  alt="Preview"
                  sizes="100vw"
                  className="object-cover w-full h-full bg-[#DCFCE4]"
                />
                <input
                  type="file"
                  accept="image/*"
                  name="cover"
                  onChange={uploadImage}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
              </label>
            </div>
            <div className="absolute z-10 flex items-center justify-center top-52 left-[43%] xl:left-[46%]">
              <label className="relative rounded-full w-24 h-24 overflow-hidden">
                <Image
                  height={0}
                  width={0}
                  sizes="100vw"
                  src={formRequest?.avatar}
                  alt="Preview"
                  className="object-cover w-full h-full bg-[#DCFCE4]"
                />
                <input
                  type="file"
                  accept="image/*"
                  name="avatar"
                  onChange={uploadImage}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
              </label>
            </div>
            <CCard className="p-9 border-none shadow-none bg-white md:mx-8 lg:mx-20 xl:mx-[13rem]">
              <div className="mb-10 pt-10 bg-white">
                <div className="mb-8">
                  <label className="font-semibold text-base text-[#262626]">
                    {t('circle.create.name.label')}
                  </label>
                  <Input
                    variant="static"
                    color="green"
                    name="name"
                    onChange={change}
                    value={formRequest?.name}
                    placeholder={
                      languageCtx.language === 'EN'
                        ? 'Circle Name'
                        : 'Nama Circle'
                    }
                  />
                  {error.name !== null ? (
                    <Typography color="red" className="text-xs mt-2">
                      {error.name}
                    </Typography>
                  ) : null}
                </div>

                <div className="mb-8">
                  <label className="font-semibold text-base text-[#262626]">
                    {t('circle.create.hashtag.label')}
                  </label>
                  <CreatableSelect
                    isMulti
                    onChange={changeHashtag}
                    options={hashtags}
                    // value={formRequest.hashtags}
                    styles={customStyles}
                    formatOptionLabel={formatOptionLabel}
                    placeholder="#"
                  />
                  {error.hashtags !== null ? (
                    <Typography color="red" className="text-xs mt-2">
                      {error.hashtags}
                    </Typography>
                  ) : null}
                </div>

                <div className="mb-8">
                  <label className="font-semibold text-base text-[#262626]">
                    {t('circle.create.description.label')}
                  </label>
                  <Input
                    variant="static"
                    color="green"
                    name="description"
                    className="w-full"
                    onChange={change}
                    value={formRequest.description}
                    placeholder={
                      languageCtx.language === 'EN'
                        ? 'Type Description'
                        : 'Tuliskan Deskripsi'
                    }
                  />
                  {error.description !== null ? (
                    <Typography color="red" className="text-xs mt-2">
                      {error.description}
                    </Typography>
                  ) : null}
                </div>

                <div className="mb-8">
                  <label className="font-semibold text-base text-[#262626]">
                    {t('circle.create.rules.label')}
                  </label>
                  <Input
                    variant="static"
                    color="green"
                    name="description_rules"
                    onChange={change}
                    value={formRequest.description_rules}
                    placeholder={
                      languageCtx.language === 'EN'
                        ? 'Type rules'
                        : 'Tuliskan Peraturan'
                    }
                  />
                  {error.description_rules !== null ? (
                    <Typography color="red" className="text-xs mt-2">
                      {error.description_rules}
                    </Typography>
                  ) : null}
                </div>

                <Card color="white" shadow={false} className="w-full border-2">
                  <CardBody className="p-3 inline-block h-auto">
                    <div className="flex flex-row">
                      {formRequest.membership_type === 'free' ? (
                        <>
                          <Avatar
                            size="md"
                            variant="circular"
                            src={freeCircle.src}
                            alt="tania andrew"
                          />

                          <div className="flex w-full ml-5 flex-col gap-0.5">
                            <Typography className="font-semibold text-base text-[#262626]">
                              Free
                            </Typography>
                            <Typography className="font-normal text-sm text-[#7C7C7C]">
                              Create an Investment Circle easily and for free
                            </Typography>
                          </div>
                        </>
                      ) : formRequest.membership_type === 'premium' ? (
                        <>
                          <Avatar
                            size="md"
                            variant="circular"
                            src={premiumCircle.src}
                            alt="tania andrew"
                          />

                          <div className="flex w-full ml-5 flex-col gap-0.5">
                            <Typography className="font-semibold text-base text-[#262626]">
                              Premium
                            </Typography>
                            <Typography className="font-normal text-sm text-[#7C7C7C]">
                              Create a Premium Circle for various benefits
                            </Typography>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex w-full ml-5 flex-col gap-0.5">
                            <Typography className="font-semibold text-base text-[#262626]">
                              {t('circle.create.type.label')}
                            </Typography>
                            <Typography className="font-normal text-sm text-[#7C7C7C]">
                              {t('circle.create.type.placeholder')}
                            </Typography>
                          </div>
                        </>
                      )}
                      <div className="items-end">
                        <Button
                          className="text-md font-normal bg-white text-black rounded-full shadow-none"
                          onClick={handleOpenModalMembership}
                        >
                          {'>'}
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                {error.membership_type !== null ? (
                  <Typography color="red" className="text-xs mt-2">
                    {error.membership_type}
                  </Typography>
                ) : null}
              </div>
              <div className="text-center mx-8 pb-2">
                <input
                  type="checkbox"
                  name="tickBox"
                  className="mr-3"
                  value={isAgree}
                  defaultChecked={false}
                  onChange={handleCheckBox}
                  id="customCheck2"
                />
                <label
                  htmlFor="customCheck2"
                  className="font-normal text-xs text-[#262626]"
                >
                  I agree with the
                </label>
                <a
                  onClick={() => changeStep('TnC')}
                  className="font-normal text-xs underline ml-1 text-[#3C49D6]"
                >
                  Terms and Conditions
                </a>
                <Button
                  className="w-full bg-seeds-button-green mt-10 rounded-full capitalize"
                  onClick={() =>
                    changeStep(
                      formRequest.membership_type === 'free'
                        ? 'membership'
                        : 'premium_choice'
                    )
                  }
                >
                  Continue
                </Button>
              </div>
            </CCard>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateCirclePage;
