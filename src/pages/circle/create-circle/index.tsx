import CardGradient from '@/components/ui/card/CardGradient';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import CirclePremiumChoicePage from '@/containers/circle/create-circle/circlePremiumChoicePage';
import CreateCirclePage from '@/containers/circle/create-circle/createCirclePage';
import MembershipPage from '@/containers/circle/create-circle/membershipPage';
import withAuth from '@/helpers/withAuth';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import { createCircle } from '@/repository/circle.repository';
import { uploadCloud } from '@/repository/storage';
import { useState } from 'react';
import CircleMembershipFeePage from '../../../containers/circle/create-circle/circleMembershipFeePage';
import SuccessPage from '../../../containers/circle/create-circle/successPage';
import TermConditionPage from '../../../containers/circle/create-circle/termConditionPage';

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
  category: string;
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
  membership_type: '',
  category: ''
};

const CreateCircle = (): React.ReactElement => {
  const [formRequest, setFormRequest] =
    useState<FormRequestInterface>(initialFormRequest);
  const [step, setStep] = useState('');
  const [isLoadingSubmit, setIsloadingSubmit] = useState(false);
  const [error, setError] = useState({
    name: '',
    hashtags: '',
    description: '',
    description_rules: '',
    membership_type: '',
    category: ''
  });
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
    setError(prevError => ({
      ...prevError,
      [name]: ''
    }));
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

  const handleChangeValueCategory = (value: string): void => {
    setFormRequest(prevState => ({
      ...prevState,
      category: value
    }));
  };

  const handleChangeStep = (value: string): void => {
    if (value === 'membership' || value === 'premium_choice') {
      if (formRequest.description === '') {
        setError(prevError => ({
          ...prevError,
          description: 'Field is empty'
        }));
      }

      if (formRequest.description_rules === '') {
        setError(prevError => ({
          ...prevError,
          description_rules: 'Field is empty'
        }));
      }

      if (formRequest.membership_type === '') {
        setError(prevError => ({
          ...prevError,
          membership_type: 'Field is empty'
        }));
        return;
      }

      if (formRequest.name === '') {
        setError(prevError => ({
          ...prevError,
          name: 'Field is empty'
        }));
        return;
      }

      if (formRequest.category === '') {
        setError(prevError => ({
          ...prevError,
          category: 'Field is empty'
        }));
        return;
      }
    }

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
            changeCategory={handleChangeValueCategory}
            error={error}
          />
        )}
      </CardGradient>
    </PageGradient>
  );
};

export default withAuth(CreateCircle);
