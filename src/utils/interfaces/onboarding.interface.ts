export interface OnboardQuestionI {
    data: QuestionData[]
    metadata: Metadata
  }
  
  export interface QuestionData {
    question_number: number
    question: string
    options: Option[]
  }
  
  export interface Option {
    header: string
    body: string
    image: string
  }
  
  export interface Metadata {
    total: number
    current_page: number
    limit: number
    total_page: number
  }
  