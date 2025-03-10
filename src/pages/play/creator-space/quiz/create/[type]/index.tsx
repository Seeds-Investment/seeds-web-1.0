import CCard from '@/components/CCard';
import SeedsButton from '@/components/ui/button/SeedsButton';
import CInputMultiSelect from '@/components/ui/input/CInputCheckBox';
import CInputDatePicker from '@/components/ui/input/CInputDate';
import CInputFile from '@/components/ui/input/CInputIFile';
import CInputSelect from '@/components/ui/input/CInputSelect';
import CInputText from '@/components/ui/input/CInputText';
import CTextArea from '@/components/ui/input/CInputTextArea';
import DynamicPrizeInput from '@/components/ui/input/creator-quiz/CInputGroupQuiz';
import UseCreateQuizCreator from '@/hooks/plays/GameDecentralize/quiz/create/useCreateQuizCreator';
import { useRouter } from 'next/router';
import { FormProvider } from 'react-hook-form';
const CreateCreatorQuiz: React.FC = () => {
  const router = useRouter();
  const { methods, prizeType, handlePrizeTypeChange } = UseCreateQuizCreator();

  const type = router.query.type;
  return (
    <CCard className="mb-[8rem]">
      <div className="p-6 flex flex-col">
        <FormProvider {...methods}>
          <form
            onSubmit={async event => {
              event.preventDefault(); // 🔹 Cegah page reload
              await methods.handleSubmit(data => {
                console.log('Submitted Data:', data);
                // 🔹 Kirim data ke API atau lakukan aksi lain
              })();
            }}
            className="grid sm:grid-cols-2 grid-cols-1 gap-6"
          >
            <div className="sm:col-span-2 col">
              <CInputFile
                accept="image/png, image/jpeg"
                height="260px"
                placeholderText="Add Cover"
              />
            </div>
            <CInputMultiSelect
              label="Choose a Categorie"
              name="categorie"
              isAllbutton={true}
              options={[
                { label: 'Categorie 1', value: 'categorie1' },
                { label: 'Categorie 2', value: 'categorie2' },
                { label: 'Categorie 3', value: 'categorie3' },
                { label: 'Categorie 4', value: 'categorie4' }
              ]}
              control={methods.control}
            />
            <CInputText
              placeholder="Enter your quiz title"
              label="Quiz Title"
            />
            <CInputSelect
              label="Choose a Categorie"
              placeholder="Select a categorie"
              name="kate"
              options={[
                { label: 'Categorie 1', value: 'categorie1' },
                { label: 'Categorie 2', value: 'categorie2' },
                { label: 'Categorie 3', value: 'categorie3' },
                { label: 'Categorie 4', value: 'categorie4' }
              ]}
              control={methods.control}
            />
            <CInputDatePicker
              onSubmit={() => {}}
              minDateMode="today"
              label="Registeration Time"
              isRange={false}
            />
            <CInputDatePicker
              onSubmit={() => {}}
              minDateMode="today"
              label="Quiz Period"
            />
            <CInputSelect
              label="Prize Type"
              placeholder="Select prize type"
              name="prize_type"
              options={[
                { label: 'Link', value: 'link' },
                { label: 'Cash', value: 'cash' }
              ]}
              onChange={handlePrizeTypeChange}
              control={methods.control}
            />
            {prizeType !== null && prizeType === 'link' ? (
              <div className="sm:col-span-2">
                <DynamicPrizeInput
                  name="prizes"
                  label="Prize"
                  isImage={true} // Bisa diubah menjadi false jika tidak ingin upload gambar
                  maxItems={5} // Maksimal jumlah input
                  disabledAdd={true} // Bisa diubah ke true jika ingin menonaktifkan tombol tambah
                />
              </div>
            ) : prizeType === 'cash' ? (
              <div className="sm:col-span-2">
                {' '}
                <DynamicPrizeInput
                  name="prizes"
                  label="Prize"
                  typeInput="number"
                  isImage={false} // Bisa diubah menjadi false jika tidak ingin upload gambar
                  maxItems={5} // Maksimal jumlah input
                  disabledAdd={false} // Bisa diubah ke true jika ingin menonaktifkan tombol tambah
                />
              </div>
            ) : (
              <></>
            )}
            <div className="sm:col-span-2 ">
              <CTextArea
                label="Term & Condition"
                placeholder="Enter your term & condition"
                rows={6} // Bisa diubah sesuai kebutuhan
              />
            </div>
            <div className="sm:col-span-2">
              <SeedsButton className="py-3" onSubmit={() => {}}>
                Create Quiz
              </SeedsButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </CCard>
  );
};

export default CreateCreatorQuiz;
