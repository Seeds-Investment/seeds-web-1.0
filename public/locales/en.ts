// eslint-disable-next-line import/no-anonymous-default-export
export default {
  second: 'second',
  seconds: 'seconds',
  greeting: 'Hello, {{name}}',
  successPopup: {
    title: {
      general: 'Success!'
    },
    subtitle: {
      general: 'Congratulations!',
      email: 'Congratulations, you have successfully changed your email.',
      whatsapp:
        'Congratulations, you have successfully changed your telephone number.',
      sms: 'Congratulations, you have successfully changed your telephone number.'
    }
  },
  generalError: {
    title: { general: 'Failed!' },
    subtitle: {
      general:
        'Oops, your email failed to change. Please try again after a while!',
      conflict: 'Already exist!',
      conflictEmail: 'Requested email already exist!'
    }
  },
  errorMessage: {
    requiredSeedsTag: 'Seeds Tag is required, please enter your Seeds Tag!',
    requiredName: 'Name is required, please enter your name!',
    invalidEmail:
      'Please enter your email address in format yourname@example.com',
    requiredEmail: 'Email is required, please enter your email!',
    invalidPhoneNumber: 'Phone number only accept 1-9',
    requiredPhoneNumber:
      'Phone number is required, please enter your phone number!',
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
    },
    createNewPassword: {
      1: 'Create New Password',
      2: 'Please create a secure password including the following criteria below',
      3: 'Enter Password',
      4: 'Please enter your password',
      5: 'Confirm Password',
      6: 'Please confirm your password',
      7: 'Password Must Contain:',
      8: 'Special characters',
      9: 'Uppercase and lowecase',
      10: 'Numbers',
      11: 'Minimum length of 8 characters'
    },
    success: {
      title: 'Success!',
      text: 'Congratulations! The new password has been successfully created.'
    }
  },
  changeEmailAddress: {
    title: 'Change Email Address'
  },
  changeTelephoneNumber: {
    title: 'Change Telephone Number'
  },
  inputPin: {
    title: {
      enterPin: 'Enter Your PIN',
      createNewPin: 'Create New PIN',
      confirmNewPin: 'Confirm New PIN'
    }
  },
  sendOTP: {
    title: 'OTP Code',
    countdown: 'seconds',
    resendEmail: "didn't get email? "
  },
  editProfile: {
    title: 'Edit Profile',
    editImage: 'Edit Image',
    linkedAccount: 'Linked Account',
    changePin: 'Change PIN',
    telephoneNumber: 'Telephone Number'
  },
  input: {
    label: {
      name: 'Name',
      dateOfBirth: 'Date of Birth',
      email: 'Your New Email',
      phone: 'Your New Telephone Number'
    },
    placeholder: {
      name: 'Enter Your Name',
      dateOfBirth: 'Enter Your Birth Date',
      email: 'example@mail.com',
      phoneNumber: 'Please enter your phone number',
      successMessage:
        'Congratulations! The new password has been successfully created.',
      successTitle: 'Success!',
      seedsTag: '@seedstag',
      referralCode: 'Referral Code'
    },
    error: {
      required: {
        email: 'Email is required, please enter your email!'
      },
      format: {
        email: 'Please enter your email address in format yourname@example.com'
      }
    },
    phone: 'Phone Number',
    email: 'Email',
    birthDate: 'Birth Date',
    type: {
      email: 'Email',
      password: 'Input Password',
      rePassword: 'Confirm Password',
      phoneNumber: 'Phone Number',
      name: 'Name',
      seedsTag: 'Seeds Tag',
      referralCode: 'Referral Code'
    }
  },
  button: {
    change: 'Change',
    BTN_REGISTER: 'Register',
    BTN_LOGIN: 'Login',
    BTN_GUEST: 'Enter As Guest',
    next: 'Continue',
    joinNow: 'Join Now',
    label: {
      change: 'Change',
      confirm: 'Confirm',
      tryAgain: 'Try Again',
      next: 'Next',
      done: 'Done',
      deleteAccount: 'Delete Account'
    }
  },
  faq: {
    title: 'Frequently Asked Questions',
    subTitle: 'Find answers to your questions about Seeds',
    faq: {
      title: {
        1: 'What is Seed?',
        2: 'What investment products are available at Seeds?',
        3: 'How can I access seeds?',
        4: 'How safe is it to invest in Seeds?',
        5: 'I want to ask more about Seeds products and services'
      },
      desc: {
        1: 'Seeds is the first social investing platform in Indonesia that gives users access to US stocks and cryptocurrencies (many more to come!).',
        2: 'Seeds is the first social investing platform in Indonesia that gives users access to US stocks and cryptocurrencies (many more to come!).',
        3: 'Seeds is the first social investing platform in Indonesia that gives users access to US stocks and cryptocurrencies (many more to come!).',
        4: 'Seeds is the first social investing platform in Indonesia that gives users access to US stocks and cryptocurrencies (many more to come!).',
        5: 'Seeds is the first social investing platform in Indonesia that gives users access to US stocks and cryptocurrencies (many more to come!).'
      }
    },
    footerText: 'Haven’t found the answer yet?',
    button: 'Contact Us',
    settings: 'Settings',
    disclosure: {
      title: 'Disclosure of Infromations User',
      lastUpdated: 'Last Updated : ',
      date: ' 26 April 2022',
      overview:
        'Attention : Users are required to read terms and conditions “Seeds T&C”  before using Seeds. Terms and conditions can be changed without prior notice.To register and use Seeds app, it means the user has read thoroughly and agreed to these terms & conditions which will be conducted as the user agreement. Seeds reserve the right to stop or restrict user access without prior notice. Users are suggested to visit Seeds app regularly to have the most updated change within the terms and conditions.'
    },
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated: ',
      date: '26 April 2022',
      overview: {
        title: [
          'Collection and Use of Personal Data',
          'Retention of Personal Information',
          'Personal Data may be collected by Seeds',
          'Personal data protection',
          'Personal Data Storage and Access',
          'Cookies',
          'Secret and Security'
        ],
        desc: [
          'Personal data is information that is directly or indirectly connected to you, identified or identifiable from that information, or from other information and information. For transactions and deals with Seeds, you may be required to provide your personal data from time to time. Seeds and third-party service providers may share Personal data with one another and use personal data consistent with this Privacy Policy. They may also combine it with other information to provide and improve the products and services of Seeds.',
          'Your Personal Information will only be held for as long as it is necessary to fulfill the purpose for which it was collected, or for as long as such retention is required or authorized by Applicable Law. We shall cease to retain Personal Information, or remove the means by which the Personal Information can be associated with you as an individual, as soon as it is reasonable to assume that the purpose for which that Personal Information was collected is no longer being served by retention of Personal Information and retention is no longer necessary for legal or business purposes.Please note that there is still the possibility that some of your Personal Information might be retained by the other party or the User in some manner (such as, by means of screen capture). Information relayed through communications between Users and Third Party, made other than through the use of the Application (such as by telephone, mobile messaging or other modes of communication) may also be retained by some means. We do not authorize the retention of Personal Information by such means and we have no responsibility to you for the same. To the fullest extent permitted by Applicable Law, we shall not be liable for any such retention of your Personal Information. You agree to indemnify, defend and release us, our officers, directors, employees, agents, suppliers, contractors and Affiliates from and against any and all claims, losses, liabilities, expenses, damages and costs (including but not limited to legal costs and expenses on a full indemnity basis) resulting directly or indirectly from any unauthorized retention of your Personal Information.',
          '',
          'Seeds take necessary precautions administratively and technically, to protect your personal information against loss, theft, misuse and unauthorized access, disclosure, use, alteration, or destruction.',
          'Seeds will do its best to help you ensure that the information you receive is accurate, complete, and updated. We will retain your personal data for the periods necessary to meet the different purposes set forth in this Privacy Policy unless retention time is longer permitted or required by law. You can help ensure that your contact and reference information is accurate, complete and kept up-to-date by logging in on the Seeds app. For other personal information, we make a good faith effort to grant access to you so that you may ask us to repair the data if Seeds app does not have to be kept by law or for legitimate business purposes. We may refuse to process irrational requests made repeatedly, requiring excessive technical effort, threatening the privacy of others, it is completely impractical or if access is not otherwise required by it by local law. Requests for access, correction or deletion can be made through the Seeds application.',
          'To help Seeds improve our services and products provide a special experience for users on their site using “cookies”. Cookies are small text files stored on your computer/smartphone that give us information about your site usage online to help us customize your user experience and make our site more user-friendly.',
          'We have applied technology and policies consistent with the prevailing rules of Indonesia with the objective of protecting your privacy from unauthorized access and improper use and we will update these steps as new technology develops as necessary.'
        ]
      }
    },
    socialMediaGuide: {
      title: 'Social Media Guidelines',
      lastUpdated: 'Last Updated: ',
      date: '26 April 2022',
      overview:
        'Seeds are built to bring people to meet each other and talk around investing, sharing ideas and investing together. Our social & community guidelines are meant to explain what is and isn’t allowed on Seeds, and ensure that everyone has a good experience. If you come across a message that appears to break these rules, please report it to us. We may take a number of steps, including issuing a warning, removing the content, or removing the accounts and/or servers responsible. \n In order to meet the goals of this community, it’s important for members to feel like they are in a safe place that is populated by people with shared interests. As such, we request that you read and adhere to the guidelines that follow.',
      content: {
        rules: {
          1: {
            title: 'Guidelines',
            items: {
              1: 'Treat others online as you would treat them in real life',
              2: 'Be tolerant towards other’s viewpoints; respectfully disagree when opinions do not align',
              3: 'Respect the privacy and personal information of other alumni. Communicate with courtesy and respect'
            }
          },
          2: {
            title: 'Please do not',
            items: {
              1: 'Make personal attacks on other community members',
              2: 'Use defamatory remarks or make false statements against others',
              3: 'Post prejudiced comments or profanity\n',
              4: 'Bully or make inflammatory remarks to other community members',
              5: 'Organize, participate in, or encourage harassment of others. Disagreements happen and are normal, but continuous, repetitive, or severe negative comments may cross the line into harassment and are not tolerated at Seeds.',
              6: 'Organize, promote, or coordinate servers around hate speech. It’s unacceptable to attack a person or a community based on attributes such as their race, ethnicity, national origin, sex, gender, sexual orientation, religious affiliation, or disabilities.',
              7: 'Make threats of violence or threaten to harm others. This includes indirect threats, as well as sharing or threatening to share someone’s private personal information.',
              8: 'Sexualize minors in any way. This includes sharing content or links which depict minors in a pornographic, sexually suggestive, or violent manner, and includes illustrated or digitally altered pornography that depicts minors (such as lolicon, station, or cub). We will report illegal content to the relevant authority.',
              9: 'Share sexually explicit content of yourselves or other people, or share or promote sharing of intimate imagery (also known as revenge porn) in an attempt to shame or degrade someone.',
              10: 'Share content that glorifies or promotes suicide or self-harm, including any encouragement to others to cut themselves, or embrace eating disorders such as anorexia or bulimia.',
              11: 'Share images of sadistic gore or animal cruelty.',
              12: 'Use Seeds for the organization, promotion, or support of violent extremism.',
              13: 'Evade user blocks or server bans. - send unwanted, repeated friend requests or messages, especially after they’ve made it clear they don’t want to talk to you anymore. - try to hide your identity in an attempt to contact someone who has blocked you, or otherwise circumvent the tools we have which enable users to protect themselves.',
              14: 'Deceive and impersonate: - misrepresent yourself by using the Seeds logo or any brands within your avatar and posts.',
              15: 'Solicit: - post, share or display any video content on our platform that includes third-party advertising without our prior consent.'
            }
          },
          3: {
            title: 'Here are some rules for our trading platform',
            items: {
              1: 'Never post false information: Never post misleading information about your account and/or your trading skills.',
              2: 'Never post Investment advice: Never offer any direct investment advice, or anything that may be interpreted as investment advice. - call for direct action (such as “invest in”).',
              3: 'Do not engage in Market manipulation: - make false promises or entice others to trade/invest or attempt to create volatile market situations.',
              4: 'Do not attempt to manipulate other users: - provide instructions on specific trades or on how to trade.',
              5: 'Do not spread fake news: - share/spread misinformation, unverifiable information and rumors.',
              6: 'Do not engage in spamming: - use collusive and manipulation practices and avoid transferring misinformation in order to distort the financial markets, or posting the same information multiple times on various posts.'
            }
          },
          4: {
            title: 'Consequences',
            items: {
              1: 'We will take action when we see someone violating these guidelines. Sometimes that just means giving someone a warning; other times it means revoking certain privileges or accounts entirely. We request that all community members report behavior that violates our guidelines to info@seeds.finance.'
            }
          },
          5: {
            title: 'Agreement',
            items: {
              1: 'By logging onto the community and activating your profile, you are considered to be in agreement with the terms and conditions listed above.'
            }
          }
        }
      }
    },
    circleMembership: {
      title: 'Circle Membership',
      lastUpdated: 'Terakhir Diperbarui: ',
      date: '26 April 2022',
      overview:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      content: {
        title: {
          1: 'Owner',
          2: 'User'
        },
        desc: {
          1: 'test desc',
          2: 'test desc'
        }
      }
    }
  },
  termAndCondition: {
    title: 'Terms & Conditions',
    announcement:
      'Attention : Users are required to read terms and conditions “Seeds T&C”  before using Seeds. Terms and conditions can be changed without prior notice.To register and use Seeds app, it means the user has read thoroughly and agreed to these terms & conditions which will be conducted as the user agreement. Seeds reserve the right to stop or restrict user access without prior notice. Users are suggested to visit Seeds app regularly to have the most updated change within the terms and conditions.',
    lastupdate: 'Last Updated: ',
    updatedate: '26 April 2022',
    tnc: {
      title: {
        1: 'General',
        2: 'App Terms of Use',
        3: 'Warranties',
        4: 'Seeds Liability',
        5: 'Indemnity',
        6: 'Licensing',
        7: 'Passing Away of User',
        8: 'Intellectual Property Related Matters',
        9: 'Termination',
        10: 'Miscellaneous'
      },
      desc: {
        1: "To be able to access and utilize the Seed App, users must have an account registered in the Seeds app. Seeds only act as managers and owners of the Seeds site / application. Seeds in this case are providers of distribution facilities for investment products that are displayed in the Seeds site / application, where the product is managed by parties who have collaborated with Seeds and already have a permit to conduct business activities from the relevant government parties. \n  Seeds do not provide any guarantees for the profits that users will get from the results of each investment transaction on products that are available and carried out on the Seeds site / application. By conducting investment transactions through the Seeds site / application as a provider of distribution facilities for investment products, users are consciously willing to take full responsibility for all actions taken, and free seeds, including subsidiaries, affiliations, shareholders, directors, officials, employees fully from all demands, losses, payments or any fees incurred by Seeds or those submitted to Seeds either directly or indirectly, including among others in connection with the implementation or non-implementation of transaction instructions from the user. \n Product recommendations are illustrations of investment products that are distributed through the Seeds site / application, users are consciously and fully responsible for all actions taken, including but not limited to the selection of investment products, time periods, or investment risk levels. User is willing to free Seeds, including subsidiaries company, affiliate, shareholders, directors, commissioners, staff from all charges, claims or disputes, loss, transactions or any kind of fees that are subjected to user or Seeds both directly and indirectly, including but not limited to the cost of legal counsel and case fees, which are related to the implementation or non-implementation of transaction instructions from users. \n Seeds along with the management of investment products in the Seeds site / application are responsible for the smooth transaction process of users including the registration, buy and sell process to be carried out and delivered properly. Users have learned all investment product choices offered through the Seeds site / application, therefore seeds are not responsible for each of these investment products. \n Any information and data received by Seeds through the Seeds site / application will be forwarded to each of the investment product managers chosen by the user. And in this way, the user gives his consent to the Seeds to forward the data collected through the Seeds site / application to the parties who manage the investment product in accordance with the user's choice. \n Thus Seeds has the right to collect, store and / or forward the information and data. As long as it does not conflict with Seeds T&C, every general terms and conditions that apply and are listed on the Seeds site / application (including arrangements related to the amount of service fees / fees) are declared completely, and the user hereby is subject to these terms and conditions. We have the right to, from time to time, make changes, additions and / or modifications to all or part of the contents of Seeds T&C. If you use Seeds continuously after changes, additions and / or modifications to all or part of the contents of Seeds T&C , then it is considered as a form of your approval of the changes, additions and / or modifications. If you do not agree to changes, additions and / or modifications, you are asked to stop accessing and using the Seeds site / application. Users can access and utilize the Seeds site / application after completing all user identity documents in accordance with applicable regulations. \n Users declare that they have read, known, understood, and fully agreed to Seeds T&C. By agreeing to this T&C,user is subject to and bound to Terms and Condition, Privacy Policy, Transaction Terms, Transaction Procedures, and other conditions set by the management of investment products on the Seeds site / application, along with changes or additional provisions if any, for implementation purposes. \n Seeds have the right to refuse an account creation request if: supporting documents of the user's identity are incomplete or incorrect; and users take actions that are not in accordance with the ways required in creating an account based on Seeds T&C. Seeds have the right to limit and stop user access in using the Seeds site / application for investment transactions on investment products displayed on the Seeds site / application at any time with or without prior notice, with reasons, among others, as a result of the system maintenance and repair process, users violate the provisions stated in this Terms & Conditions or other agreements between seeds and users, and other deviations related to the use of investment accounts or investment transactions. Users agree that error or any inaccuracy from the usage of all features in Seeds app is the user's own responsibility and risk. Information conveyed through the Seeds application is not a suggestion, invitation, recommendation, or direction from Seeds to users to buy, sell, or not sell or not buy certain investment products.",

        2: 'Content Ketentuan pengguna aplikasi, add \n to each paragraph so the logic is reusable from the page',
        3: 'Content Kewajiban Seeds',
        4: 'Content Ganti Rugi',
        5: 'Content Lisensi',
        6: 'Content Meninggalnya Pengguna',
        7: 'Content Hal terkait kekayaan intelektual',
        8: 'Content Penghentian',
        9: 'Content aneka ragam'
      }
    },
    privacyPolicy: {
      title: 'Privacy Policy',
      desc: {
        header: 'USER POLICY',
        p1: 'SEEDS are built to bring people to meet each other and talk around investing, sharing ideas and investing together. Our social & community guidelines are meant to explain what is and isn’t allowed on SEEDS, and ensure that everyone has a good experience. If you come across a message that appears to break these rules, please report it to us. We may take a number of steps, including issuing a warning, removing the content, or removing the accounts and/or servers responsible.',
        p2: 'In order to meet the goals of this community, it’s important for members to feel like they are in a safe place that is populated by people with shared interests. As such, we request that you read and adhere to the guidelines that follow.',
        guidelines_title: 'Guidelines',
        guidelines_1:
          'Treat others online as you would treat them in real life.',
        guidelines_2:
          'Be tolerant towards other’s perspective; respectfully disagree when opinions do not align.',
        guidelines_3:
          'Respect the privacy and personal information of other User.',
        guidelines_4: 'Communicate with courtesy and respect',
        prohibit_title: 'Users are strictly prohibit to',
        prohibit_1: 'Make personal attacks on other User.',
        prohibit_2:
          'Use defamatory remarks or make false statements against others',
        prohibit_3: 'Post prejudiced comments or profanity.',
        prohibit_4:
          'Bully or make inflammatory remarks to other community members.',
        prohibit_5:
          'Organize, participate in, or encourage harassment of others. Disagreements happen and are normal, but continuous, repetitive, or severe negative comments may cross the line into harassment and are not tolerated at SEEDS.',
        prohibit_6:
          'Organize, promote, or coordinate servers around hate speech. It’s unacceptable to attack a person or a community based on attributes such as their race, ethnicity, national origin, sex, gender, sexual orientation, religious affiliation, or disabilities.',
        prohibit_7:
          'Make threats of violence or threaten to harm others. This includes indirect threats, as well as sharing or threatening to share someone’s private personal information.',
        prohibit_8:
          'Sexualize minors in any way. This includes sharing content or links which depict minors in a pornographic, sexually suggestive, or violent manner, and includes illustrated or digitally altered pornography that depicts minors (such as lolicon, station, or cub). We will report illegal content to the relevant authority.',
        prohibit_9:
          'Share sexually explicit content of yourselves or other people, or share or promote sharing of intimate imagery (also known as revenge porn) in an attempt to shame or degrade someone.',
        prohibit_10:
          'Share content that glorifies or promotes suicide or self-harm, including any encouragement to others to cut themselves, or embrace eating disorders such as anorexia or bulimia.',
        prohibit_11: 'Share images of sadistic gore or animal cruelty.',
        prohibit_12:
          'Use SEEDS for the organization, promotion, or support of violent extremism.',
        prohibit_13:
          'Evade user blocks or server bans. - send unwanted, repeated friend requests or messages, especially after they’ve made it clear they don’t want to talk to you anymore. - try to hide your identity in an attempt to contact someone who has blocked you, or otherwise circumvent the tools we have which enable users to protect themselves.',
        prohibit_14:
          'Deceive and impersonate: - misrepresent yourself by using the SEEDS logo or any brands within your avatar and posts.',
        prohibit_15:
          'Solicit: - post, share or display any video content on our platform that includes third- party advertising without our prior consent.',
        policy_title: 'Trading Platform Policy',
        policy_1:
          'Never post false information: Never post misleading information about your account and/or your trading skills.',
        policy_2:
          'Never post Investment advice: Never offer any direct investment advice, or anything that may be interpreted as investment advice. - call for direct action (such as “invest in”).',
        policy_3:
          'Do not engage in Market manipulation: - make false promises or entice others to trade/invest or attempt to create volatile market situations',
        policy_4:
          'Do not attempt to manipulate other users: - provide instructions on specific trades or on how to trade.',
        policy_5:
          'Do not spread fake news: - share/spread misinformation, unverifiable information and rumors.',
        policy_6:
          'Do not engage in spamming: - use collusive and manipulation practices and avoid transferring misinformation in order to distort the financial markets, or posting the same information multiple times on various posts.',
        consequences: 'Consequences',
        consequences_desc:
          'We will take action when we see someone violating these guidelines. Sometimes that just means giving someone a warning; other times it means revoking certain privileges or accounts entirely. We request that all community members report behavior that violates our guidelines to info@SEEDS.finance.',
        agreement: 'Agreement',
        agreement_desc:
          'By logging onto the community and activating your profile, you are considered to be in agreement with the terms and conditions listed above.'
      }
    },
    circleMembership: {
      title: 'Circle Membership',
      desc: {
        header_1: 'TERMS OF USE',
        header_2: 'CIRCLE OWNER',
        bold_1: 'Terms',
        bold_2: 'Effective Date',
        bold_3: 'Circle Owner',
        p1: 'This Terms and Condition ("',
        p2: '") is entered into force as of the date you click the “Accept Terms” button, or other equivalent button, indicating your acceptance of these terms (the "',
        p3: '") between PT Benih Investasi Teknologi, a company having its domicile at Apartemen Casablanca unit 17-12 Tower 2 Wing B, Jl. Casablanca Kav.12, Jakarta Selatan 12870 ("',
        p4: '") and the entity agreeing to these terms ("',
        p5: '")',
        service: 'SERVICES',
        service_1:
          'SEEDS provides technology services in form of digital community forums to Users ("Circle" or “Service”) which SEEDS may charge a subscription fee ("Subscription Fee") to its Users.',
        service_2:
          'The first user who creates a Circle (“Circle Owner”) will act as supervisor and administrator of the Circle and has the right to be able to accept, invite and select other Users to join his/her Circle and become Circle Member (”Circle Member”) .',
        blue_1: 'User Policy',
        service_3:
          'Circle Owners and Circle Members may share financial content among them and must comply with the',
        service_4: 'and other Terms & Conditions as determined by SEEDS.',
        service_5:
          'The rights of Circle Owner as stipulated in this Terms is non-exclusive, personal and shall not assignable or transferable. Circle Owner authorization to use the services is contingent on Circle Owner’s continued compliance with these Terms.',
        service_6:
          'SEEDS may from time to time improve or modify the Services or new features to the Services. SEEDS shall entitle to suspend the Services if deemed necessary for an emergency situation to prevent any potential loss or damage related to the systems. Any such suspension will be to the minimum extent and for the shortest duration required to: (i) prevent or terminate the offending use, (ii) prevent or resolve the emergency situation, or (iii) comply with applicable law.',
        responsibility: 'CIRCLE OWNER’S RESPONSIBILITIES',
        responsibility_1:
          'Circle Owner shall be prohibited to; (i) send or store any material that is infringing, obscene, threatening, libelous, or otherwise unlawful or sadistic in nature, (ii) send any material that contains software viruses, worms, trojan horses or other oharmful program; (iii) interfere with or interfere with the integrity or performance of the platform, application, system or the data in it; (iv) gain unauthorized access to the platform, application or related systems or networks.',
        responsibility_2:
          'Owner shall not at any time do, write, upload, post or say anything which damages or which could reasonably be expected to damage the interests or reputation of SEEDS and its affiliation.',
        commision_title: 'FEE AND COMMISSION',
        commision_1:
          'Circle Owner may choose the service features to be provided in his/her Circle and upon the availability of these features, the Circle Owner Circle Members may be charge with subscription fee (“Subscription Fee”) with the amount, procedure and method of payment as stipulated in SEEDS Application. SEEDS may change the amount of Subscription Fee from time to time.',
        commision_2:
          'For ihis/her services in managing the Circle, SEEDS will give commission to the Circle Owner ("Commission") of 20% of the value of the Circle Member Subscription Fee. SEEDS may change the amount of the commission fee from time to time.',
        commision_3:
          'Terms of Payment of the Commission fee is further regulated in SEEDS Application.',
        commision_4:
          'SEEDS shall entitle to deduct Circle Owner’s Income Tax from Commission payment.',
        commision_5:
          'SEEDS may change the terms of payment of  Commission Fee from time to time.',
        protection_title: 'UTILIZATION  AND PROTECTION OF PERSONAL DATA',
        protection_1:
          'Personal data shall means any information about an identified or identifiable living individual recorded in any form.',
        protection_2:
          'SEEDS may request Circle Owner to provide the necessary personal data as required by the functional nature of the service and to process and utilize Circle Owner personal data within the scope of that particular purpose. ',
        protection_3:
          'SEEDS shall take reasonable measures to protect the personal data from unauthorized use or disclosure and from accidental loss, destruction or damage.',
        protection_4:
          'Circle Owner shall ensure the accuracy and completeness to the personal data entry. SEEDS will hold no responsibility to any damage that may occur due to incompleteness, inaccuracy, or unclearness of personal data from Circle Owner.',
        intellectual: 'INTELLECTUAL PROPERTY',
        intellectual_desc:
          'SEEDS shall own and retains all rights, titles, and interests related to the Platform, Application, Services and improvements thereto, together with any tools, materials, guidelines, and instructions provided by SEEDS to Circle Owner, as well as all intellectual property rights, including but not limited to all copyrights, trademarks, patents, rights in databases, and moral rights.',
        limitation: 'LIMITATION OF LIABILITY',
        limitation_desc:
          'SEEDS shall not be liable to Circle Owners, Circle Members and other Third Parties for loss of income or indirect, special, incidental, consequential or punitive damages, that arise in connection with the content uploaded by Circle Owners and/or Circle Member, or as a result of Circle Owner failure to fulfill his/her obligations as stipulated in these Terms.',
        termination: 'IMMEDIATE TERMINATION',
        termination_1:
          'shall be entitled to immediate terminate the Services given to Circle Owner if Circle Owner fail to perform its obligation as stipulated in this Terms.',
        termitation_2:
          'Termination of Service, however it arises, shall not affect or prejudice the accrued rights of Circle Owner as at termination or the continuation of any provision expressly stated to survive, or implicitly surviving, termination.',
        governing_law: 'GOVERNING LAW',
        governing_law_desc:
          'Terms and any dispute or claim arising out of or in connection with it or its subject matter, shall be governed by, and construed in accordance with, the laws of Republic of Indonesia.',
        dispute_settlemet: 'DISPUTE SETTLEMET',
        dispute_settlemet_desc:
          'Dispute arising out of or in connection with this Terms, including any question regarding its existence, validity or termination, shall be referred to and finally resolved by arbitration in Jakarta in accordance with the Arbitration Rules of Badan Arbitrase Nasional Indonesia (BANI) for the time being in force.'
      }
    }
  },
  register: {
    slide: {
      title: {
        1: 'Welcome to Seeds',
        2: 'Create Your Own Circle',
        3: 'Easy Portfolio Analysis',
        4: 'Achieve your Goal!'
      },
      text: {
        1: 'Start and expand your investment journey with friends!',
        2: 'Start a group with people who share your interests & passions',
        3: 'Make it easy for you to gain insights to increase your investment',
        4: 'Get closer to your dream by earning more rewards'
      }
    }
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
  or: 'or',
  registerPage: {
    title: {
      personalInfo: 'Register',
      seedsuser: 'Register',
      createPass: 'Create Your Password',
      chooseAvatar: 'Choose Your Avatar',
      success: 'Success!'
    },
    description: {
      personalInfo: "Let's get to know you",
      seedsuser:
        'Please enter the name and Seeds Tag that will be used on your account',
      createPass:
        'Please create a secure password that include the following criteria below',
      chooseAvatar: 'Create an avatar that describes yourself!',
      success: 'Congratulations, your account has been successfully created'
    },
    nextButton: 'Continue'
  },
  ProfilePage: {
    title: 'My Profile'
  },
  DeleteAccount: {
    title: 'Are you sure to delete this account?',
    description:
      'If you click yes, your account data will be deleted in 30 days',
    confirmButton: 'Yes',
    cancelButton: 'No'
  },
  DeleteReasonAccountPopUp: {
    title: "What's the reason for deleting your account?",
    option1: "I don't like the app",
    option2: "There's too many bugs",
    option3: 'Other, Specify',
    title2: 'Help us to understand the problem'
  },
  ChooseBadge: {
    title: 'Choose Badges',
    description: 'Please choose your badges'
  },
  RemoveLinkedAccount: {
    title: 'Remove your {{provider}} Account from Seeds?',
    description: 'Your account will be disconnected from the Seed',
    removeButton: 'Remove',
    cancelButton: 'Cancel'
  }
};
