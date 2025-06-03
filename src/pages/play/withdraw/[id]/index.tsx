import { NoData } from '@/assets/danamart';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import withAuth from '@/helpers/withAuth';
import { postCloud } from '@/repository/cloud.repository';
import { getWithdrawQuestions, postWithdrawAnswer } from '@/repository/earning.repository';
import LanguageContext from '@/store/language/language-context';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';

interface WithdrawQuestion {
  question: string;
  type: 'FREETEXT' | 'IMAGE';
	max_size: number;
}

const WithdrawQuiz: React.FC = () => {
	const { t } = useTranslation();
	const router = useRouter();
	const id = Array.isArray(router?.query?.id) ? router?.query?.id[0] : router?.query?.id;
	const playType = Array.isArray(router?.query?.playType) ? router?.query?.playType[0] : router?.query?.playType;
	const languageCtx = useContext(LanguageContext);
	const language = languageCtx?.language === 'ID' ? 'id' : 'en';

	const [isLoading, setIsLoading] = useState(false);
	const [questions, setQuestions] = useState<WithdrawQuestion[]>([]);
	const [answers, setAnswers] = useState<Record<string, string>>({});
	const [sizeWarnings, setSizeWarnings] = useState<Record<string, string>>({});

	const fetchQuestionData = async (id: string, playType: string, language: string): Promise<void> => {
		try {
			setIsLoading(true);
			const response = await getWithdrawQuestions(id, playType, language);
			setQuestions(response?.questions ?? []);
		} catch (error: any) {
			if (error?.response?.data?.message === 'sql: no rows in result set') {
				toast.error(t('earning.withdrawQuestion.text1'));
			} else {
				toast.error(`Error fetching questions: ${error?.response?.data?.message as string}`);
			}
		} finally {
			setIsLoading(false);
		}
	};
    
	useEffect(() => {
		if (
			id !== '' &&
			id !== undefined &&
			playType !== '' &&
			playType !== undefined &&
			language !== undefined
		) {
			void fetchQuestionData(id, playType, language);
		}
	}, [id, playType, language]);
    
	useEffect(() => {
		if (Object?.keys(sizeWarnings)?.length > 0) {
			const timeout = setTimeout(() => {
				setSizeWarnings({});
			}, 4000);
	
			return () => { clearTimeout(timeout); };
		}
	}, [sizeWarnings]);	

	const handleTextChange = (question: string, value: string): void => {
		setAnswers(prev => ({ ...prev, [question]: value }));
	};
	
	const handleImageUpload = async (question: string, file: File): Promise<void> => {
		try {
			const { path: cloudUrl } = await postCloud({ file, type: 'OTHER_URL' });
			setAnswers(prev => ({ ...prev, [question]: cloudUrl }));
		} catch {
			toast.error(t('earning.withdrawQuestion.text2'));
		}
	};

	const handleImageDelete = (question: string): void => {
		setAnswers(prev => {
			const { [question]: _, ...rest } = prev;
			return rest;
		});
	};
	
	const body = {
		questions: questions?.map(q => ({
			question: q?.question,
			answer: answers[q?.question] ?? ''
		}))
	};
	
	const handleSubmit = async (): Promise<void> => {
		const unanswered = body?.questions?.filter(q => {
			return q?.answer === "";
		});
	
		if (unanswered?.length > 0) {
			toast.error(t('earning.withdrawQuestion.text3'));
			return;
		}
	
		if ((id === null) || (playType === null)) return;
		if (typeof id !== 'string' || typeof playType !== 'string') return;
	
		try {
			const response = await postWithdrawAnswer(id, playType, body);
			if (response?.status === 'pending') {
				toast.success(t('earning.withdrawQuestion.text4'));
				setTimeout(() => {
					void router.push('/play')
				}, 3000);
			}
		} catch (error: any) {
			if (error?.response?.data?.message === 'reward has already been submitted') {
				toast.error(t('earning.withdrawQuestion.text5'))
			} else {
				toast.error(`Failed to submit answers: ${error?.response?.data?.message as string}`);
			}
		}
	};
	
	return (
		<>
			<PageGradient defaultGradient className="w-full h-auto bg-white p-5 rounded-2xl mb-4">
				<h2 className="text-xl font-bold mb-4">{t('earning.withdrawQuestion.text6')}</h2>

				{isLoading ? (
					<div className="w-full flex justify-center h-fit my-8">
						<div className="h-[60px]">
							<div className="animate-spinner w-16 h-16 border-8 border-gray-200 border-t-seeds-button-green rounded-full" />
						</div>
					</div>
				) : questions?.length === 0 ? (
						<div className='flex flex-col justify-center items-center gap-4 py-16'>
							<Image
								alt=""
								src={NoData}
								className="w-[200px] md:w-[250px] mx-auto"
							/>
							<Typography className='w-[80%] md:w-full text-center font-poppins text-lg text-[#262626]'>
								{t('earning.withdrawQuestion.text1')}
							</Typography>
							<Typography
								onClick={async() => { await router.push('/play') }}
								className='w-[80%] md:w-[200px] rounded-full text-center font-poppins text-lg bg-seeds-button-green text-white mt-8 py-2 font-medium cursor-pointer'
							>
								{t('earning.withdrawQuestion.text9')}
							</Typography>
						</div>
				) : (
					<div className="space-y-6">
						{questions?.map((q: any, index: number) => (
							<div key={index} className="flex flex-col">
								<p className="font-medium font-poppins">{q?.question}</p>

								{q?.type === 'FREETEXT' && (
									<div className="border rounded px-3 py-2 mt-1">
										<input
											type="text"
											className="w-full outline-none font-poppins"
											value={(answers[q?.question]?.length > 0 ? answers[q?.question] : '')}
											onChange={(e) => { handleTextChange(q.question, e.target.value); }}
											placeholder={`${t('earning.withdrawQuestion.text7')}`}
										/>
									</div>
								)}

								{q?.type === 'IMAGE' && (
									<div className="border rounded px-3 py-2 mt-1 font-poppins">
										<input
											type="file"
											accept="image/*"
											onChange={(e) => {
												const file = e.target.files?.[0];
												if (file != null) {
													const maxSizeKB = Number(q?.max_size ?? 0);
													const fileSizeKB = file?.size / 1024;
													
													const formattedMaxSize = maxSizeKB >= 1024
														? `${(maxSizeKB / 1024).toFixed(0)}MB`
														: `${maxSizeKB}KB`;
													
													if (fileSizeKB > maxSizeKB) {
														toast.error(`${t('earning.withdrawQuestion.text10')} ${formattedMaxSize}!`);
														e.target.value = '';
														setSizeWarnings(prev => ({
															...prev,
															[q?.question]: `${t('earning.withdrawQuestion.text11')} ${formattedMaxSize}!`,
														}));
														return;
													}																									

													setSizeWarnings(prev => ({
														...prev,
														[q?.question]: '',
													}));

													void handleImageUpload(q?.question, file);
												}
											}}
										/>

										{(answers[q?.question]?.length > 0) && (
											<div className="flex justify-between items-center">
												<img
													src={answers[q?.question]}
													alt="Uploaded"
													className="mt-2 w-full max-w-[280px] rounded"
												/>
												<IoMdClose
													size={20}
													onClick={() => {
														handleImageDelete(q?.question);
														setSizeWarnings(prev => ({
															...prev,
															[q?.question]: '',
														}));
													}}
													className="text-[#DA2D1F] cursor-pointer hover:scale-125 duration-200 shrink-0"
												/>
											</div>
										)}

										{
											(sizeWarnings[q?.question]?.length > 0) ? (
												<Typography className="text-md text-red-600 mt-1 font-medium font-poppins">
													{sizeWarnings[q?.question]}
												</Typography>
											)
											: (
												<Typography className="text-md text-seeds-button-green font-medium font-poppins mt-2">
													{t('earning.withdrawQuestion.text12')} {Number(q?.max_size) >= 1024 
														? `${(Number(q?.max_size) / 1024)?.toFixed(0)}MB.` 
														: `${Number(q?.max_size)}KB.`}
												</Typography>
											)
										}
									</div>
								)}

							</div>
						))}
					</div>
				)}
			</PageGradient>
			{
				questions?.length > 0 &&
					<div className="w-full h-auto bg-white p-5 rounded-2xl mb-16">
						<Button
							onClick={handleSubmit}
							className={`w-full font-semibold font-poppins rounded-full capitalize bg-seeds-button-green text-md text-white`}
						>
							{t('earning.withdrawQuestion.text8')}
						</Button>
					</div>
			}
		</>
	);
};

export default withAuth(WithdrawQuiz);
