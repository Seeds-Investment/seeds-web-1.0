export default {
  greeting: 'Hello, {{name}}',
  errorMessage: {
    invalidEmail: 'Invalid email format',
    requiredEmail: 'Email is required',
    invalidPhoneNumber: 'Phone number only accept 1-9',
    requiredPhoneNumber: 'Phone is required',
    requiredPassword: 'Password cannot be empty',
    requiredRePassword: 'Confirm Password cannot be empty',
    invalidPassword: 'Please read the password requirement below',
    unmatchPassword: 'Passwords must match'
  },
  forgot: {
    phoneNumber:
      'Please enter your phone number. We will send you a message via WhatsApp',
    email: 'Please enter your email. We will send you a message via Email',
    method: {
      email: 'Forgot password via email',
      phoneNumber: 'Forgot password via phone number',
      whatsapp: 'Another way? Send via Whatsapp',
      sms: 'Another way? Send via SMS'
    },
    otp: {
      sms: 'Your OTP code has been sent on your SMS. Please check your SMS.',
      whatsapp: 'Please enter the OTP Code that we sent to your WhatsApp.',
      resend: 'Resend OTP'
    }
  },
  input: {
    placeholder: {
      email: 'Please enter your email',
      phoneNumber: 'Please enter your phone number',
      successMessage:
        'Congratulations! The new password has been successfully created.',
      successTitle: 'Success!'
    },
    type: {
      email: 'Email',
      password: 'Password',
      phoneNumber: 'Phone Number'
    }
  },
  button: {
    next: 'Continue'
  },
  authPage: {
    welcoming: 'Welcome to Seeds',
    description: 'Start and expand your investment journey with friends!',
    agreement: 'By clicking Register you agree with Seeds',
    tnC: ' Terms & Conditions',
    guest: 'Enter as a Guest',
    login: 'Login',
    register: 'Register',
    phoneNumber: 'Phone Number',
    password: 'Password',
    keepMeLoggedIn: 'Keep me logged in',
    forgotPassword: 'Forgot Password'
  },
  validation: {
    phoneNumberEmpty:
      'Phone number is required, please enter your phone number!',
    wrongPhoneNumber:
      'The phone number you entered is incorrect. Please try again',
    passwordEmpty: 'The password is required, please enter your password!',
    wrongPassword: 'The password is incorrect'
  },
  or: 'or'
};
