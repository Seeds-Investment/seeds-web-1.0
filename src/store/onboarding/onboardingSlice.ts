import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AnswerOption {
  header: string;
  body: string;
  image: string;
}

export interface OnboardingAnswer {
  question: string;
  answer: AnswerOption[];
}

interface OnboardingState {
  responses: OnboardingAnswer[];
}

const initialState: OnboardingState = {
  responses: []
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setOnboardingResponses: (state, action: PayloadAction<OnboardingAnswer[]>) => {
      state.responses = action.payload;
    },
    resetOnboardingResponses: (state) => {
      state.responses = [];
    }
  }
});

export const { setOnboardingResponses, resetOnboardingResponses } = onboardingSlice.actions;
export default onboardingSlice.reducer;
