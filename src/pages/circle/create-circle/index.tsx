import CardGradient from '@/components/ui/card/CardGradient';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import withAuth from '@/helpers/withAuth';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import { createCircle } from '@/repository/circle.repository';
import { uploadCloud } from '@/repository/storage';
import { useState } from 'react';
import CircleMembershipFeePage from '../components/circleMembershipFeePage';
import CirclePremiumChoicePage from '../components/circlePremiumChoicePage';
import CreateCirclePage from '../components/createCirclePage';
import MembershipPage from '../components/membershipPage';
import SuccessPage from '../components/successPage';
import TermConditionPage from '../components/termConditionPage';

interface FormRequestInterface {
  name: string;
  avatar: string;
  cover: string;
  description: string;
  description_rules: string;
  type: string;
  premium_fee: number;
  memberships: any[];
  hashtags: any[];
  membership_type: string;
}

const initialFormRequest = {
  name: '',
  avatar: '',
  cover: '',
  description: '',
  description_rules: '',
  type: 'free',
  premium_fee: 0,
  memberships: [],
  hashtags: [],
  membership_type: ''
};

const CreateCircle = (): React.ReactElement => {
  const [formRequest, setFormRequest] =
    useState<FormRequestInterface>(initialFormRequest);
  const [step, setStep] = useState('');
  const [isLoadingSubmit, setIsloadingSubmit] = useState(false);
  const width = useWindowInnerWidth();

  const handleUploadImage = (event: any): void => {
    const target = event.target;
    const name = target.name;
    const files = target.files;

    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('type', 'OTHER_URL');

    uploadCloud(formData)
      .then(res => {
        setFormRequest((prevForm: any) => ({
          ...prevForm,
          [name]: res.data.path
        }));
      })
      .catch(err => {
        console.log('ini error = ', err);
      });
  };

  const handleChangeValue = (event: any): void => {
    const target = event.target;
    let value = target.value;
    const name = target.name;

    if (name === 'premium_fee') {
      value = parseInt(value);
    }

    if (name === 'memberships') {
      setFormRequest(prevState => ({
        ...prevState,
        [name]: [...formRequest.memberships, value]
      }));
    } else {
      setFormRequest(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleChangeValueHashtag = (value: any[]): void => {
    const mappedOptions: any[] = value.map((item: any) => ({
      id: item.value,
      name: item.label
    }));

    setFormRequest(prevState => ({
      ...prevState,
      hashtags: mappedOptions
    }));
  };

  const handleChangeStep = (value: string): void => {
    setStep(value);
  };

  const removeMemberships = (index: number): void => {
    const newData = [...formRequest.memberships];
    newData.splice(index, 1);

    setFormRequest(prevState => ({
      ...prevState,
      memberships: newData
    }));
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      setIsloadingSubmit(true);
      createCircle(formRequest)
        .then(res => {
          console.log('response post = ', res);
          handleChangeStep('success');
          setIsloadingSubmit(false);
        })
        .catch(err => {
          setIsloadingSubmit(false);
          console.log(err);
        });
    } catch (error: any) {
      setIsloadingSubmit(false);
      console.error('Error fetching circle data:', error.message);
    }
  };

  return (
    <PageGradient
      defaultGradient
      className="relative overflow-hidden flex flex-col items-center sm:p-0 sm:pb-16 w-full"
    >
      <CardGradient
        defaultGradient
        className={`relative overflow-hidden w-full sm:w-[90%] sm:rounded-[18px] sm:min-h-[36rem] bg-white sm:px-20 py-8 ${
          width !== undefined && width < 370
            ? 'min-h-[38rem]'
            : width !== undefined && width < 400
            ? 'min-h-[45rem]'
            : width !== undefined && width < 415
            ? 'min-h-[48rem]'
            : ''
        } bg-white`}
      >
        {step === 'TnC' ? (
          <TermConditionPage changeStep={handleChangeStep} />
        ) : step === 'membership' ? (
          <MembershipPage
            formRequest={formRequest}
            changeStep={handleChangeStep}
            change={handleChangeValue}
            removeMember={removeMemberships}
            submit={handleSubmit}
            isLoadingSubmit={isLoadingSubmit}
          />
        ) : step === 'premium_choice' ? (
          <CirclePremiumChoicePage
            change={handleChangeValue}
            formRequest={formRequest}
            changeStep={handleChangeStep}
          />
        ) : step === 'membership_fee' ? (
          <CircleMembershipFeePage
            formRequest={formRequest}
            changeStep={handleChangeStep}
            change={handleChangeValue}
          />
        ) : step === 'success' ? (
          <SuccessPage />
        ) : (
          <CreateCirclePage
            formRequest={formRequest}
            changeStep={handleChangeStep}
            change={handleChangeValue}
            uploadImage={handleUploadImage}
            changeHashtag={handleChangeValueHashtag}
          />
        )}
      </CardGradient>
    </PageGradient>
  );
};

export default withAuth(CreateCircle);
