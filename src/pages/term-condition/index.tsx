import CAccordion from '@/components/CAccordion';
import Container from '@/components/Container';
import { useTranslation } from 'react-i18next';
import id from '../../../public/locales/id';
import TermsConditions from './TermsConditions';

export default function Login(): React.ReactElement {
  const { t } = useTranslation();
  return (
    <div>
      <Container>
        <p className="font-bold text-4xl">Legal</p>
        <div>
          {Object.keys(id.termAndCondition)
            ?.filter((k, i) => i > 1)
            .map((key, idx) => (
              <CAccordion
                key={key}
                title={t(`termAndCondition.${key}.title`)}
                description={<TermsConditions />}
              />
            ))}
        </div>
      </Container>
    </div>
  );
}
