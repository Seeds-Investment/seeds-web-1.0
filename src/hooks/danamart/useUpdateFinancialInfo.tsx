import * as yup from 'yup';

const useUpdateFinancialInfo = (): any => {
  const schema = yup.object().shape({
    dm_pen_06001: yup.string()
  });

  return <div>useUpdateFinancialInfo</div>;
};

export default useUpdateFinancialInfo;
