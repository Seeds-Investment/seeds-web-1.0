import CCard from '@/components/CCard';
import CardGradient from '@/components/ui/card/CardGradient';
import Input from '@/components/ui/input/Input';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import withAuth from '@/helpers/withAuth';
import useWindowInnerWidth from '@/hooks/useWindowInnerWidth';
import { useState } from 'react';

interface FormRequestInterface {
  name: string;
  description: string;
  description_rules: string;
}

const initialFormRequest = {
  name: '',
  description: '',
  description_rules: ''
};

const CreateCircle = (): React.ReactElement => {
  const [formRequest, setFormRequest] =
    useState<FormRequestInterface>(initialFormRequest);
  const width = useWindowInnerWidth();

  const handleChangeValue = (fieldName: string, value: string): void => {
    setFormRequest((prevForm: any) => ({
      ...prevForm,
      [fieldName]: value
    }));
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
        <form>
          <div className="flex mb-4">
            <h6 className="mb-4 text-center text-lg font-poppins font-semibold">
              Create Circle
            </h6>
          </div>
          <CCard className="mt-2 border-none shadow-none rounded-xl bg-white">
            <div className="mb-10 p-4 pt-10 bg-white">
              <Input
                required
                label="Circle Name"
                placeholder="Type circle name"
                extraClasses="mb-14"
                extraInputClasses="md:text-base text-sm"
                props={{
                  value: formRequest.name,
                  onChange: (e: any) => {
                    handleChangeValue('name', e.target.value);
                  }
                }}
              />
              <Input
                required
                label="Hashtag"
                placeholder="#"
                extraClasses="mb-14"
                extraInputClasses="md:text-base text-sm"
              />
              <Input
                required
                label="Description"
                placeholder="Type Description"
                extraClasses="mb-14"
                extraInputClasses="md:text-base text-sm"
                props={{
                  value: formRequest.description,
                  onChange: (e: any) => {
                    handleChangeValue('description', e.target.value);
                  }
                }}
              />
              <Input
                required
                label="Rules"
                placeholder="Type Rules"
                extraClasses="mb-14"
                extraInputClasses="md:text-base text-sm"
                props={{
                  value: formRequest.description_rules,
                  onChange: (e: any) => {
                    handleChangeValue('description_rules', e.target.value);
                  }
                }}
              />
            </div>
          </CCard>
        </form>
      </CardGradient>
    </PageGradient>
  );
};

export default withAuth(CreateCircle);
