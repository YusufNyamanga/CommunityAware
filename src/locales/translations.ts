export interface Translations {
  // Header
  umojaAware: string;
  
  // Navigation
  chat: string;
  knowledgeBase: string;
  community: string;
  calculators?: string;
  
  // Chat Interface
  typeYourMessage: string;
  send: string;
  askQuestion: string;
  howCanIHelp: string;
  selectCategory: string;
  apologyProcessing?: string;
  
  // Categories
  labourLaw: string;
  companyFormation: string;
  visaServices: string;
  gracePeriod: string;
  lmra: string;
  sijilat: string;
  generalLegal: string;
  culturalGuidelines: string;
  mentalHealth: string;
  other: string;
  
  // Knowledge Base
  bahrainLegalGuide: string;
  searchKnowledge: string;
  labourLawGuide: string;
  workingHours: string;
  salaryRegulations: string;
  terminationRights: string;
  businessGuide: string;
  companyRegistration: string;
  licenseRequirements: string;
  sijillatProcess: string;
  visaGuide: string;
  residencePermit: string;
  workVisa: string;
  visitorVisa: string;
  culturalGuidelinesGuide: string;
  muslimCountryEtiquette: string;
  decencyLaws: string;
  ramadanGuidelines: string;
  prayerTimes: string;
  dressCode: string;
  publicBehaviour: string;
  mentalHealthGuide: string;
  expatMentalHealth: string;
  counselingServices: string;
  stressManagement: string;
  communitySupport: string;
  emergencyContacts: string;
  
  // Community
  joinCommunity: string;
  whatsappGroup: string;
  telegramChannel: string;
  connectWithUs: string;
  
  // Footer
  disclaimer: string;
  disclaimerText: string;
  cookiesNotice: string;
  acceptCookies: string;
  
  // Welcome message
  welcomeTitle: string;
  welcomeDescription: string;
  
  // Predefined queries
  labourLawQuery: string;
  companyFormationQuery: string;
  visaServicesQuery: string;
  lmraQuery: string;
  culturalGuidelinesQuery: string;
  muslimCountryEtiquetteQuery: string;
  mentalHealthQuery: string;
  expatMentalHealthQuery: string;
  
  // Loading states
  aiThinking: string;
  connectionRetrying: string;
  connectionFallback: string;
  
  // Common
  loading: string;
  error: string;
  tryAgain: string;
  close: string;
  menu: string;
  
  // KnowledgeBase specific
  overview: string;
  knowledgeBaseTitle: string;
  expatriateResidentKnowledgeBase: string;
  expatriateKnowledgeBaseSummary: string;
  hideDetails: string;
  bahrainLabourLaw: string;
  visaImmigration: string;
  housingAccommodation: string;
  healthcareMedical: string;
  bankingFinance: string;
  transportation: string;
  educationSchooling: string;
  showAvailableTopics: string;
  selectCategoryMsg: string;
  source: string;
  leaveBenefits: string;
  wagesPayment: string;
  disputes: string;
  termination: string;
  employment: string;
  overtime: string;
  
  // Schools Directory
  schoolingInfoTitle?: string;
  schoolingOverviewText?: string;
  schoolRegistrationTitle?: string;
  schoolRegistrationText?: string;
  schoolRegistrationItem1?: string;
  schoolRegistrationItem2?: string;
  schoolRegistrationItem3?: string;
  schoolRegistrationItem4?: string;
  schoolRegistrationItem5?: string;
  schoolRegistrationItem6?: string;
  schoolCalendarTitle?: string;
  schoolCalendarText?: string;
  schoolHolidaysTitle?: string;
  schoolHolidayItem1?: string;
  schoolHolidayItem2?: string;
  schoolHolidayItem3?: string;
  familyConsiderationsTitle?: string;
  familyConsiderationItem1?: string;
  familyConsiderationItem2?: string;
  familyConsiderationItem3?: string;
  familyConsiderationItem4?: string;
  familyConsiderationItem5?: string;
  
  // Footer specific
  copyright: string;
  about: string;
  terms: string;
  privacy: string;
}

export const translations: Record<string, Translations> = {
  en: {
    // Header
    umojaAware: "Umoja-Aware",
    
    // Navigation
    chat: "Chat",
    knowledgeBase: "Knowledge Base",
    community: "Community",
    calculators: "Calculators",
    
    // Chat Interface
    typeYourMessage: "Type your message here...",
    send: "Send",
    askQuestion: "Ask a question",
    howCanIHelp: "How can I help you with Bahrain legal matters today?",
    selectCategory: "Select a category (optional)",
    apologyProcessing: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
    
    // Categories
  labourLaw: "Labour Law",
  companyFormation: "Company Formation",
  visaServices: "Visa Services",
  gracePeriod: "Grace Period",
  lmra: "LMRA",
  sijilat: "Sijilat",
  generalLegal: "General Legal",
  culturalGuidelines: "Cultural Guidelines",
  mentalHealth: "Mental Health",
  other: "Other",
    
    // Knowledge Base
  bahrainLegalGuide: "Bahrain Legal Guide",
  searchKnowledge: "Search knowledge base...",
  labourLawGuide: "Labour Law Guide",
  workingHours: "Working Hours & Overtime",
  salaryRegulations: "Salary & Benefits",
  terminationRights: "Termination & Rights",
  businessGuide: "Business Formation Guide",
  companyRegistration: "Company Registration",
  licenseRequirements: "License Requirements",
  sijillatProcess: "Sijillat Registration Process",
  visaGuide: "Visa & Immigration Guide",
  residencePermit: "Residence Permit",
  workVisa: "Work Visa",
  visitorVisa: "Visitor Visa",
  culturalGuidelinesGuide: "Cultural Guidelines & Etiquette",
  muslimCountryEtiquette: "Muslim Country Etiquette",
  decencyLaws: "Decency Laws & Regulations",
  ramadanGuidelines: "Ramadan Guidelines",
  prayerTimes: "Prayer Times & Religious Observances",
  dressCode: "Dress Code & Appearance",
  publicBehaviour: "Public Behaviour & Conduct",
  mentalHealthGuide: "Mental Health Support Guide",
  expatMentalHealth: "Expatriate Mental Health",
  counselingServices: "Counseling & Therapy Services",
  stressManagement: "Stress Management & Coping",
  communitySupport: "Community Support Groups",
  emergencyContacts: "Emergency Mental Health Contacts",
    
    // Community
    joinCommunity: "Join Our Community",
    whatsappGroup: "WhatsApp Group",
    telegramChannel: "Telegram Channel",
    connectWithUs: "Connect with us on social media and stay updated with the latest legal information.",
    
    // Footer
    disclaimer: "Disclaimer",
    disclaimerText: "This tool provides general legal information and should not be considered as professional legal advice. For specific legal matters, please consult with qualified legal professionals.",
    cookiesNotice: "We use cookies to enhance your experience. By continuing to use this site, you agree to our use of cookies.",
    acceptCookies: "Accept Cookies",
    
    // Welcome message
    welcomeTitle: "Welcome to Umoja-Aware",
  welcomeDescription: "Your all-in-one AI assistant for life in Bahrain! Get instant help with legal matters, visa services, company formation, labour law, find schools, use calculators, stay updated with news, and connect with our community. All in multiple languages!",
    
    // Predefined queries
    labourLawQuery: "What are the basic employee rights under Bahrain labour law?",
    companyFormationQuery: "How do I register a new company in Bahrain through Sijilat?",
    visaServicesQuery: "What documents do I need for a Bahrain business visa?",
    lmraQuery: "How do I apply for a registered worker permit through LMRA?",
    culturalGuidelinesQuery: "What are the cultural guidelines for living in Bahrain as a Muslim country?",
    muslimCountryEtiquetteQuery: "What should I know about etiquette and behavior in a Muslim country?",
    mentalHealthQuery: "What mental health support is available for expatriates in Bahrain?",
    expatMentalHealthQuery: "How can expatriates access mental health services and support?",
    
    // Loading states
    aiThinking: "Umoja is thinking...",
    connectionRetrying: "Connection interrupted, retrying…",
    connectionFallback: "Switched to stable mode",
    
    // Common
    loading: "Loading...",
    error: "Error",
    tryAgain: "Try Again",
    close: "Close",
    menu: "Menu",
    
    // KnowledgeBase specific
    overview: "Overview",
    knowledgeBaseTitle: "📚 Bahrain Labour Law Knowledge Base",
    expatriateResidentKnowledgeBase: "📚 Expatriate Resident Knowledge Base",
    expatriateKnowledgeBaseSummary: "Comprehensive and reliable information for expatriates living in Bahrain. Find practical guidance on labour law, visas, housing, healthcare, banking, transportation, education and community support.",
    bahrainLabourLaw: "Bahrain Labour Law",
    visaImmigration: "Visa & Immigration",
    housingAccommodation: "Housing & Accommodation",
    healthcareMedical: "Healthcare & Medical",
    bankingFinance: "Banking & Finance",
    transportation: "Transportation",
    educationSchooling: "Education & Schooling",
    schoolingInfoTitle: "Schooling for Expatriates in Bahrain",
    schoolingOverviewText: "Bahrain offers a wide range of private schools serving expatriate families, with curricula including British (IGCSE/A‑Level), American (AP), IB, Indian (CBSE), Pakistani, French (AEFE) and more. Most schools teach primarily in English and provide additional language options.",
    schoolRegistrationTitle: "School Registration",
    schoolRegistrationText: "Registration is usually handled directly by each school. Expect the following steps and documents:",
    schoolRegistrationItem1: "Submit an online enquiry/application and pay an assessment/registration fee.",
    schoolRegistrationItem2: "Provide student passport, Bahrain CPR/residency (if available), birth certificate, and recent photos.",
    schoolRegistrationItem3: "Academic records: latest report cards, transfer certificate, and any assessment/SEN reports.",
    schoolRegistrationItem4: "Health documents: immunization record and any medical notes.",
    schoolRegistrationItem5: "Placement/assessment: some schools conduct age‑appropriate interviews/tests before offer.",
    schoolRegistrationItem6: "Offer & seat confirmation: acceptance letter followed by fee payment to secure the seat.",
    schoolCalendarTitle: "School Start & Academic Calendar",
    schoolCalendarText: "The academic year generally runs from late August/early September to June. Many schools follow a three‑term model with breaks in December (winter) and March/April (spring). During Ramadan, school hours may be adjusted.",
    schoolHolidaysTitle: "Holidays & Term Breaks",
    schoolHolidayItem1: "National holidays: Bahrain National Day and other official observances.",
    schoolHolidayItem2: "Religious holidays: Eid al‑Fitr, Eid al‑Adha, Ashura (dates vary yearly).",
    schoolHolidayItem3: "School breaks: winter and spring breaks; some schools also schedule mid‑term breaks.",
    familyConsiderationsTitle: "Key Considerations for Families",
    familyConsiderationItem1: "Demand & waitlists: popular year groups may have limited seats—apply early.",
    familyConsiderationItem2: "Location & transport: consider commute times; many schools offer bus services.",
    familyConsiderationItem3: "Fees & extras: review tuition, uniforms, books, activities, exam fees, and transport.",
    familyConsiderationItem4: "SEN support: confirm availability of learning support and accommodations if needed.",
    familyConsiderationItem5: "Community & activities: look into co‑curricular options (sports, arts, clubs).",
    hideDetails: "Hide Details",
    showAvailableTopics: "Show Available Topics",
    selectCategoryMsg: "Select a category to explore topics about expatriate life in Bahrain. Each entry provides practical information on visas, housing, healthcare, banking, transport, education, community support and labour law.",
    source: "Source",
    leaveBenefits: "Leave & Benefits",
    wagesPayment: "Wages & Payment",
    disputes: "Disputes",
    termination: "Termination",
    employment: "Employment",
    overtime: "Overtime",
    
    // Footer specific
    copyright: "© {year} Umoja-Aware. All rights reserved.",
    about: "About",
    terms: "Terms",
    privacy: "Privacy",
  },
  
  ar: {
    // Header
    umojaAware: "أوموجا واعي",
    
    // Navigation
    chat: "محادثة",
    knowledgeBase: "قاعدة المعرفة",
    community: "المجتمع",
    calculators: "الحاسبات",
    
    // Chat Interface
    typeYourMessage: "اكتب رسالتك هنا...",
    send: "إرسال",
    askQuestion: "اطرح سؤالاً",
    howCanIHelp: "كيف يمكنني مساعدتك في الأمور القانونية البحرينية اليوم؟",
    selectCategory: "اختر فئة (اختياري)",
    apologyProcessing: "أعتذر، لكن تواجهني مشكلة في معالجة طلبك حالياً. يرجى المحاولة مرة أخرى بعد قليل.",
    
    // Categories
    labourLaw: "قانون العمل",
    companyFormation: "تأسيس الشركات",
    visaServices: "خدمات التأشيرة",
    gracePeriod: "فترة السماح",
    lmra: "هيئة تنظيم سوق العمل",
    sijilat: "سجلات",
    generalLegal: "قانوني عام",
    culturalGuidelines: "الإرشادات الثقافية",
    mentalHealth: "الصحة النفسية",
    other: "أخرى",
    
    // Knowledge Base
    bahrainLegalGuide: "الدليل القانوني البحريني",
    searchKnowledge: "البحث في قاعدة المعرفة...",
    labourLawGuide: "دليل قانون العمل",
    workingHours: "ساعات العمل والعمل الإضافي",
    salaryRegulations: "الراتب والمزايا",
    terminationRights: "الإنهاء والحقوق",
    businessGuide: "دليل تأسيس الأعمال",
    companyRegistration: "تسجيل الشركة",
    licenseRequirements: "متطلبات الترخيص",
    sijillatProcess: "عملية تسجيل سجلات",
    visaGuide: "دليل التأشيرة والهجرة",
    residencePermit: "تصريح الإقامة",
    workVisa: "تأشيرة العمل",
    visitorVisa: "تأشيرة الزيارة",
    culturalGuidelinesGuide: "دليل الإرشادات الثقافية",
    muslimCountryEtiquette: "آداب الدولة المسلمة",
    decencyLaws: "قوانين الحشمة",
    ramadanGuidelines: "إرشادات رمضان",
    prayerTimes: "أوقات الصلاة",
    dressCode: "رمز اللباس",
    publicBehaviour: "السلوك العام",
    mentalHealthGuide: "دليل الصحة النفسية",
    expatMentalHealth: "الصحة النفسية للوافدين",
    counselingServices: "خدمات الاستشارة",
    stressManagement: "إدارة التوتر",
    communitySupport: "دعم المجتمع",
    emergencyContacts: "جهات الاتصال الطارئة",
    
    // Community
    joinCommunity: "انضم إلى مجتمعنا",
    whatsappGroup: "مجموعة واتساب",
    telegramChannel: "قناة تيليجرام",
    connectWithUs: "تواصل معنا على وسائل التواصل الاجتماعي وابق على اطلاع بأحدث المعلومات القانونية.",
    
    // Footer
    disclaimer: "إخلاء المسؤولية",
    disclaimerText: "توفر هذه الأداة معلومات قانونية عامة ولا ينبغي اعتبارها استشارة قانونية مهنية. للمسائل القانونية المحددة، يرجى استشارة المهنيين القانونيين المؤهلين.",
    cookiesNotice: "نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك. من خلال الاستمرار في استخدام هذا الموقع، فإنك توافق على استخدامنا لملفات تعريف الارتباط.",
    acceptCookies: "قبول ملفات تعريف الارتباط",
    
    // Welcome message
    welcomeTitle: "مرحباً بك في أوموجا واعي",
    welcomeDescription: "مساعدك المتخصص للوافدين المقيمين في البحرين. يمكنني مساعدتك في حقوق الموظفين، لوائح الراتب، ساعات العمل، إجراءات الإنهاء والمسائل ذات الصلة في عدة لغات!",
    
    // Predefined queries
    labourLawQuery: "ما هي حقوق الموظف الأساسية في قانون العمل البحريني؟",
    companyFormationQuery: "كيف أسجل شركة جديدة في البحرين من خلال سجلات؟",
    visaServicesQuery: "ما الوثائق التي أحتاجها للحصول على تأشيرة عمل بحرينية؟",
    lmraQuery: "كيف أتقدم بطلب للحصول على تصريح عمل مرن (ذاتي الكفالة) من خلال هيئة تنظيم سوق العمل؟",
    culturalGuidelinesQuery: "ما هي الإرشادات الثقافية للعيش في البحرين كدولة مسلمة؟",
    muslimCountryEtiquetteQuery: "ماذا يجب أن أعرف عن آداب السلوك في الدولة المسلمة؟",
    mentalHealthQuery: "ما هي خدمات الدعم النفسي المتاحة للوافدين في البحرين؟",
    expatMentalHealthQuery: "كيف يمكن للوافدين الوصول إلى خدمات ودعم الصحة النفسية؟",
    
    // Loading states
    aiThinking: "أوموجا يفكر...",
    connectionRetrying: "انقطع الاتصال، نحاول إعادة الاتصال…",
    connectionFallback: "تم التحويل إلى الوضع المستقر",
    
    // Common
    loading: "جاري التحميل...",
    error: "خطأ",
    tryAgain: "حاول مرة أخرى",
    close: "إغلاق",
    menu: "القائمة",
    
    // KnowledgeBase specific
    overview: "نظرة عامة",
    knowledgeBaseTitle: "📚 قاعدة المعرفة لقانون العمل البحريني",
    expatriateResidentKnowledgeBase: "📚 قاعدة معارف المقيمين الأجانب",
    expatriateKnowledgeBaseSummary: "دليل شامل يغطي جميع جوانب حياة المقيمين الأجانب في البحرين، بما في ذلك قوانين العمل، الإرشادات الثقافية، دعم الصحة النفسية، إجراءات التأشيرات، السكن، الرعاية الصحية، الخدمات المصرفية، النقل، التعليم، وموارد المجتمع.",
    bahrainLabourLaw: "قانون العمل البحريني",
    visaImmigration: "التأشيرات والهجرة",
    housingAccommodation: "السكن والإقامة",
    healthcareMedical: "الرعاية الصحية والطبية",
    bankingFinance: "الخدمات المصرفية والمالية",
    transportation: "النقل",
    educationSchooling: "التعليم والمدارس",
    schoolingInfoTitle: "التعليم للوافدين في البحرين",
    schoolingOverviewText: "تتوفر في البحرين مجموعة واسعة من المدارس الخاصة التي تخدم العائلات الوافدة، وتشمل مناهج بريطانية، أمريكية، البكالوريا الدولية، الهندية (CBSE)، الباكستانية، الفرنسية وغيرها. تعتمد معظم المدارس اللغة الإنجليزية مع خيارات لغات إضافية.",
    schoolRegistrationTitle: "تسجيل المدرسة",
    schoolRegistrationText: "يتم التسجيل عادة مباشرة مع كل مدرسة. توقع الخطوات والمستندات التالية:",
    schoolRegistrationItem1: "تقديم طلب/استفسار عبر الإنترنت ودفع رسوم التسجيل/التقييم.",
    schoolRegistrationItem2: "تقديم جواز سفر الطالب، بطاقة الهوية/الإقامة البحرينية (إن وجدت)، شهادة الميلاد، وصور حديثة.",
    schoolRegistrationItem3: "السجلات الأكاديمية: أحدث الشهادات، شهادة انتقال، وأي تقارير تقييم/دعم تعليمي خاص.",
    schoolRegistrationItem4: "السجلات الصحية: سجل التطعيمات وأي ملاحظات طبية.",
    schoolRegistrationItem5: "التقييم/المقابلة: قد تجري بعض المدارس اختبارات أو مقابلات مناسبة للعمر قبل القبول.",
    schoolRegistrationItem6: "تأكيد المقعد: خطاب قبول متبوعاً بدفع الرسوم لضمان الحجز.",
    schoolCalendarTitle: "بداية العام الدراسي والتقويم الأكاديمي",
    schoolCalendarText: "يمتد العام الدراسي عادة من أواخر أغسطس/أوائل سبتمبر حتى يونيو. تتبع العديد من المدارس نظام الثلاثة فصول مع عطلات في ديسمبر ومارس/أبريل. خلال رمضان قد تتغير ساعات الدراسة.",
    schoolHolidaysTitle: "العطلات والفترات الدراسية",
    schoolHolidayItem1: "العطلات الوطنية: اليوم الوطني البحريني وغيرها من المناسبات الرسمية.",
    schoolHolidayItem2: "العطلات الدينية: عيد الفطر، عيد الأضحى، عاشوراء (تتغير التواريخ سنوياً).",
    schoolHolidayItem3: "عطلات المدارس: عطلة الشتاء والربيع؛ وبعض المدارس تحدد عطلات خلال الفصل الدراسي.",
    familyConsiderationsTitle: "اعتبارات مهمة للعائلات",
    familyConsiderationItem1: "الطلب وقوائم الانتظار: قد تكون المقاعد محدودة—يفضل التقديم المبكر.",
    familyConsiderationItem2: "الموقع والنقل: راعِ زمن التنقل؛ العديد من المدارس توفر حافلات.",
    familyConsiderationItem3: "الرسوم والإضافات: راجع الرسوم والزي والكتب والأنشطة ورسوم الاختبارات والنقل.",
    familyConsiderationItem4: "الدعم التعليمي الخاص: تحقق من توفر خدمات الدعم والتسهيلات عند الحاجة.",
    familyConsiderationItem5: "الأنشطة المجتمعية واللاصفية: ابحث عن الخيارات الرياضية والفنية والأنشطة.",
    hideDetails: "إخفاء التفاصيل",
    showAvailableTopics: "عرض الموضوعات المتاحة",
    selectCategoryMsg: "اختر فئة أعلاه لاستكشاف موضوعات شاملة لحياة المغتربين في البحرين. يحتوي كل إدخال على معلومات عملية تغطي التأشيرات، السكن، الرعاية الصحية، الخدمات المصرفية، النقل، التعليم، دعم المجتمع وقوانين العمل.",
    source: "المصدر",
    leaveBenefits: "الإجازة والمزايا",
    wagesPayment: "الأجور والدفع",
    disputes: "النزاعات",
    termination: "الإنهاء",
    employment: "التوظيف",
    overtime: "العمل الإضافي",
    
    // Footer specific
    copyright: "© {year} Umoja-Aware. جميع الحقوق محفوظة.",
    about: "حول",
    terms: "الشروط",
    privacy: "الخصوصية",
  },
  
  zh: {
    // Header
    umojaAware: "Umoja-Aware",
    
    // Navigation
    chat: "聊天",
    knowledgeBase: "知识库",
    community: "社区",
    calculators: "计算器",
    
    // Chat Interface
    typeYourMessage: "在此输入您的消息...",
    send: "发送",
    askQuestion: "提问",
    howCanIHelp: "今天我如何帮助您解决巴林法律事务？",
    selectCategory: "选择类别（可选）",
    apologyProcessing: "抱歉，目前处理您的请求遇到问题。请稍后再试。",
    
    // Categories
    labourLaw: "劳动法",
    companyFormation: "公司成立",
    visaServices: "签证服务",
    gracePeriod: "宽限期",
    lmra: "劳动力市场监管局",
    sijilat: "商业注册",
    generalLegal: "一般法律",
    other: "其他",
    culturalGuidelines: "文化指南",
    mentalHealth: "心理健康",
    culturalGuidelinesGuide: "文化指南与礼仪",
    muslimCountryEtiquette: "穆斯林国家礼仪",
    decencyLaws: "公德与体面法规",
    ramadanGuidelines: "斋月指南",
    prayerTimes: "礼拜时间与宗教活动",
    dressCode: "着装规范",
    publicBehaviour: "公共行为与举止",
    mentalHealthGuide: "心理健康支持指南",
    expatMentalHealth: "外籍人士心理健康",
    counselingServices: "咨询与治疗服务",
    stressManagement: "压力管理与应对",
    communitySupport: "社区支持小组",
    emergencyContacts: "心理健康紧急联系方式",
    
    // Knowledge Base
    bahrainLegalGuide: "巴林法律指南",
    searchKnowledge: "搜索知识库...",
    labourLawGuide: "劳动法指南",
    workingHours: "工作时间和加班",
    salaryRegulations: "薪资和福利",
    terminationRights: "终止和权利",
    businessGuide: "商业成立指南",
    companyRegistration: "公司注册",
    licenseRequirements: "许可证要求",
    sijillatProcess: "商业注册流程",
    visaGuide: "签证和移民指南",
    residencePermit: "居住许可",
    workVisa: "工作签证",
    visitorVisa: "访问签证",
    
    // Community
    joinCommunity: "加入我们的社区",
    whatsappGroup: "WhatsApp群组",
    telegramChannel: "Telegram频道",
    connectWithUs: "在社交媒体上与我们联系，了解最新的法律信息。",
    
    // Footer
    disclaimer: "免责声明",
    disclaimerText: "此工具提供一般法律信息，不应被视为专业法律建议。对于具体的法律事务，请咨询合格的法律专业人士。",
    cookiesNotice: "我们使用cookies来增强您的体验。继续使用本网站，即表示您同意我们使用cookies。",
    acceptCookies: "接受Cookies",
    
    // Welcome message
    welcomeTitle: "欢迎来到Umoja-Aware",
    welcomeDescription: "您是巴林外籍居民的专业AI助手。我可以帮助您了解员工权利、薪资规定、工作时间、解雇程序和相关事务，支持多种语言！",
    
    // Predefined queries
    labourLawQuery: "巴林劳动法下员工的基本权利是什么？",
    companyFormationQuery: "如何通过Sijilat在巴林注册新公司？",
    visaServicesQuery: "申请巴林商务签证需要什么文件？",
    lmraQuery: "如何通过LMRA申请灵活工作许可证（自我保荐）？",
    culturalGuidelinesQuery: "作为穆斯林国家，在巴林生活的文化准则是什么？",
    muslimCountryEtiquetteQuery: "在穆斯林国家应该了解哪些礼仪和行为规范？",
    mentalHealthQuery: "巴林为外籍人士提供哪些心理健康支持？",
    expatMentalHealthQuery: "外籍人士如何获得心理健康服务和支持？",
    
    // Loading states
    aiThinking: "Umoja正在思考...",
    connectionRetrying: "连接中断，正在重试…",
    connectionFallback: "已切换到稳定模式",
    
    // Common
    loading: "加载中...",
    error: "错误",
    tryAgain: "重试",
    close: "关闭",
    menu: "菜单",
    
    // KnowledgeBase specific
    overview: "概述",
    knowledgeBaseTitle: "📚 巴林劳动法知识库",
    expatriateResidentKnowledgeBase: "📚 外籍居民知识库",
    expatriateKnowledgeBaseSummary: "涵盖巴林外籍生活各个方面的综合指南，包括劳动法、文化指南、心理健康支持、签证流程、住房、医疗保健、银行服务、交通、教育和社区资源。",
    bahrainLabourLaw: "巴林劳动法",
    visaImmigration: "签证与移民",
    housingAccommodation: "住房与住宿",
    healthcareMedical: "医疗保健",
    bankingFinance: "银行与金融",
    transportation: "交通运输",
    educationSchooling: "教育就学",
    hideDetails: "隐藏详情",
    showAvailableTopics: "显示可用主题",
    selectCategoryMsg: "选择上面的类别来探索在巴林的外籍人士生活综合主题。每个条目都包含实用信息，涵盖签证、住房、医疗保健、银行服务、交通、教育、社区支持和劳动法。",
    source: "来源",
    leaveBenefits: "休假和福利",
    wagesPayment: "工资和支付",
    disputes: "争议",
    termination: "终止",
    employment: "就业",
    overtime: "加班",
    
    // Schools Directory
    schoolingInfoTitle: "教育信息",
    schoolingOverviewText: "巴林为外籍家庭提供多样化的教育选择，包括遵循不同课程的国际学校。",
    schoolRegistrationTitle: "学校注册",
    schoolRegistrationText: "注册通常由每所学校直接处理。预期以下步骤和文件：",
    schoolRegistrationItem1: "在线提交咨询/申请并支付评估/注册费用。",
    schoolRegistrationItem2: "提供学生护照、巴林身份证/居留许可（如有）、出生证明和近期照片。",
    schoolRegistrationItem3: "学术记录：最新成绩单、转学证明和任何评估/特殊教育需求报告。",
    schoolRegistrationItem4: "健康文件：免疫记录和任何医疗说明。",
    schoolRegistrationItem5: "安置/评估：一些学校在录取前进行适合年龄的面试/测试。",
    schoolRegistrationItem6: "录取和座位确认：录取通知后支付费用以确保座位。",
    schoolCalendarTitle: "开学和学术日历",
    schoolCalendarText: "学年通常从8月下旬/9月初到6月。许多学校遵循三学期制，12月（冬季）和3月/4月（春季）有假期。在斋月期间，学校时间可能会调整。",
    schoolHolidaysTitle: "假期和学期休息",
    schoolHolidayItem1: "国定假日：巴林国庆日和其他官方纪念日。",
    schoolHolidayItem2: "宗教节日：开斋节、宰牲节、阿舒拉节（日期每年变化）。",
    schoolHolidayItem3: "学校假期：冬季和春季假期；一些学校还安排期中假期。",
    familyConsiderationsTitle: "家庭关键考虑因素",
    familyConsiderationItem1: "需求和等候名单：热门年级可能座位有限——尽早申请。",
    familyConsiderationItem2: "地点和交通：考虑通勤时间；许多学校提供校车服务。",
    familyConsiderationItem3: "费用和额外费用：审查学费、校服、书籍、活动、考试费用和交通费用。",
    familyConsiderationItem4: "特殊教育需求支持：确认学习支持和住宿的可用性（如需要）。",
    familyConsiderationItem5: "社区和活动：了解课外选项（体育、艺术、俱乐部）。",
    
    // Footer specific
    copyright: "© {year} Umoja-Aware. 保留所有权利。",
    about: "关于",
    terms: "条款",
    privacy: "隐私",
  },
  
  es: {
    // Header
    umojaAware: "Umoja-Aware",
    
    // Navigation
    chat: "Chat",
    knowledgeBase: "Base de Conocimiento",
    community: "Comunidad",
    
    // Chat Interface
    typeYourMessage: "Escribe tu mensaje aquí...",
    send: "Enviar",
    askQuestion: "Hacer una pregunta",
    howCanIHelp: "¿Cómo puedo ayudarte con asuntos legales de Bahréin hoy?",
    selectCategory: "Seleccionar una categoría (opcional)",
    
    // Categories
    labourLaw: "Derecho Laboral",
    companyFormation: "Formación de Empresas",
    visaServices: "Servicios de Visa",
    gracePeriod: "Período de Gracia",
    lmra: "LMRA",
    sijilat: "Sijilat",
    generalLegal: "Legal General",
    other: "Otro",
    culturalGuidelines: "Pautas Culturales",
    mentalHealth: "Salud Mental",
    culturalGuidelinesGuide: "Guía de Pautas Culturales",
    muslimCountryEtiquette: "Etiqueta en País Musulmán",
    decencyLaws: "Leyes de Decencia",
    ramadanGuidelines: "Guía de Ramadán",
    prayerTimes: "Horarios de Oración",
    dressCode: "Código de Vestimenta",
    publicBehaviour: "Comportamiento Público",
    mentalHealthGuide: "Guía de Salud Mental",
    expatMentalHealth: "Salud Mental de Expatriados",
    counselingServices: "Servicios de Consejería y Terapia",
    stressManagement: "Manejo del Estrés",
    communitySupport: "Apoyo Comunitario",
    emergencyContacts: "Contactos de Emergencia",
    
    // Knowledge Base
    bahrainLegalGuide: "Guía Legal de Bahréin",
    searchKnowledge: "Buscar en la base de conocimiento...",
    labourLawGuide: "Guía de Derecho Laboral",
    workingHours: "Horario de Trabajo y Horas Extra",
    salaryRegulations: "Salario y Beneficios",
    terminationRights: "Terminación y Derechos",
    businessGuide: "Guía de Formación de Empresas",
    companyRegistration: "Registro de Empresa",
    licenseRequirements: "Requisitos de Licencia",
    sijillatProcess: "Proceso de Registro Sijillat",
    visaGuide: "Guía de Visa e Inmigración",
    residencePermit: "Permiso de Residencia",
    workVisa: "Visa de Trabajo",
    visitorVisa: "Visa de Visitante",
    
    // Community
    joinCommunity: "Únete a Nuestra Comunidad",
    whatsappGroup: "Grupo de WhatsApp",
    telegramChannel: "Canal de Telegram",
    connectWithUs: "Conéctate con nosotros en redes sociales y mantente actualizado con la información legal más reciente.",
    
    // Footer
    disclaimer: "Descargo de Responsabilidad",
    disclaimerText: "Esta herramienta proporciona información legal general y no debe considerarse como asesoramiento legal profesional. Para asuntos legales específicos, consulte con profesionales legales calificados.",
    cookiesNotice: "Utilizamos cookies para mejorar tu experiencia. Al continuar usando este sitio, aceptas nuestro uso de cookies.",
    acceptCookies: "Aceptar Cookies",
    
    // Welcome message
    welcomeTitle: "Bienvenido a CommunityAware",
    welcomeDescription: "Su asistente especializado en IA para expatriados que viven en Bahréin. Puedo ayudarle con información sobre derechos de empleados, regulaciones salariales, horas de trabajo, procedimientos de terminación y asuntos relacionados en varios idiomas!",
    
    // Predefined queries
    labourLawQuery: "¿Cuáles son los derechos básicos de los empleados bajo la ley laboral de Bahréin?",
    companyFormationQuery: "¿Cómo registro una nueva empresa en Bahréin a través de Sijilat?",
    visaServicesQuery: "¿Qué documentos necesito para una visa de negocios de Bahréin?",
    lmraQuery: "¿Cómo solicito un permiso de trabajo registrado (autopatrocinado) a través de LMRA?",
    culturalGuidelinesQuery: "¿Cuáles son las pautas culturales para vivir en Bahréin como país musulmán?",
    muslimCountryEtiquetteQuery: "¿Qué debo saber sobre el etiqueta y comportamiento en un país musulmán?",
    mentalHealthQuery: "¿Qué apoyo de salud mental está disponible para expatriados en Bahréin?",
    expatMentalHealthQuery: "¿Cómo pueden los expatriados acceder a servicios y apoyo de salud mental?",
    
    // Loading states
    aiThinking: "Umoja está pensando...",
    connectionRetrying: "Conexión interrumpida, reintentando…",
    connectionFallback: "Cambiado al modo estable",
    
    // Common
    loading: "Cargando...",
    error: "Error",
    tryAgain: "Intentar de Nuevo",
    close: "Cerrar",
    menu: "Menú",
    
    // KnowledgeBase specific
    overview: "Descripción General",
    knowledgeBaseTitle: "📚 Base de Conocimientos de la Ley Laboral de Bahréin",
    expatriateResidentKnowledgeBase: "📚 Base de Conocimientos para Residentes Expatriados",
    expatriateKnowledgeBaseSummary: "Guía integral que cubre todos los aspectos de la vida de expatriados en Bahréin, incluyendo leyes laborales, pautas culturales, apoyo de salud mental, procesos de visa, vivienda, atención médica, servicios bancarios, transporte, educación y recursos comunitarios.",
    bahrainLabourLaw: "Ley Laboral de Bahréin",
    visaImmigration: "Visados e Inmigración",
    housingAccommodation: "Vivienda y Alojamiento",
    healthcareMedical: "Salud y Atención Médica",
    bankingFinance: "Banca y Finanzas",
    transportation: "Transporte",
    educationSchooling: "Educación y Escolarización",
    hideDetails: "Ocultar Detalles",
    showAvailableTopics: "Mostrar Temas Disponibles",
    selectCategoryMsg: "Selecciona una categoría arriba para explorar temas específicos en la Ley Laboral de Bahréin. Cada entrada contiene información oficial con referencias de artículos de la Ley Laboral de Bahréin para el Sector Privado.",
    source: "Fuente",
    leaveBenefits: "Licencias y Beneficios",
    wagesPayment: "Salarios y Pagos",
    disputes: "Disputas",
    termination: "Terminación",
    employment: "Empleo",
    overtime: "Horas Extra",
    
    // Footer specific
    copyright: "© {year} CommunityAware. Todos los derechos reservados.",
    about: "Acerca de",
    terms: "Términos",
    privacy: "Privacidad",
  },
  
  ml: {
    // Header
    umojaAware: "Umoja-Aware",
    
    // Navigation
    chat: "ചാറ്റ്",
    knowledgeBase: "അറിവുകളുടെ ഖണ്ഡിക",
    community: "കമ്മ്യൂണിറ്റി",
    
    // Chat Interface
    typeYourMessage: "നിങ്ങളുടെ സന്ദേശം ഇവിടെ ടൈപ്പ് ചെയ്യുക...",
    send: "അയയ്ക്കുക",
    askQuestion: "ചോദ്യം ചോദിക്കുക",
    howCanIHelp: "ഇന്ന് ബഹ്റൈനിലെ നിയമപരമായ കാര്യങ്ങളിൽ ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കാം?",
    selectCategory: "വിഭാഗം തിരഞ്ഞെടുക്കുക (ഓപ്ഷണൽ)",
    
    // Categories
    labourLaw: "തൊഴിൽ നിയമം",
    companyFormation: "കമ്പനി രൂപീകരണം",
    visaServices: "വിസ സേവനങ്ങൾ",
    gracePeriod: "അനുകൂല കാലയളവ്",
    lmra: "എൽഎംആർഎ",
    sijilat: "സിജിലാറ്റ്",
    generalLegal: "പൊതു നിയമം",
    other: "മറ്റുള്ളവ",
    culturalGuidelines: "സാംസ്കാരിക മാർഗനിർദേശങ്ങൾ",
    mentalHealth: "മാനസിക ആരോഗ്യം",
    culturalGuidelinesGuide: "സാംസ്കാരിക മാർഗനിർദേശങ്ങളുടെ ഗൈഡ്",
    muslimCountryEtiquette: "മുസ്ലിം രാജ്യത്തിലെ ശിഷ്ടാചാരം",
    decencyLaws: "ഡീസൻസി നിയമങ്ങൾ",
    ramadanGuidelines: "റമദാൻ മാർഗനിർദേശങ്ങൾ",
    prayerTimes: "നമസ്കാര സമയങ്ങൾ",
    dressCode: "വസ്ത്രധാരണ രീതി",
    publicBehaviour: "പൊതു പെരുമാറ്റം",
    mentalHealthGuide: "മാനസിക ആരോഗ്യ ഗൈഡ്",
    expatMentalHealth: "പ്രവാസികളുടെ മാനസിക ആരോഗ്യം",
    counselingServices: "കൗൺസലിംഗ്/തെറാപ്പി സേവനങ്ങൾ",
    stressManagement: "സമ്മർദ്ദ നിയന്ത്രണം",
    communitySupport: "കമ്മ്യൂണിറ്റി പിന്തുണ",
    emergencyContacts: "അടിയന്തര ബന്ധപ്പെടേണ്ടവർ",
    
    // Knowledge Base
    bahrainLegalGuide: "ബഹ്റൈൻ നിയമ ഗൈഡ്",
    searchKnowledge: "അറിവിനായി തിരയുക...",
    labourLawGuide: "തൊഴിൽ നിയമ ഗൈഡ്",
    workingHours: "പ്രവൃത്തി സമയങ്ങളും ഓവർടൈമും",
    salaryRegulations: "ശമ്പളവും ആനുകൂല്യങ്ങളും",
    terminationRights: "അവസാനിപ്പിക്കലും അവകാശങ്ങളും",
    businessGuide: "ബിസിനസ് രൂപീകരണ ഗൈഡ്",
    companyRegistration: "കമ്പനി രജിസ്ട്രേഷൻ",
    licenseRequirements: "ലൈസൻസ് ആവശ്യകതകൾ",
    sijillatProcess: "സിജിലാറ്റ് രജിസ്ട്രേഷൻ പ്രക്രിയ",
    visaGuide: "വിസയും ഇമിഗ്രേഷനും ഗൈഡ്",
    residencePermit: "റസിഡൻസ് പെർമിറ്റ്",
    workVisa: "വർക്ക് വിസ",
    visitorVisa: "സന്ദർശക വിസ",
    
    // Community
    joinCommunity: "ഞങ്ങളുടെ കമ്മ്യൂണിറ്റിയിൽ ചേരുക",
    whatsappGroup: "WhatsApp ഗ്രൂപ്പ്",
    telegramChannel: "Telegram ചാനൽ",
    connectWithUs: "സോഷ്യൽ മീഡിയയിൽ ഞങ്ങളുമായി ബന്ധപ്പെടുകയും ഏറ്റവും പുതിയ നിയമ വിവരങ്ങൾ അറിയുകയും ചെയ്യുക.",
    
    // Footer (keeping English as requested)
    disclaimer: "Disclaimer",
    disclaimerText: "This tool provides general legal information and should not be considered as professional legal advice. For specific legal matters, please consult with qualified legal professionals.",
    cookiesNotice: "We use cookies to enhance your experience. By continuing to use this site, you agree to our use of cookies.",
    acceptCookies: "Accept Cookies",
    
    // Welcome message
    welcomeTitle: "CommunityAware-ലേക്ക് സ്വാഗതം",
    welcomeDescription: "ബഹ്റൈനുള്ള നിങ്ങളുടെ AI നിയമ സഹായി. തൊഴിൽ നിയമ ചോദ്യങ്ങൾ, കമ്പനി രൂപീകരണം, വിസ സേവനങ്ങൾ, LMRA നടപടിക്രമങ്ങൾ എന്നിവയിൽ എനിക്ക് നിങ്ങളെ സഹായിക്കാം. ബഹ്റൈനിലെ നിയമപരമായ കാര്യങ്ങളെക്കുറിച്ച് എന്തിനെക്കുറിച്ചും എന്നോട് ചോദിക്കുക!",
    
    // Predefined queries
    labourLawQuery: "ബഹ്റൈൻ തൊഴിൽ നിയമപ്രകാരം ജീവനക്കാരുടെ അടിസ്ഥാന അവകാശങ്ങൾ എന്തൊക്കെയാണ്?",
    companyFormationQuery: "സിജിലാറ്റ് വഴി ബഹ്റൈനിൽ ഒരു പുതിയ കമ്പനി എങ്ങനെ രജിസ്റ്റർ ചെയ്യാം?",
    visaServicesQuery: "ബഹ്റൈൻ ബിസിനസ് വിസയ്ക്ക് എനിക്ക് എന്ത് രേഖകൾ ആവശ്യമാണ്?",
    lmraQuery: "LMRA വഴി ഫ്ലെക്സിബിൾ വർക്ക് പെർമിറ്റിനായി (സ്വയം സ്പോൺസർഡ്) എങ്ങനെ അപേക്ഷിക്കാം?",
    culturalGuidelinesQuery: "മുസ്ലിം രാജ്യമായ ബഹ്റൈനിൽ ജീവിക്കാനും ജോലി ചെയ്യാനും സാംസ്കാരിക മാർഗനിർദേശങ്ങൾ എന്തൊക്കെയാണ്?",
    muslimCountryEtiquetteQuery: "മുസ്ലിം രാജ്യത്തിൽ ശിഷ്ടാചാരവും പെരുമാറ്റവും സംബന്ധിച്ച് അറിയേണ്ടത് എന്തെല്ലാം?",
    mentalHealthQuery: "ബഹ്റൈനിൽ പ്രവാസികൾക്ക് ലഭ്യമായ മാനസികാരോഗ്യ പിന്തുണ എന്തൊക്കെയാണ്?",
    expatMentalHealthQuery: "പ്രവാസികൾ മാനസികാരോഗ്യ സേവനങ്ങളും പിന്തുണയും എങ്ങനെ ലഭ്യമാക്കാം?",
    
    // Loading states
    aiThinking: "ഉമോജ ചിന്തിക്കുന്നു...",
    connectionRetrying: "ബന്ധം തകരാറുപറ്റി, വീണ്ടും ശ്രമിക്കുന്നു…",
    connectionFallback: "സ്ഥിരമായ മോഡിലേക്ക് മാറി",
    
    // Common
    loading: "ലോഡ് ചെയ്യുന്നു...",
    error: "പിശക്",
    tryAgain: "വീണ്ടും ശ്രമിക്കുക",
    close: "അടയ്ക്കുക",
    menu: "മെനു",
    
    // KnowledgeBase specific
    overview: "അവലോകനം",
    knowledgeBaseTitle: "📚 ബഹ്റൈൻ തൊഴിൽ നിയമ അറിവ് കേന്ദ്രം",
    expatriateResidentKnowledgeBase: "📚 പ്രവാസി താമസക്കാരുടെ അറിവ് കേന്ദ്രം",
    expatriateKnowledgeBaseSummary: "ബഹ്റൈനിലെ പ്രവാസി ജീവിതത്തിന്റെ എല്ലാ വശങ്ങളും ഉൾക്കൊള്ളുന്ന സമഗ്ര മാർഗ്ഗനിർദ്ദേശം, തൊഴിൽ നിയമങ്ങൾ, സാംസ്‌കാരിക മാർഗ്ഗനിർദ്ദേശങ്ങൾ, മാനസികാരോഗ്യ പിന്തുണ, വിസ പ്രോസസ്സുകൾ, വാസസ്ഥലങ്ങൾ, ആരോഗ്യ സേവനങ്ങൾ, ബാങ്കിംഗ് സേവനങ്ങൾ, ഗതാഗതം, വിദ്യാഭ്യാസം, കമ്മ്യൂണിറ്റി വിഭവങ്ങൾ എന്നിവ ഉൾപ്പെടുന്നു.",
    bahrainLabourLaw: "ബഹ്റൈൻ തൊഴിൽ നിയമം",
    visaImmigration: "വിസയും ഇമിഗ്രേഷനും",
    housingAccommodation: "വാസസ്ഥലങ്ങളും താമസവും",
    healthcareMedical: "ആരോഗ്യ സേവനങ്ങളും വൈദ്യവും",
    bankingFinance: "ബാങ്കിംഗും ഫിനാൻസും",
    transportation: "ഗതാഗതം",
    educationSchooling: "വിദ്യാഭ്യാസവും സ്കൂളിംഗും",
    hideDetails: "വിശദാംശങ്ങൾ മറയ്ക്കുക",
    showAvailableTopics: "ലഭ്യമായ വിഷയങ്ങൾ കാണിക്കുക",
    selectCategoryMsg: "ബഹ്റൈനിലെ പ്രവാസി ജീവിതത്തിന്റെ സമഗ്ര വിഷയങ്ങൾ പരിശോധിക്കാൻ മുകളിലെ വിഭാഗം തിരഞ്ഞെടുക്കുക. ഓരോ എൻട്രിയിലും വിസ, വാസസ്ഥലം, ആരോഗ്യ പരിചരണം, ബാങ്കിംഗ്, ഗതാഗതം, വിദ്യാഭ്യാസം, കമ്മ്യൂണിറ്റി പിന്തുണ, തൊഴിലാളി നിയമങ്ങൾ എന്നിവയെക്കുറിച്ചുള്ള പ്രായോഗിക വിവരങ്ങൾ ഉൾക്കൊള്ളുന്നു.",
    source: "ഉറവിടം",
    leaveBenefits: "അവധിയും ആനുകൂല്യങ്ങളും",
    wagesPayment: "വേതനവും പേയ്മെന്റും",
    disputes: "തർക്കങ്ങൾ",
    termination: "അവസാനിപ്പിക്കൽ",
    employment: "തൊഴിൽ",
    overtime: "ഓവർടൈം",
    
    // Footer specific (keeping English as requested)
    copyright: "© {year} CommunityAware. All rights reserved.",
    about: "About",
    terms: "Terms",
    privacy: "Privacy",
  },
  
  lg: {
    // Header
    umojaAware: "Umoja-Aware",
    
    // Navigation
    chat: "Chat",
    knowledgeBase: "Ekintabizi Ezinnyonnyola",
    community: "Omubeezi",
    
    // Chat Interface
    typeYourMessage: "Wandiika obubaka bwo wano...",
    send: "Sinda",
    askQuestion: "Buuza ekibuuzo",
    howCanIHelp: "Nnyinza ntya okukuyamba ku nsonga z'amateeka mu Bahrain leero?",
    selectCategory: "Londa eky'enkoba (ky'obwa zibira)",
    
    // Categories
    labourLaw: "Amateeka g'Omulimu",
    companyFormation: "Okutandikawo kkampuni",
    visaServices: "Visa Obuweereza",
    gracePeriod: "Ekiseera ky'okusaasira",
    lmra: "LMRA",
    sijilat: "Sijilat",
    generalLegal: "Amateeka ga Bulijjo",
    other: "Ebirala",
    culturalGuidelines: "Eby'ennono n'obuwangwa",
    mentalHealth: "Obulamu bw'omutwe",
    culturalGuidelinesGuide: "Ebiragiro by'ennono n'obuwangwa",
    muslimCountryEtiquette: "Empisa mu nsi ya Musiramu",
    decencyLaws: "Amateeka g'obwesimbu",
    ramadanGuidelines: "Ebiragiro bya Ramadhan",
    prayerTimes: "Ebiseera by'okusaala",
    dressCode: "Enteekateeka y'okwambala",
    publicBehaviour: "Empisa mu bantu",
    mentalHealthGuide: "Ebiragiro ku bulamu bw'omutwe",
    expatMentalHealth: "Obulamu bw'omutwe bwa bagenyi",
    counselingServices: "Eby'obuweereza mu kubuuliriza",
    stressManagement: "Okufuga obunafu",
    communitySupport: "Obuwagizi bw'ekibiina",
    emergencyContacts: "Eby'okukubira mu buzibu",
    
    // Knowledge Base
    bahrainLegalGuide: "Ekitontome ky'Amateeka ga Bahrain",
    searchKnowledge: "Noonyeza mu magezi...",
    labourLawGuide: "Ekyokulungamya Amateeka g'Omulimu",
    workingHours: "Essaawa z'Omulimu n'Eziyongera",
    salaryRegulations: "Omusaala n'Ebirungi",
    terminationRights: "Okumalako n'Eddembe",
    businessGuide: "Ekyokulungamya Obusuubuzi",
    companyRegistration: "Okuwandiisa Kkampuni",
    licenseRequirements: "Ebeetaagisa ku Layisensi",
    sijillatProcess: "Enkola ya Sijilat",
    visaGuide: "Ekyokulungamya Visa",
    residencePermit: "Olukusa lw'Okubeera",
    workVisa: "Visa y'Omulimu",
    visitorVisa: "Visa y'Omukyala",
    
    // Community
    joinCommunity: "Yingira mu Omubeezi Gwaffe",
    whatsappGroup: "Ekibinja kya WhatsApp",
    telegramChannel: "Omuyala gwa Telegram",
    connectWithUs: "Tukolagane ku mikutu gy'amawulire era otegeere amawulire amaggya ku mateeka.",
    
    // Footer (keeping English as requested)
    disclaimer: "Disclaimer",
    disclaimerText: "This tool provides general legal information and should not be considered as professional legal advice. For specific legal matters, please consult with qualified legal professionals.",
    cookiesNotice: "We use cookies to enhance your experience. By continuing to use this site, you agree to our use of cookies.",
    acceptCookies: "Accept Cookies",
    
    // Welcome message
    welcomeTitle: "Tukwaniriza ku CommunityAware",
    welcomeDescription: "Omuyambi wo ogw'amagezi ku baasi be Bahrain ababeera. Nsobola okukuyamba ku ntegeereka ku ddembe lya baakozi, enkola za pesa, saawa z'okukola, enkola za kumalira omulimu n'ebintu ebikwata ku byo mu nnimi nnyingi!",
    
    // Predefined queries
    labourLawQuery: "Eddembe lya mukozi ki erisembayo mu mateeka g'omulimu ga Bahrain?",
    companyFormationQuery: "Nnyinza ntya okuwandiisa kkampuni empya mu Bahrain nga mpita mu Sijilat?",
    visaServicesQuery: "Mpapula ki ze nneetaaga ku visa ya bisuubuzi ya Bahrain?",
    lmraQuery: "Nnyinza ntya okusaba olukusa lw'omulimu olukyukakyuka (self-sponsored) nga mpita mu LMRA?",
    culturalGuidelinesQuery: "Mu Bahrain (ensi ya Musiramu), eby'ennono n'obuwangwa bw'okubeera n'okukola buki?",
    muslimCountryEtiquetteQuery: "Kiki kye nsaanidde okumanya ku mpisa n'ettikisa mu nsi ya Musiramu?",
    mentalHealthQuery: "Obuwagizi bw'obulamu obw'omutwe eri abagenyi mu Bahrain buli buki?",
    expatMentalHealthQuery: "Abagenyi bafikangayo bitya ku buweereza n'obuwagizi bw'obulamu obw'omutwe?",
    
    // Loading states
    aiThinking: "Umoja etegeeza...",
    connectionRetrying: "Okukolagana kuvumise, tukuddamu okugezaako…",
    connectionFallback: "Tulikyusiza mu nkola ey’egumiddwa",
    
    // Common
    loading: "Gitegekibwa...",
    error: "Ensobi",
    tryAgain: "Ddamu Okugezako",
    close: "Ggalawo",
    menu: "Menu",
    
    // KnowledgeBase specific
    overview: "Endabika",
    knowledgeBaseTitle: "📚 Ekintabizi ky'Amateeka g'Omulimu ga Bahrain",
    expatriateResidentKnowledgeBase: "📚 Ekintabizi ky'amawulire ag'abaana ab'omu byalo ababeera mu Bahrain",
    expatriateKnowledgeBaseSummary: "Ekiwulidwa ekikwatagana ekyokwawula ebyafaayo byonna byobulamu bwabaana ab'omu byalo mu Bahrain, wamu n'amateeka g'omulimu, ebyokukolagana mu buwangwa, obuyambi bw'obulamu bw'engulu, enkola za visa, ebifo ebyokubeera, ebyobulamu, ebyobwannannyini bw'ensimbi, okuyunga, obuyigirizwa n'ebifo ebyobuwangwa.",
    bahrainLabourLaw: "Amateeka g'Omulimu ga Bahrain",
    visaImmigration: "Visa ne Kugenda mu Bahrain",
    housingAccommodation: "Ebifo ebyokubeera n'okubeeramu",
    healthcareMedical: "Obulamu n'obujanjabi",
    bankingFinance: "Obwannannyini bw'ensimbi n'ensimbi",
    transportation: "Okuyunga",
    educationSchooling: "Obuyigirizwa n'essomero",
    hideDetails: "Kisa Ebintu",
    showAvailableTopics: "Laga Emitwe Egiriwo",
    selectCategoryMsg: "Londa ekibiina waggulu okunoonyereza ku mitwe egy’awamu ku bulamu bw’abagenyi mu Bahrain. Buli kimu kirimu amawulire ag’akola ku visa, ebyokubeera, eby’obulamu, bbanka, okutambula, eby’obuyigirize, obuwagizi bw’ekibiina n’amateeka g’omulimu.",
    source: "Ensulo",
    leaveBenefits: "Okuwummula n'Ebirungi",
    wagesPayment: "Omusaala n'Okusasula",
    disputes: "Enkaayana",
    termination: "Okumalako",
    employment: "Omulimu",
    overtime: "Ekiseera Ekiyongeddwa",
    
    // Footer specific (keeping English as requested)
    copyright: "© {year} CommunityAware. All rights reserved.",
    about: "About",
    terms: "Terms",
    privacy: "Privacy",
  },
  
  fr: {
    // Header
    umojaAware: "Umoja-Aware",
    
    // Navigation
    chat: "Chat",
    knowledgeBase: "Base de Connaissances",
    community: "Communauté",
    
    // Chat Interface
    typeYourMessage: "Tapez votre message ici...",
    send: "Envoyer",
    askQuestion: "Poser une question",
    howCanIHelp: "Comment puis-je vous aider avec les questions juridiques de Bahreïn aujourd'hui ?",
    selectCategory: "Sélectionner une catégorie (optionnel)",
    
    // Categories
    labourLaw: "Droit du Travail",
    companyFormation: "Formation d'Entreprise",
    visaServices: "Services de Visa",
    gracePeriod: "Période de Grâce",
    lmra: "LMRA",
    sijilat: "Sijilat",
    generalLegal: "Juridique Général",
    other: "Autre",
    culturalGuidelines: "Lignes Directrices Culturelles",
    mentalHealth: "Santé Mentale",
    culturalGuidelinesGuide: "Guide des Lignes Directrices Culturelles",
    muslimCountryEtiquette: "Étiquette en Pays Musulman",
    decencyLaws: "Lois de Décence",
    ramadanGuidelines: "Guide du Ramadan",
    prayerTimes: "Horaires de Prière",
    dressCode: "Code Vestimentaire",
    publicBehaviour: "Comportement Public",
    mentalHealthGuide: "Guide de Santé Mentale",
    expatMentalHealth: "Santé Mentale des Expatriés",
    counselingServices: "Services de Conseil et Thérapie",
    stressManagement: "Gestion du Stress",
    communitySupport: "Soutien Communautaire",
    emergencyContacts: "Contacts d'Urgence",
    
    // Knowledge Base
    bahrainLegalGuide: "Guide Juridique de Bahreïn",
    searchKnowledge: "Rechercher dans la base de connaissances...",
    labourLawGuide: "Guide du Droit du Travail",
    workingHours: "Heures de Travail et Heures Supplémentaires",
    salaryRegulations: "Salaire et Avantages",
    terminationRights: "Résiliation et Droits",
    businessGuide: "Guide de Formation d'Entreprise",
    companyRegistration: "Enregistrement d'Entreprise",
    licenseRequirements: "Exigences de Licence",
    sijillatProcess: "Processus d'Enregistrement Sijillat",
    visaGuide: "Guide de Visa et d'Immigration",
    residencePermit: "Permis de Résidence",
    workVisa: "Visa de Travail",
    visitorVisa: "Visa de Visiteur",
    
    // Community
    joinCommunity: "Rejoignez Notre Communauté",
    whatsappGroup: "Groupe WhatsApp",
    telegramChannel: "Canal Telegram",
    connectWithUs: "Connectez-vous avec nous sur les réseaux sociaux et restez informé des dernières informations juridiques.",
    
    // Footer
    disclaimer: "Avis de Non-Responsabilité",
    disclaimerText: "Cet outil fournit des informations juridiques générales et ne doit pas être considéré comme un conseil juridique professionnel. Pour des questions juridiques spécifiques, veuillez consulter des professionnels juridiques qualifiés.",
    cookiesNotice: "Nous utilisons des cookies pour améliorer votre expérience. En continuant à utiliser ce site, vous acceptez notre utilisation des cookies.",
    acceptCookies: "Accepter les Cookies",
    
    // Welcome message
    welcomeTitle: "Bienvenue sur CommunityAware",
    welcomeDescription: "Votre assistant IA spécialisé pour les expatriés vivant à Bahreïn. Je peux vous aider avec des informations sur les droits des employés, les réglementations salariales, les heures de travail, les procédures de licenciement et les questions connexes dans plusieurs langues!",
    
    // Predefined queries
    labourLawQuery: "Quels sont les droits fondamentaux des employés sous la loi du travail de Bahreïn?",
    companyFormationQuery: "Comment enregistrer une nouvelle entreprise à Bahreïn via Sijilat?",
    visaServicesQuery: "Quels documents ai-je besoin pour un visa d'affaires de Bahreïn?",
    lmraQuery: "Comment demander un permis de travail enregistré (auto-parrainé) via LMRA?",
    culturalGuidelinesQuery: "Quelles sont les lignes directrices culturelles pour vivre et travailler à Bahreïn en tant que pays musulman ?",
    muslimCountryEtiquetteQuery: "Que faut-il savoir sur l’étiquette et le comportement dans un pays musulman ?",
    mentalHealthQuery: "Quel soutien en santé mentale est disponible pour les expatriés au Bahreïn ?",
    expatMentalHealthQuery: "Comment les expatriés peuvent-ils accéder aux services et au soutien en santé mentale ?",
    
    // Loading states
    aiThinking: "Umoja réfléchit...",
    connectionRetrying: "Connexion interrompue, nouvelle tentative…",
    connectionFallback: "Passage en mode stable",
    
    // Common
    loading: "Chargement...",
    error: "Erreur",
    tryAgain: "Réessayer",
    close: "Fermer",
    menu: "Menu",
    
    // KnowledgeBase specific
    overview: "Aperçu",
    knowledgeBaseTitle: "📚 Base de Connaissances de la Loi du Travail de Bahreïn",
    expatriateResidentKnowledgeBase: "📚 Base de Connaissances pour Résidents Expatriés",
    expatriateKnowledgeBaseSummary: "Guide complet couvrant tous les aspects de la vie d'expatrié à Bahreïn, incluant les lois du travail, les directives culturelles, le soutien santé mentale, les procédures de visa, le logement, les soins de santé, les services bancaires, le transport, l'éducation et les ressources communautaires.",
    bahrainLabourLaw: "Loi du Travail de Bahreïn",
    visaImmigration: "Visa et Immigration",
    housingAccommodation: "Logement et Hébergement",
    healthcareMedical: "Santé et Soins Médicaux",
    bankingFinance: "Services Bancaires et Finance",
    transportation: "Transport",
    educationSchooling: "Éducation et Scolarité",
    hideDetails: "Masquer les Détails",
    showAvailableTopics: "Afficher les Sujets Disponibles",
    selectCategoryMsg: "Sélectionnez une catégorie ci‑dessus pour explorer des sujets complets sur la vie des expatriés à Bahreïn. Chaque entrée contient des informations pratiques couvrant les visas, le logement, la santé, la banque, le transport, l’éducation, le soutien communautaire et le droit du travail.",
    source: "Source",
    leaveBenefits: "Congés et Avantages",
    wagesPayment: "Salaires et Paiements",
    disputes: "Litiges",
    termination: "Résiliation",
    employment: "Emploi",
    overtime: "Heures Supplémentaires",
    
    // Footer specific
    copyright: "© {year} CommunityAware. Tous droits réservés.",
    about: "À Propos",
    terms: "Conditions",
    privacy: "Confidentialité",
  },
  
  tl: {
    // Header
    umojaAware: "Umoja-Aware",
    
    // Navigation
    chat: "Chat",
    knowledgeBase: "Batayan ng Kaalaman",
    community: "Komunidad",
    
    // Chat Interface
    typeYourMessage: "I-type ang iyong mensahe dito...",
    send: "Ipadala",
    askQuestion: "Magtanong ng tanong",
    howCanIHelp: "Paano kita matutulungan sa mga usaping legal sa Bahrain ngayon?",
    selectCategory: "Pumili ng kategorya (hindi sapilitan)",
    
    // Categories
    labourLaw: "Batas sa Paggawa",
    companyFormation: "Pagbuo ng Kumpanya",
    visaServices: "Mga Serbisyo ng Visa",
    gracePeriod: "Panahon ng Grasya",
    lmra: "LMRA",
    sijilat: "Sijilat",
    generalLegal: "Legal na Pangkalahatan",
    other: "Iba pa",
    culturalGuidelines: "Mga Patnubay sa Kultura",
    mentalHealth: "Kalusugang Pangkaisipan",
    culturalGuidelinesGuide: "Gabay sa Patnubay sa Kultura",
    muslimCountryEtiquette: "Etiketa sa Bansang Muslim",
    decencyLaws: "Mga Batas ng Kagandahang-Asal",
    ramadanGuidelines: "Gabay sa Ramadan",
    prayerTimes: "Oras ng Panalangin",
    dressCode: "Tamang Kasuotan",
    publicBehaviour: "Asal sa Publiko",
    mentalHealthGuide: "Gabay sa Kalusugang Pangkaisipan",
    expatMentalHealth: "Kalusugang Pangkaisipan ng mga Expat",
    counselingServices: "Serbisyong Pagpapayo at Therapy",
    stressManagement: "Pamamahala ng Stress",
    communitySupport: "Suporta ng Komunidad",
    emergencyContacts: "Mga Contact sa Emerhensiya",
    
    // Knowledge Base
    bahrainLegalGuide: "Gabay sa Batas ng Bahrain",
    searchKnowledge: "Maghanap ng kaalaman...",
    labourLawGuide: "Gabay sa Batas sa Paggawa",
    workingHours: "Mga Oras ng Trabaho at Overtime",
    salaryRegulations: "Sahod at mga Benepisyo",
    terminationRights: "Pagtatapos at mga Karapatan",
    businessGuide: "Gabay sa Pagtatayo ng Negosyo",
    companyRegistration: "Pagpaparehistro ng Kumpanya",
    licenseRequirements: "Mga Pangangailangan sa Lisensya",
    sijillatProcess: "Proseso ng Pagpaparehistro sa Sijilat",
    visaGuide: "Gabay sa Visa at Immigration",
    residencePermit: "Permit sa Pananatili",
    workVisa: "Work Visa",
    visitorVisa: "Visitor Visa",
    
    // Community
    joinCommunity: "Sumali sa Aming Komunidad",
    whatsappGroup: "WhatsApp Group",
    telegramChannel: "Telegram Channel",
    connectWithUs: "Makipag-ugnayan sa amin sa social media at manatiling updated sa pinakabagong legal na impormasyon.",
    
    // Footer (keeping English as requested)
    disclaimer: "Disclaimer",
    disclaimerText: "This tool provides general legal information and should not be considered as professional legal advice. For specific legal matters, please consult with qualified legal professionals.",
    cookiesNotice: "We use cookies to enhance your experience. By continuing to use this site, you agree to our use of cookies.",
    acceptCookies: "Accept Cookies",
    
    // Welcome message
    welcomeTitle: "Maligayang Pagdating sa CommunityAware",
    welcomeDescription: "Ang inyong dalubhasang AI na katulong para sa mga expatriate na naninirahan sa Bahrain. Makakatulong ako sa impormasyon tungkol sa mga karapatan ng empleyado, regulasyon sa suweldo, oras ng trabaho, pamamaraan sa pagtatapos, at kaugnay na mga bagay sa maraming wika!",
    
    // Predefined queries
    labourLawQuery: "Ano ang mga pangunahing karapatan ng empleyado sa ilalim ng batas sa paggawa ng Bahrain?",
    companyFormationQuery: "Paano ako makakapag-rehistro ng bagong kumpanya sa Bahrain sa pamamagitan ng Sijilat?",
    visaServicesQuery: "Anong mga dokumento ang kailangan ko para sa Bahrain business visa?",
    lmraQuery: "Paano ako mag-apply para sa registered worker permit (self-sponsored) sa pamamagitan ng LMRA?",
    culturalGuidelinesQuery: "Ano ang mga patnubay sa kultura para sa pamumuhay at pagtatrabaho sa Bahrain bilang bansang Muslim?",
    muslimCountryEtiquetteQuery: "Ano ang dapat malaman tungkol sa etiketa at asal sa bansang Muslim?",
    mentalHealthQuery: "Anong suporta sa kalusugang pangkaisipan ang makukuha ng mga expatriate sa Bahrain?",
    expatMentalHealthQuery: "Paano makakakuha ng serbisyo at suporta sa mental health ang mga expatriate?",
    
    // Loading states
    aiThinking: "Nag-iisip ang Umoja...",
    connectionRetrying: "Naantala ang koneksyon, muling sinusubukan…",
    connectionFallback: "Lumipat sa stable mode",
    
    // Common
    loading: "Nilo-load...",
    error: "Error",
    tryAgain: "Subukan Muli",
    close: "Isara",
    menu: "Menu",
    
    // KnowledgeBase specific
    overview: "Pangkalahatang-ideya",
    knowledgeBaseTitle: "📚 Batayan ng Kaalaman sa Batas sa Paggawa ng Bahrain",
    expatriateResidentKnowledgeBase: "📚 Batayan ng Kaalaman para sa mga Residenteng Expatriate",
    expatriateKnowledgeBaseSummary: "Kumpletong gabay na sumasaklaw sa lahat ng aspeto ng buhay expatriate sa Bahrain, kabilang ang mga batas sa paggawa, mga alituntunin sa kultura, suporta sa kalusugan ng isip, mga proseso ng visa, pabahay, pangangalagang medikal, mga serbisyo sa bangko, transportasyon, edukasyon at mga mapagkukunang pangkomunidad.",
    bahrainLabourLaw: "Batas sa Paggawa ng Bahrain",
    visaImmigration: "Visa at Imigrasyon",
    housingAccommodation: "Pabahay at Tuluyan",
    healthcareMedical: "Pangangalagang Medikal at Kalusugan",
    bankingFinance: "Pagbabangko at Pananalapi",
    transportation: "Transportasyon",
    educationSchooling: "Edukasyon at Pag-aaral",
    hideDetails: "Itago ang mga Detalye",
    showAvailableTopics: "Ipakita ang mga Available na Paksa",
    selectCategoryMsg: "Piliin ang isang kategorya sa itaas upang tuklasin ang komprehensibong mga paksa para sa buhay ng mga expatriate sa Bahrain. Bawat entry ay may praktikal na impormasyon na sumasaklaw sa visa, pabahay, pangangalagang pangkalusugan, pagbabangko, transportasyon, edukasyon, suporta ng komunidad at batas sa paggawa.",
    source: "Pinagmulan",
    leaveBenefits: "Leave at mga Benepisyo",
    wagesPayment: "Sahod at Bayad",
    disputes: "mga Alitan",
    termination: "Pagtatapos",
    employment: "Trabaho",
    overtime: "Overtime",
    
    // Footer specific (keeping English as requested)
    copyright: "© {year} CommunityAware. All rights reserved.",
    about: "About",
    terms: "Terms",
    privacy: "Privacy",
  },

  // Hindi
  hi: {
    umojaAware: "Umoja-Aware",
    chat: "चैट",
    knowledgeBase: "ज्ञान आधार",
    community: "समुदाय",
    typeYourMessage: "अपना संदेश यहाँ लिखें...",
    send: "भेजें",
    askQuestion: "प्रश्न पूछें",
    howCanIHelp: "आज मैं बहरीन के कानूनी मामलों में आपकी कैसे सहायता कर सकता हूँ?",
    selectCategory: "श्रेणी चुनें (वैकल्पिक)",
    labourLaw: "श्रम कानून",
    companyFormation: "कंपनी निर्माण",
    visaServices: "वीज़ा सेवाएं",
    gracePeriod: "अनुग्रह अवधि",
    lmra: "LMRA",
    sijilat: "सिजिलात",
    generalLegal: "सामान्य कानूनी",
    other: "अन्य",
    culturalGuidelines: "सांस्कृतिक दिशानिर्देश",
    mentalHealth: "मानसिक स्वास्थ्य",
    culturalGuidelinesGuide: "सांस्कृतिक दिशानिर्देश मार्गदर्शिका",
    muslimCountryEtiquette: "मुस्लिम देश में शिष्टाचार",
    decencyLaws: "शालीनता के कानून",
    ramadanGuidelines: "रमज़ान दिशानिर्देश",
    prayerTimes: "नमाज़/प्रार्थना के समय",
    dressCode: "पहनावे के नियम",
    publicBehaviour: "सार्वजनिक व्यवहार",
    mentalHealthGuide: "मानसिक स्वास्थ्य मार्गदर्शिका",
    expatMentalHealth: "प्रवासियों का मानसिक स्वास्थ्य",
    counselingServices: "परामर्श और थेरेपी सेवाएँ",
    stressManagement: "तनाव प्रबंधन",
    communitySupport: "समुदाय समर्थन",
    emergencyContacts: "आपातकालीन संपर्क",
    bahrainLegalGuide: "बहरीन कानूनी गाइड",
    searchKnowledge: "ज्ञान आधार खोजें...",
    labourLawGuide: "श्रम कानून गाइड",
    workingHours: "कार्य समय और ओवरटाइम",
    salaryRegulations: "वेतन और लाभ",
    terminationRights: "समाप्ति और अधिकार",
    businessGuide: "व्यापार निर्माण गाइड",
    companyRegistration: "कंपनी पंजीकरण",
    licenseRequirements: "लाइसेंस आवश्यकताएं",
    sijillatProcess: "सिजिलात पंजीकरण प्रक्रिया",
    visaGuide: "वीज़ा और आप्रवासन गाइड",
    residencePermit: "निवास परमिट",
    workVisa: "कार्य वीज़ा",
    visitorVisa: "आगंतुक वीज़ा",
    joinCommunity: "हमारे समुदाय में शामिल हों",
    whatsappGroup: "WhatsApp समूह",
    telegramChannel: "Telegram चैनल",
    connectWithUs: "सोशल मीडिया पर हमसे जुड़ें और नवीनतम कानूनी जानकारी के साथ अपडेट रहें।",
    disclaimer: "अस्वीकरण",
    disclaimerText: "यह उपकरण सामान्य कानूनी जानकारी प्रदान करता है और इसे व्यावसायिक कानूनी सलाह नहीं माना जाना चाहिए। विशिष्ट कानूनी मामलों के लिए, कृपया योग्य कानूनी पेशेवरों से सलाह लें।",
    cookiesNotice: "हम आपके अनुभव को बेहतर बनाने के लिए कुकीज़ का उपयोग करते हैं। इस साइट का उपयोग जारी रखकर, आप हमारे कुकीज़ के उपयोग से सहमत हैं।",
    acceptCookies: "कुकीज़ स्वीकार करें",
    welcomeTitle: "Umoja-Aware में आपका स्वागत है",
    welcomeDescription: "बहरीन में रहने वाले प्रवासियों के लिए आपका विशेषज्ञ AI सहायक। मैं कर्मचारी अधिकारों, वेतन विनियमों, कार्य समय, समाप्ति प्रक्रियाओं और संबंधित मामलों की जानकारी कई भाषाओं में दे सकता हूं!",
    labourLawQuery: "बहरीन श्रम कानून के तहत कर्मचारी के बुनियादी अधिकार क्या हैं?",
    companyFormationQuery: "सिजिलात के माध्यम से बहरीन में नई कंपनी कैसे पंजीकृत करूं?",
    visaServicesQuery: "बहरीन व्यापार वीज़ा के लिए मुझे कौन से दस्तावेज चाहिए?",
    lmraQuery: "LMRA के माध्यम से लचीले कार्य परमिट (स्वयं प्रायोजित) के लिए कैसे आवेदन करूं?",
    culturalGuidelinesQuery: "मुस्लिम देश होने के कारण बहरीन में रहने और काम करने के सांस्कृतिक दिशानिर्देश क्या हैं?",
    muslimCountryEtiquetteQuery: "मुस्लिम देश में शिष्टाचार और व्यवहार के बारे में मुझे क्या जानना चाहिए?",
    mentalHealthQuery: "बहरीन में प्रवासियों के लिए कौन‑सी मानसिक स्वास्थ्य सहायता उपलब्ध है?",
    expatMentalHealthQuery: "प्रवासी मानसिक स्वास्थ्य सेवाएँ और सहायता कैसे प्राप्त कर सकते हैं?",
    aiThinking: "Umoja सोच रहा है...",
    connectionRetrying: "कनेक्शन बाधित, पुनः प्रयास हो रहा है…",
    connectionFallback: "स्थिर मोड में स्विच किया गया",
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    tryAgain: "फिर कोशिश करें",
    close: "बंद करें",
    menu: "मेनू",
    overview: "अवलोकन",
    knowledgeBaseTitle: "📚 बहरीन श्रम कानून ज्ञान आधार",
    expatriateResidentKnowledgeBase: "📚 प्रवासी निवासी ज्ञान आधार",
    expatriateKnowledgeBaseSummary: "बहरीन में प्रवासी जीवन के सभी पहलुओं को कवर करने वाला व्यापक गाइड, जिसमें श्रम कानून, सांस्कृतिक दिशानिर्देश, मानसिक स्वास्थ्य सहायता, वीजा प्रक्रिया, आवास, स्वास्थ्य सेवा, बैंकिंग सेवाएं, परिवहन, शिक्षा और सामुदायिक संसाधन शामिल हैं।",
    bahrainLabourLaw: "बहरीन श्रम कानून",
    visaImmigration: "वीजा और आव्रजन",
    housingAccommodation: "आवास और निवास",
    healthcareMedical: "स्वास्थ्य सेवा और चिकित्सा",
    bankingFinance: "बैंकिंग और वित्त",
    transportation: "परिवहन",
    educationSchooling: "शिक्षा और स्कूली",
    hideDetails: "विवरण छुपाएं",
    showAvailableTopics: "उपलब्ध विषय दिखाएं",
    selectCategoryMsg: "ऊपर दी गई श्रेणी चुनें ताकि बहरीन में प्रवासी जीवन के व्यापक विषयों का अन्वेषण कर सकें। प्रत्येक प्रविष्टि में वीज़ा, आवास, स्वास्थ्य सेवाओं, बैंकिंग, परिवहन, शिक्षा, सामुदायिक समर्थन और श्रम कानूनों सहित व्यावहारिक जानकारी होती है।",
    source: "स्रोत",
    leaveBenefits: "छुट्टी और लाभ",
    wagesPayment: "मजदूरी और भुगतान",
    disputes: "विवाद",
    termination: "समाप्ति",
    employment: "रोजगार",
    overtime: "ओवरटाइम",
    copyright: "© {year} Umoja-Aware. सभी अधिकार सुरक्षित।",
    about: "के बारे में",
    terms: "शर्तें",
    privacy: "गोपनीयता",
  },

  // Urdu (RTL language)
  ur: {
    umojaAware: "Umoja-Aware",
    chat: "چیٹ",
    knowledgeBase: "علم کا ذخیرہ",
    community: "کمیونٹی",
    typeYourMessage: "اپنا پیغام یہاں ٹائپ کریں...",
    send: "بھیجیں",
    askQuestion: "سوال پوچھیں",
    howCanIHelp: "آج میں بحرین کے قانونی معاملات میں آپ کی کیسے مدد کر سکتا ہوں؟",
    selectCategory: "زمرہ منتخب کریں (اختیاری)",
    labourLaw: "لیبر لاء",
    companyFormation: "کمپنی کی تشکیل",
    visaServices: "ویزا کی خدمات",
    gracePeriod: "رحمت کی مدت",
    lmra: "LMRA",
    sijilat: "سجلات",
    generalLegal: "عمومی قانونی",
    other: "دیگر",
    culturalGuidelines: "ثقافتی رہنما اصول",
    mentalHealth: "ذہنی صحت",
    culturalGuidelinesGuide: "ثقافتی رہنمائی گائیڈ",
    muslimCountryEtiquette: "مسلم ملک میں آداب",
    decencyLaws: "شائستگی کے قوانین",
    ramadanGuidelines: "رمضان رہنمائی",
    prayerTimes: "نماز کے اوقات",
    dressCode: "لباس کے اصول",
    publicBehaviour: "عوامی رویہ",
    mentalHealthGuide: "ذہنی صحت گائیڈ",
    expatMentalHealth: "غیرملکیوں کی ذہنی صحت",
    counselingServices: "کاؤنسلنگ اور تھراپی خدمات",
    stressManagement: "تناؤ کا انتظام",
    communitySupport: "برادری کی مدد",
    emergencyContacts: "ایمرجنسی رابطے",
    bahrainLegalGuide: "بحرین قانونی رہنما",
    searchKnowledge: "علم کا ذخیرہ تلاش کریں...",
    labourLawGuide: "لیبر لاء گائیڈ",
    workingHours: "کام کے اوقات اور اوور ٹائم",
    salaryRegulations: "تنخواہ اور فوائد",
    terminationRights: "برطرفی اور حقوق",
    businessGuide: "کاروبار کی تشکیل کا رہنما",
    companyRegistration: "کمپنی کا اندراج",
    licenseRequirements: "لائسنس کی ضروریات",
    sijillatProcess: "سجلات رجسٹریشن کا عمل",
    visaGuide: "ویزا اور امیگریشن گائیڈ",
    residencePermit: "رہائشی اجازہ",
    workVisa: "ورک ویزا",
    visitorVisa: "زائر ویزا",
    joinCommunity: "ہماری کمیونٹی میں شامل ہوں",
    whatsappGroup: "WhatsApp گروپ",
    telegramChannel: "Telegram چینل",
    connectWithUs: "سوشل میڈیا پر ہم سے جڑیں اور تازہ ترین قانونی معلومات کے ساتھ اپڈیٹ رہیں۔",
    disclaimer: "اعلان برائت",
    disclaimerText: "یہ ٹول عمومی قانونی معلومات فراہم کرتا ہے اور اسے پیشہ ورانہ قانونی مشورہ نہیں سمجھا جانا چاہیے۔ مخصوص قانونی معاملات کے لیے، براہ کرم قابل قانونی پیشہ ور افراد سے مشورہ لیں۔",
    cookiesNotice: "ہم آپ کا تجربہ بہتر بنانے کے لیے کوکیز استعمال کرتے ہیں۔ اس سائٹ کا استعمال جاری رکھ کر، آپ ہمارے کوکیز کے استعمال سے اتفاق کرتے ہیں۔",
    acceptCookies: "کوکیز قبول کریں",
    welcomeTitle: "Umoja-Aware میں آپ کا خیر مقدم",
    welcomeDescription: "بحرین میں مقیم غیر ملکیوں کے لیے آپ کا مخصوصی AI اسسٹنٹ۔ میں ملازمین کے حقوق، تنخواہ کے ضوابط، کام کے اوقات، برطرفی کے طریقہ کار اور متعلقہ امور کی معلومات متعدد زبانوں میں فراہم کر سکتا ہوں!",
    labourLawQuery: "بحرین لیبر لاء کے تحت ملازم کے بنیادی حقوق کیا ہیں؟",
    companyFormationQuery: "سجلات کے ذریعے بحرین میں نئی کمپنی کیسے رجسٹر کروں؟",
    visaServicesQuery: "بحرین کاروباری ویزا کے لیے مجھے کون سے دستاویزات درکار ہیں؟",
    lmraQuery: "LMRA کے ذریعے لچکدار ورک پرمٹ (خود کفالت) کے لیے کیسے درخواست دوں؟",
    culturalGuidelinesQuery: "مسلم ملک ہونے کی وجہ سے بحرین میں رہنے اور کام کرنے کے ثقافتی رہنما اصول کیا ہیں؟",
    muslimCountryEtiquetteQuery: "مسلم ملک میں آداب اور رویے کے بارے میں مجھے کیا جاننا چاہیے؟",
    mentalHealthQuery: "بحرین میں غیرملکیوں کے لیے کون سی ذہنی صحت معاونت دستیاب ہے؟",
    expatMentalHealthQuery: "غیرملکی ذہنی صحت کی خدمات اور معاونت تک کیسے رسائی حاصل کر سکتے ہیں؟",
    aiThinking: "Umoja سوچ رہا ہے...",
    connectionRetrying: "کنکشن منقطع، دوبارہ کوشش جاری…",
    connectionFallback: "مستحکم موڈ پر منتقل",
    loading: "لوڈ ہو رہا ہے...",
    error: "خرابی",
    tryAgain: "دوبارہ کوشش کریں",
    close: "بند کریں",
    menu: "مینو",
    overview: "جائزہ",
    knowledgeBaseTitle: "📚 بحرین لیبر لاء علم کا ذخیرہ",
    expatriateResidentKnowledgeBase: "📚 مقیم غیر ملکیوں کا علمی ذخیرہ",
    expatriateKnowledgeBaseSummary: "بحرین میں غیر ملکی زندگی کے تمام پہلوؤں کو covering جامع گائیڈ، جس میں لیبر قوانین، ثقافتی رہنما خطوط، ذہنی صحت کی معاونت، ویزا کے عمل، رہائش، صحت کی دیکھ بھال، بینکنگ خدمات، نقل و حمل، تعلیم اور کمیونٹی وسائل شامل ہیں۔",
    bahrainLabourLaw: "بحرین لیبر قانون",
    visaImmigration: "ویزا اور امیگریشن",
    housingAccommodation: "رہائش اور قیام",
    healthcareMedical: "صحت کی دیکھ بھال اور طبی",
    bankingFinance: "بینکنگ اور مالیات",
    transportation: "نقل و حمل",
    educationSchooling: "تعلیم اور اسکولی",
    hideDetails: "تفصیلات چھپائیں",
    showAvailableTopics: "دستیاب موضوعات دکھائیں",
    selectCategoryMsg: "اوپر دی گئی زمرہ منتخب کریں تاکہ بحرین میں غیرملکی زندگی کے جامع موضوعات کو دریافت کیا جا سکے۔ ہر اندراج میں عملی معلومات شامل ہوتی ہیں جن میں ویزا، رہائش، صحت کی دیکھ بھال، بینکاری، نقل و حمل، تعلیم، کمیونٹی تعاون اور مزدور قوانین شامل ہیں۔",
    source: "ذریعہ",
    leaveBenefits: "چھٹی اور فوائد",
    wagesPayment: "اجرت اور ادائیگی",
    disputes: "تنازعات",
    termination: "برطرفی",
    employment: "ملازمت",
    overtime: "اوور ٹائم",
    copyright: "© {year} Umoja-Aware. تمام حقوق محفوظ ہیں۔",
    about: "کے بارے میں",
    terms: "شرائط",
    privacy: "رازداری",
  },

  // Portuguese
  pt: {
    umojaAware: "Umoja-Aware",
    chat: "Chat",
    knowledgeBase: "Base de Conhecimento",
    community: "Comunidade",
    typeYourMessage: "Digite sua mensagem aqui...",
    send: "Enviar",
    askQuestion: "Fazer uma pergunta",
    howCanIHelp: "Como posso ajudá-lo com questões legais do Bahrein hoje?",
    selectCategory: "Selecione uma categoria (opcional)",
    labourLaw: "Lei Trabalhista",
    companyFormation: "Formação de Empresa",
    visaServices: "Serviços de Visto",
    gracePeriod: "Período de Graça",
    lmra: "LMRA",
    sijilat: "Sijilat",
    generalLegal: "Legal Geral",
    other: "Outro",
    culturalGuidelines: "Diretrizes Culturais",
    mentalHealth: "Saúde Mental",
    culturalGuidelinesGuide: "Guia de Diretrizes Culturais",
    muslimCountryEtiquette: "Etiqueta em País Muçulmano",
    decencyLaws: "Leis de Decoro",
    ramadanGuidelines: "Guia do Ramadã",
    prayerTimes: "Horários de Oração",
    dressCode: "Código de Vestimenta",
    publicBehaviour: "Comportamento Público",
    mentalHealthGuide: "Guia de Saúde Mental",
    expatMentalHealth: "Saúde Mental de Expatriados",
    counselingServices: "Serviços de Aconselhamento e Terapia",
    stressManagement: "Gestão de Estresse",
    communitySupport: "Apoio da Comunidade",
    emergencyContacts: "Contatos de Emergência",
    bahrainLegalGuide: "Guia Legal do Bahrein",
    searchKnowledge: "Pesquisar base de conhecimento...",
    labourLawGuide: "Guia da Lei Trabalhista",
    workingHours: "Horário de Trabalho e Horas Extras",
    salaryRegulations: "Salário e Benefícios",
    terminationRights: "Rescisão e Direitos",
    businessGuide: "Guia de Formação de Empresa",
    companyRegistration: "Registro da Empresa",
    licenseRequirements: "Requisitos de Licença",
    sijillatProcess: "Processo de Registro Sijillat",
    visaGuide: "Guia de Visto e Imigração",
    residencePermit: "Autorização de Residência",
    workVisa: "Visto de Trabalho",
    visitorVisa: "Visto de Visitante",
    joinCommunity: "Junte-se à Nossa Comunidade",
    whatsappGroup: "Grupo WhatsApp",
    telegramChannel: "Canal Telegram",
    connectWithUs: "Conecte-se conosco nas redes sociais e mantenha-se atualizado com as últimas informações legais.",
    disclaimer: "Isenção de Responsabilidade",
    disclaimerText: "Esta ferramenta fornece informações legais gerais e não deve ser considerada como aconselhamento jurídico profissional. Para questões legais específicas, consulte profissionais jurídicos qualificados.",
    cookiesNotice: "Usamos cookies para melhorar sua experiência. Ao continuar usando este site, você concorda com nosso uso de cookies.",
    acceptCookies: "Aceitar Cookies",
    welcomeTitle: "Bem-vindo ao Umoja-Aware",
    welcomeDescription: "Seu assistente especializado em IA para expatriados que vivem no Bahrein. Posso ajudá-lo com informações sobre direitos dos empregados, regulamentações salariais, horas de trabalho, procedimentos de rescisão e assuntos relacionados em vários idiomas!",
    labourLawQuery: "Quais são os direitos básicos dos funcionários sob a lei trabalhista do Bahrein?",
    companyFormationQuery: "Como registrar uma nova empresa no Bahrein através do Sijilat?",
    visaServicesQuery: "Quais documentos preciso para um visto de negócios do Bahrein?",
    lmraQuery: "Como solicitar uma autorização de trabalho flexível (autopatrocinada) através do LMRA?",
    culturalGuidelinesQuery: "Quais são as diretrizes culturais para viver e trabalhar no Bahrein como um país muçulmano?",
    muslimCountryEtiquetteQuery: "O que devo saber sobre etiqueta e comportamento em um país muçulmano?",
    mentalHealthQuery: "Que apoio de saúde mental está disponível para expatriados no Bahrein?",
    expatMentalHealthQuery: "Como os expatriados podem acessar serviços e apoio de saúde mental?",
    aiThinking: "Umoja está pensando...",
    connectionRetrying: "Conexão interrompida, tentando novamente…",
    connectionFallback: "Alternado para modo estável",
    loading: "Carregando...",
    error: "Erro",
    tryAgain: "Tentar Novamente",
    close: "Fechar",
    menu: "Menu",
    overview: "Visão Geral",
    knowledgeBaseTitle: "📚 Base de Conhecimento da Lei Trabalhista do Bahrein",
    expatriateResidentKnowledgeBase: "📚 Base de Conhecimento para Residentes Expatriados",
    expatriateKnowledgeBaseSummary: "Guia abrangente que cobre todos os aspectos da vida de expatriados no Bahrein, incluindo leis trabalhistas, diretrizes culturais, apoio à saúde mental, processos de visto, moradia, cuidados de saúde, serviços bancários, transporte, educação e recursos comunitários.",
    bahrainLabourLaw: "Lei Trabalhista do Bahrein",
    visaImmigration: "Vistos e Imigração",
    housingAccommodation: "Moradia e Acomodação",
    healthcareMedical: "Saúde e Cuidados Médicos",
    bankingFinance: "Banca e Finanças",
    transportation: "Transporte",
    educationSchooling: "Educação e Escolarização",
    hideDetails: "Ocultar Detalhes",
    showAvailableTopics: "Mostrar Tópicos Disponíveis",
    selectCategoryMsg: "Selecione uma categoria acima para explorar tópicos específicos na Lei Trabalhista do Bahrein. Cada entrada contém informações oficiais com referências de artigos da Lei Trabalhista do Bahrein para o Setor Privado.",
    source: "Fonte",
    leaveBenefits: "Licenças e Benefícios",
    wagesPayment: "Salários e Pagamentos",
    disputes: "Disputas",
    termination: "Rescisão",
    employment: "Emprego",
    overtime: "Horas Extras",
    copyright: "© {year} Umoja-Aware. Todos os direitos reservados.",
    about: "Sobre",
    terms: "Termos",
    privacy: "Privacidade",
  },
  
  sw: {
    // Header
    umojaAware: "Umoja-Aware",
    
    // Navigation
    chat: "Mazungumzo",
    knowledgeBase: "Maktaba ya Maarifa",
    community: "Jumuiya",
    
    // Chat Interface
    typeYourMessage: "Andika ujumbe wako hapa...",
    send: "Tuma",
    askQuestion: "Uliza swali",
    howCanIHelp: "Ninawezaje kukusaidia na mambo ya kisheria ya Bahrain leo?",
    selectCategory: "Chagua kategoria (si lazima)",
    
    // Categories
    labourLaw: "Sheria za Kazi",
    companyFormation: "Kuanzisha Kampuni",
    visaServices: "Huduma za Visa",
    gracePeriod: "Kipindi cha Neema",
    lmra: "LMRA",
    sijilat: "Sijilat",
    generalLegal: "Sheria za Kawaida",
    other: "Nyingine",
    culturalGuidelines: "Miongozo ya Utamaduni",
    mentalHealth: "Afya ya Akili",
    culturalGuidelinesGuide: "Mwongozo wa Miongozo ya Utamaduni",
    muslimCountryEtiquette: "Etiquette ya Nchi ya Kiislamu",
    decencyLaws: "Sheria za Heshima na Maadili",
    ramadanGuidelines: "Mwongozo wa Ramadhani",
    prayerTimes: "Nyakati za Sala",
    dressCode: "Kanuni ya Mavazi",
    publicBehaviour: "Tabia ya Umma",
    mentalHealthGuide: "Mwongozo wa Afya ya Akili",
    expatMentalHealth: "Afya ya Akili ya Wahamiaji",
    counselingServices: "Huduma za Ushauri na Tiba",
    stressManagement: "Usimamizi wa Msongo",
    communitySupport: "Msaada wa Jamii",
    emergencyContacts: "Mawasiliano ya Dharura",
    
    // Knowledge Base
    bahrainLegalGuide: "Mwongozo wa Kisheria wa Bahrain",
    searchKnowledge: "Tafuta katika maktaba ya maarifa...",
    labourLawGuide: "Mwongozo wa Sheria za Kazi",
    workingHours: "Masaa ya Kazi na Ziada",
    salaryRegulations: "Mshahara na Faida",
    terminationRights: "Kumaliza Kazi na Haki",
    businessGuide: "Mwongozo wa Kuanzisha Biashara",
    companyRegistration: "Usajili wa Kampuni",
    licenseRequirements: "Mahitaji ya Leseni",
    sijillatProcess: "Mchakato wa Usajili wa Sijillat",
    visaGuide: "Mwongozo wa Visa na Uhamiaji",
    residencePermit: "Kibali cha Makazi",
    workVisa: "Visa ya Kazi",
    visitorVisa: "Visa ya Mgeni",
    
    // Community
    joinCommunity: "Jiunge na Jumuiya Yetu",
    whatsappGroup: "Kikundi cha WhatsApp",
    telegramChannel: "Chaneli ya Telegram",
    connectWithUs: "Ungana nasi kwenye mitandao ya kijamii ili upate habari za hivi karibuni za kisheria.",
    
    // Footer
    disclaimer: "Onyo",
    disclaimerText: "Chombo hiki kinatoa habari za jumla za kisheria na hakipaswi kuchukuliwa kama ushauri wa kisheria wa kitaalamu. Kwa mambo maalum ya kisheria, tafadhali ongea na wataalamu wa kisheria waliohitimu.",
    cookiesNotice: "Tunatumia kuki ili kuboresha uzoefu wako. Kwa kuendelea kutumia tovuti hii, unakubali matumizi yetu ya kuki.",
    acceptCookies: "Kubali Kuki",
    
    // Welcome message
    welcomeTitle: "Karibu Umoja-Aware",
    welcomeDescription: "Karibu Umoja-Aware\n\nMsaidizi wako maalum wa AI kwa Sheria za Kazi za Sekta Binafsi ya Bahrain. Ninaweza kukusaidia na habari kuhusu haki za wafanyakazi, kanuni za mishahara, masaa ya kazi, na taratibu za kumaliza kazi kwa lugha nyingi. Pata mwongozo wa kitaalamu juu ya mambo yote ya sheria za kazi!",
    
    // Predefined queries
    labourLawQuery: "Haki za kimsingi za wafanyakazi ni zipi chini ya sheria za kazi za Bahrain?",
    companyFormationQuery: "Ninajenga kampuni mpya Bahrain kupitia Sijilat?",
    visaServicesQuery: "Ninahitaji nyaraka gani kwa visa ya biashara ya Bahrain?",
    lmraQuery: "Ninaomba vipi kibali cha kazi chenye kubadilika kupitia LMRA?",
    culturalGuidelinesQuery: "Ni miongozo gani ya kitamaduni ya kuishi na kufanya kazi Bahrain kama nchi ya Kiislamu?",
    muslimCountryEtiquetteQuery: "Ni nini kinachopaswa kujulikana kuhusu heshima na tabia katika nchi ya Kiislamu?",
    mentalHealthQuery: "Ni msaada gani wa afya ya akili upo kwa wahamiaji Bahrain?",
    expatMentalHealthQuery: "Wahamiaji wanawezaje kupata huduma na msaada wa afya ya akili?",
    
    // Loading states
    aiThinking: "Umoja inafikiria...",
    connectionRetrying: "Muunganisho umevurugika, inajaribu tena…",
    connectionFallback: "Imebadilishwa hadi hali thabiti",
    
    // Common
    loading: "Inapakia...",
    error: "Hitilafu",
    tryAgain: "Jaribu Tena",
    close: "Funga",
    menu: "Menyu",
    
    // KnowledgeBase specific
    overview: "Muhtasari",
    knowledgeBaseTitle: "📚 Maktaba ya Maarifa ya Sheria za Kazi za Bahrain",
    expatriateResidentKnowledgeBase: "📚 Maktaba ya Maarifa kwa Wakaazi Wageni",
    expatriateKnowledgeBaseSummary: "Mwongozo kamili unaotafuta masafa yote ya maisha ya wageni katika Bahrain, akiwa ni pamoja na sheria za kazi, mwongozo wa kitamaduni, usaidizi wa afya ya akili, mchakato wa visa, makazi, huduma za afya, huduma za benki, usafiri, elimu na rasilimali za jamii.",
    bahrainLabourLaw: "Sheria za Kazi za Bahrain",
    visaImmigration: "Visa na Uhamiaji",
    housingAccommodation: "Makazi na Malazi",
    healthcareMedical: "Huduma za Afya na Matibabu",
    bankingFinance: "Benki na Fedha",
    transportation: "Usafiri",
    educationSchooling: "Elimu na Shule",
    hideDetails: "Ficha Maelezo",
    showAvailableTopics: "Onyesha Mada Zinazopatikana",
    selectCategoryMsg: "Chagua kategoria hapo juu ili kuchunguza mada pana za maisha ya wahamiaji nchini Bahrain. Kila ingizo lina taarifa za vitendo zinazohusu visa, makazi, afya, benki, usafiri, elimu, msaada wa jamii na sheria za kazi.",
    source: "Chanzo",
    leaveBenefits: "Likizo na Faida",
    wagesPayment: "Mishahara na Malipo",
    disputes: "Migogoro",
    termination: "Kumaliza",
    employment: "Ajira",
    overtime: "Masaa ya Ziada",
    
    // Footer specific
    copyright: "© {year} Umoja-Aware. Haki zote zimehifadhiwa.",
    about: "Kuhusu",
    terms: "Masharti",
    privacy: "Faragha",
  },

  // Russian
  ru: {
    // Header
    umojaAware: "Umoja-Aware",
    
    // Navigation
    chat: "Чат",
    knowledgeBase: "База знаний",
    community: "Сообщество",
    
    // Chat Interface
    typeYourMessage: "Введите ваше сообщение здесь...",
    send: "Отправить",
    askQuestion: "Задать вопрос",
    howCanIHelp: "Как я могу помочь вам с правовыми вопросами Бахрейна сегодня?",
    selectCategory: "Выберите категорию (необязательно)",
    
    // Categories
    labourLaw: "Трудовое право",
    companyFormation: "Создание компании",
    visaServices: "Визовые услуги",
    gracePeriod: "Льготный период",
    lmra: "LMRA",
    sijilat: "Sijilat",
    generalLegal: "Общее право",
    other: "Другое",
    culturalGuidelines: "Культурные рекомендации",
    mentalHealth: "Психическое здоровье",
    culturalGuidelinesGuide: "Руководство по культурным рекомендациям",
    muslimCountryEtiquette: "Этикет в мусульманской стране",
    decencyLaws: "Законы о приличиях",
    ramadanGuidelines: "Руководство по Рамадану",
    prayerTimes: "Время молитв",
    dressCode: "Дресс‑код",
    publicBehaviour: "Поведение в общественных местах",
    mentalHealthGuide: "Руководство по психическому здоровью",
    expatMentalHealth: "Психическое здоровье экспатов",
    counselingServices: "Услуги консультирования и терапии",
    stressManagement: "Управление стрессом",
    communitySupport: "Поддержка сообщества",
    emergencyContacts: "Экстренные контакты",
    
    // Knowledge Base
    bahrainLegalGuide: "Правовое руководство по Бахрейну",
    searchKnowledge: "Поиск в базе знаний...",
    labourLawGuide: "Руководство по трудовому праву",
    workingHours: "Рабочие часы и сверхурочная работа",
    salaryRegulations: "Заработная плата и льготы",
    terminationRights: "Увольнение и права",
    businessGuide: "Руководство по созданию бизнеса",
    companyRegistration: "Регистрация компании",
    licenseRequirements: "Требования к лицензии",
    sijillatProcess: "Процесс регистрации Sijillat",
    visaGuide: "Руководство по визам и иммиграции",
    residencePermit: "Разрешение на проживание",
    workVisa: "Рабочая виза",
    visitorVisa: "Гостевая виза",
    
    // Community
    joinCommunity: "Присоединяйтесь к нашему сообществу",
    whatsappGroup: "Группа WhatsApp",
    telegramChannel: "Канал Telegram",
    connectWithUs: "Свяжитесь с нами в социальных сетях и будьте в курсе последних правовых новостей.",
    
    // Footer
    disclaimer: "Отказ от ответственности",
    disclaimerText: "Этот инструмент предоставляет общую правовую информацию и не должен рассматриваться как профессиональная юридическая консультация. По конкретным правовым вопросам обращайтесь к квалифицированным юридическим специалистам.",
    cookiesNotice: "Мы используем файлы cookie для улучшения вашего опыта. Продолжая использовать этот сайт, вы соглашаетесь на использование наших файлов cookie.",
    acceptCookies: "Принять файлы cookie",
    
    // Welcome message
    welcomeTitle: "Добро пожаловать в Umoja-Aware",
    welcomeDescription: "Ваш специализированный AI-ассистент для экспатриантов, живущих в Бахрейне. Я могу помочь вам с информацией о правах сотрудников, зарплатных правилах, рабочих часах, процедурах увольнения и связанных вопросах на нескольких языках!",
    
    // Predefined queries
    labourLawQuery: "Какие основные права сотрудников согласно трудовому законодательству Бахрейна?",
    companyFormationQuery: "Как зарегистрировать новую компанию в Бахрейне через Sijilat?",
    visaServicesQuery: "Какие документы мне нужны для деловой визы в Бахрейн?",
    lmraQuery: "Как подать заявление на гибкое разрешение на работу (самофинансируемое) через LMRA?",
    culturalGuidelinesQuery: "Какие культурные рекомендации для жизни и работы в Бахрейне как в мусульманской стране?",
    muslimCountryEtiquetteQuery: "Что следует знать об этикете и поведении в мусульманской стране?",
    mentalHealthQuery: "Какая поддержка в сфере психического здоровья доступна экспатам в Бахрейне?",
    expatMentalHealthQuery: "Как экспаты могут получить услуги и поддержку по психическому здоровью?",
    
    // Loading states
    aiThinking: "Umoja думает...",
    connectionRetrying: "Соединение прервано, повторная попытка...",
    connectionFallback: "Переключено в стабильный режим",
    
    // Common
    loading: "Загрузка...",
    error: "Ошибка",
    tryAgain: "Попробовать снова",
    close: "Закрыть",
    menu: "Меню",
    
    // KnowledgeBase specific
    overview: "Обзор",
    knowledgeBaseTitle: "📚 База знаний трудового права Бахрейна",
    expatriateResidentKnowledgeBase: "📚 База знаний для экспатриантов-резидентов",
    expatriateKnowledgeBaseSummary: "Комплексное руководство, охватывающее все аспекты жизни экспатриантов в Бахрейне, включая трудовое законодательство, культурные рекомендации, поддержку психического здоровья, визовые процессы, жильё, здравоохранение, банковские услуги, транспорт, образование и общественные ресурсы.",
    bahrainLabourLaw: "Трудовое законодательство Бахрейна",
    visaImmigration: "Визы и иммиграция",
    housingAccommodation: "Жильё и размещение",
    healthcareMedical: "Здравоохранение и медицина",
    bankingFinance: "Банковские услуги и финансы",
    transportation: "Транспорт",
    educationSchooling: "Образование и обучение",
    hideDetails: "Скрыть детали",
    showAvailableTopics: "Показать доступные темы",
    selectCategoryMsg: "Выберите категорию выше, чтобы изучить комплексные темы жизни экспатов в Бахрейне. Каждая запись содержит практическую информацию по визам, жилью, здравоохранению, банковским услугам, транспорту, образованию, поддержке сообщества и трудовому законодательству.",
    source: "Источник",
    leaveBenefits: "Отпуск и льготы",
    wagesPayment: "Заработная плата и выплаты",
    disputes: "Споры",
    termination: "Увольнение",
    employment: "Трудоустройство",
    overtime: "Сверхурочная работа",
    
    // Footer specific
    copyright: "© {year} Umoja-Aware. Все права защищены.",
    about: "О нас",
    terms: "Условия",
    privacy: "Конфиденциальность",
  },

  // Bengali
  bn: {
    // Header
    umojaAware: "Umoja-Aware",
    
    // Navigation
    chat: "চ্যাট",
    knowledgeBase: "নলেজ বেস",
    community: "সম্প্রদায়",
    
    // Chat Interface
    typeYourMessage: "আপনার বার্তা এখানে টাইপ করুন...",
    send: "পাঠান",
    askQuestion: "প্রশ্ন জিজ্ঞাসা করুন",
    howCanIHelp: "আজ আমি কিভাবে বাহরাইন আইনি বিষয়ে আপনাকে সাহায্য করতে পারি?",
    selectCategory: "বিভাগ নির্বাচন করুন (ঐচ্ছিক)",
    
    // Categories
    labourLaw: "শ্রম আইন",
    companyFormation: "কোম্পানি গঠন",
    visaServices: "ভিসা পরিষেবা",
    gracePeriod: "গ্রেস পিরিয়ড",
    lmra: "LMRA",
    sijilat: "সিজিলাত",
    generalLegal: "সাধারণ আইনি",
    other: "অন্যান্য",
    culturalGuidelines: "সাংস্কৃতিক নির্দেশিকা",
    mentalHealth: "মানসিক স্বাস্থ্য",
    culturalGuidelinesGuide: "সাংস্কৃতিক নির্দেশিকার গাইড",
    muslimCountryEtiquette: "মুসলিম দেশে শিষ্টাচার",
    decencyLaws: "শালীনতার আইন",
    ramadanGuidelines: "রমজান নির্দেশিকা",
    prayerTimes: "নামাজের সময়",
    dressCode: "পোশাকের নিয়ম",
    publicBehaviour: "সার্বজনীন আচরণ",
    mentalHealthGuide: "মানসিক স্বাস্থ্য গাইড",
    expatMentalHealth: "প্রবাসীদের মানসিক স্বাস্থ্য",
    counselingServices: "পরামর্শ ও থেরাপি পরিষেবা",
    stressManagement: "স্ট্রেস ব্যবস্থাপনা",
    communitySupport: "সম্প্রদায়ের সহায়তা",
    emergencyContacts: "জরুরি যোগাযোগ",
    
    // Knowledge Base
    bahrainLegalGuide: "বাহরাইন আইনিক গাইড",
    searchKnowledge: "নলেজ বেস অনুসন্ধান করুন...",
    labourLawGuide: "শ্রম আইন গাইড",
    workingHours: "কাজের সময় এবং ওভারটাইম",
    salaryRegulations: "বেতন এবং সুবিধা",
    terminationRights: "সমাপ্তি এবং অধিকার",
    businessGuide: "ব্যবসা গঠন গাইড",
    companyRegistration: "কোম্পানি নিবন্ধন",
    licenseRequirements: "লাইসেন্স প্রয়োজনীয়তা",
    sijillatProcess: "সিজিলাত নিবন্ধন প্রক্রিয়া",
    visaGuide: "ভিসা এবং অভিবাসন গাইড",
    residencePermit: "বাসস্থান পারমিট",
    workVisa: "কাজের ভিসা",
    visitorVisa: "দর্শনার্থী ভিসা",
    
    // Community
    joinCommunity: "আমাদের সম্প্রদায়ে যোগ দিন",
    whatsappGroup: "WhatsApp গ্রুপ",
    telegramChannel: "টেলিগ্রাম চ্যানেল",
    connectWithUs: "সামাজিক মিডিয়ায় আমাদের সাথে সংযুক্ত থাকুন এবং সর্বশেষ আইনি তথ্য আপডেট থাকুন।",
    
    // Footer
    disclaimer: "দাবিত্যাগ",
    disclaimerText: "এই সরঞ্জাম সাধারণ আইনি তথ্য প্রদান করে এবং এটি পেশাদার আইনি পরামর্শ হিসাবে বিবেচনা করা উচিত নয়। নির্দিষ্ট আইনি বিষয়ের জন্য, অনুগ্রহ করে যোগ্য আইনি পেশাদারদের সাথে পরামর্শ করুন।",
    cookiesNotice: "আমরা আপনার অভিজ্ঞতা উন্নত করতে কুকি ব্যবহার করি। এই সাইট ব্যবহার চালিয়ে যাওয়ার মাধ্যমে, আপনি আমাদের কুকি ব্যবহারে সম্মত হন।",
    acceptCookies: "কুকি গ্রহণ করুন",
    
    // Welcome message
    welcomeTitle: "Umoja-Aware-এ স্বাগতম",
    welcomeDescription: "বাহরাইনে বসবাসরত প্রবাসীদের জন্য আপনার বিশেষজ্ঞ AI সহায়ক। আমি কর্মচারী অধিকার, বেতন নিয়ন্ত্রণ, কাজের সময়, সমাপ্তি পদ্ধতি এবং সম্পর্কিত বিষয়ে তথ্য একাধিক ভাষায় সাহায্য করতে পারি!",
    
    // Predefined queries
    labourLawQuery: "বাহরাইন শ্রম আইনের অধীনে কর্মচারীদের মৌলিক অধিকার কি কি?",
    companyFormationQuery: "সিজিলাতের মাধ্যমে বাহরাইনে নতুন কোম্পানি কিভাবে নিবন্ধন করব?",
    visaServicesQuery: "বাহরাইন ব্যবসায়িক ভিসার জন্য আমার কোন নথিপত্র লাগবে?",
    lmraQuery: "LMRA-র মাধ্যমে নমনীয় কাজের পারমিট (স্ব-প্রতিপালিত) এর জন্য কিভাবে আবেদন করব?",
    culturalGuidelinesQuery: "মুসলিম দেশ হিসেবে বাহরাইনে বসবাস ও কাজের সাংস্কৃতিক নির্দেশিকা কী?",
    muslimCountryEtiquetteQuery: "মুসলিম দেশে আচরণ ও শিষ্টাচার সম্পর্কে কী জানা উচিত?",
    mentalHealthQuery: "বাহরাইনে প্রবাসীদের জন্য কী ধরনের মানসিক স্বাস্থ্য সহায়তা রয়েছে?",
    expatMentalHealthQuery: "প্রবাসীরা কীভাবে মানসিক স্বাস্থ্য সেবা ও সহায়তা পেতে পারেন?",
    
    // Loading states
    aiThinking: "Umoja চিন্তা করছে...",
    connectionRetrying: "সংযোগ বাধাগ্রস্ত, পুনরায় চেষ্টা করা হচ্ছে...",
    connectionFallback: "স্থিতিশীল মোডে স্যুইচ করা হয়েছে",
    
    // Common
    loading: "লোড হচ্ছে...",
    error: "ত্রুটি",
    tryAgain: "আবার চেষ্টা করুন",
    close: "বন্ধ করুন",
    menu: "মেনু",
    
    // KnowledgeBase specific
    overview: "ওভারভিউ",
    knowledgeBaseTitle: "📚 বাহরাইন শ্রম আইন নলেজ বেস",
    expatriateResidentKnowledgeBase: "📚 প্রবাসী বাসিন্দা নলেজ বেস",
    expatriateKnowledgeBaseSummary: "বাহরাইনে প্রবাসী জীবনের সকল দিক কভার করা বিশদ গাইড, যার মধ্যে রয়েছে শ্রম আইন, সাংস্কৃতিক নির্দেশিকা, মানসিক স্বাস্থ্য সহায়তা, ভিসা প্রক্রিয়া, আবাসন, স্বাস্থ্যসেবা, ব্যাংকিং সেবা, পরিবহন, শিক্ষা এবং কমিউনিটি সম্পদ।",
    bahrainLabourLaw: "বাহরাইন শ্রম আইন",
    visaImmigration: "ভিসা ও অভিবাসন",
    housingAccommodation: "আবাসন ও থাকার ব্যবস্থা",
    healthcareMedical: "স্বাস্থ্যসেবা ও চিকিৎসা",
    bankingFinance: "ব্যাংকিং ও অর্থায়ন",
    transportation: "পরিবহন",
    educationSchooling: "শিক্ষা ও স্কুলিং",
    hideDetails: "বিস্তারিত লুকান",
    showAvailableTopics: "উপলব্ধ বিষয়গুলি দেখান",
    selectCategoryMsg: "বাহরাইনে প্রবাসী জীবনের বিস্তৃত বিষয়গুলো অন্বেষণ করতে উপরের একটি বিভাগ নির্বাচন করুন। প্রতিটি এন্ট্রিতে ভিসা, আবাসন, স্বাস্থ্যসেবা, ব্যাংকিং, পরিবহন, শিক্ষা, কমিউনিটি সহায়তা এবং শ্রম আইন সম্পর্কিত ব্যবহারিক তথ্য রয়েছে।",
    source: "উৎস",
    leaveBenefits: "ছুটি এবং সুবিধা",
    wagesPayment: "মজুরি এবং অর্থপ্রদান",
    disputes: "বিবাদ",
    termination: "সমাপ্তি",
    employment: "চাকরি",
    overtime: "ওভারটাইম",
    
    // Footer specific
    copyright: "© {year} Umoja-Aware. সর্বস্বত্ব সংরক্ষিত।",
    about: "সম্পর্কে",
    terms: "শর্তাবলী",
    privacy: "গোপনীয়তা",
  },

  // Indonesian
  id: {
    // Header
    umojaAware: "Umoja-Aware",
    
    // Navigation
    chat: "Obrolan",
    knowledgeBase: "Basis Pengetahuan",
    community: "Komunitas",
    
    // Chat Interface
    typeYourMessage: "Ketik pesan Anda di sini...",
    send: "Kirim",
    askQuestion: "Ajukan pertanyaan",
    howCanIHelp: "Bagaimana saya bisa membantu Anda dengan masalah hukum Bahrain hari ini?",
    selectCategory: "Pilih kategori (opsional)",
    
    // Categories
    labourLaw: "Hukum Ketenagakerjaan",
    companyFormation: "Pembentukan Perusahaan",
    visaServices: "Layanan Visa",
    gracePeriod: "Masa Tenggang",
    lmra: "LMRA",
    sijilat: "Sijilat",
    generalLegal: "Hukum Umum",
    other: "Lainnya",
    culturalGuidelines: "Pedoman Budaya",
    mentalHealth: "Kesehatan Mental",
    culturalGuidelinesGuide: "Panduan Pedoman Budaya",
    muslimCountryEtiquette: "Etiket di Negara Muslim",
    decencyLaws: "Hukum Kesopanan",
    ramadanGuidelines: "Panduan Ramadan",
    prayerTimes: "Waktu Salat",
    dressCode: "Kode Berpakaian",
    publicBehaviour: "Perilaku di Tempat Umum",
    mentalHealthGuide: "Panduan Kesehatan Mental",
    expatMentalHealth: "Kesehatan Mental Ekspatriat",
    counselingServices: "Layanan Konseling dan Terapi",
    stressManagement: "Manajemen Stres",
    communitySupport: "Dukungan Komunitas",
    emergencyContacts: "Kontak Darurat",
    
    // Knowledge Base
    bahrainLegalGuide: "Panduan Hukum Bahrain",
    searchKnowledge: "Cari basis pengetahuan...",
    labourLawGuide: "Panduan Hukum Ketenagakerjaan",
    workingHours: "Jam Kerja dan Lembur",
    salaryRegulations: "Gaji dan Tunjangan",
    terminationRights: "Pengakhiran dan Hak",
    businessGuide: "Panduan Pembentukan Bisnis",
    companyRegistration: "Pendaftaran Perusahaan",
    licenseRequirements: "Persyaratan Lisensi",
    sijillatProcess: "Proses Pendaftaran Sijillat",
    visaGuide: "Panduan Visa dan Imigrasi",
    residencePermit: "Izin Tinggal",
    workVisa: "Visa Kerja",
    visitorVisa: "Visa Pengunjung",
    
    // Community
    joinCommunity: "Bergabung dengan Komunitas Kami",
    whatsappGroup: "Grup WhatsApp",
    telegramChannel: "Saluran Telegram",
    connectWithUs: "Terhubung dengan kami di media sosial dan tetap diperbarui dengan informasi hukum terbaru.",
    
    // Footer
    disclaimer: "Penafian",
    disclaimerText: "Alat ini memberikan informasi hukum umum dan tidak boleh dianggap sebagai nasihat hukum profesional. Untuk masalah hukum tertentu, silakan berkonsultasi dengan profesional hukum yang berkualifikasi.",
    cookiesNotice: "Kami menggunakan cookie untuk meningkatkan pengalaman Anda. Dengan melanjutkan menggunakan situs ini, Anda menyetujui penggunaan cookie kami.",
    acceptCookies: "Terima Cookie",
    
    // Welcome message
    welcomeTitle: "Selamat datang di Umoja-Aware",
    welcomeDescription: "Asisten AI khusus Anda untuk ekspatriat yang tinggal di Bahrain. Saya dapat membantu Anda dengan informasi tentang hak karyawan, peraturan gaji, jam kerja, prosedur pengakhiran, dan hal-hal terkait dalam berbagai bahasa!",
    
    // Predefined queries
    labourLawQuery: "Apa saja hak dasar karyawan menurut hukum ketenagakerjaan Bahrain?",
    companyFormationQuery: "Bagaimana cara mendaftarkan perusahaan baru di Bahrain melalui Sijilat?",
    visaServicesQuery: "Dokumen apa yang saya butuhkan untuk visa bisnis Bahrain?",
    lmraQuery: "Bagaimana cara mengajukan izin kerja fleksibel (swadaya) melalui LMRA?",
    culturalGuidelinesQuery: "Apa pedoman budaya untuk hidup dan bekerja di Bahrain sebagai negara Muslim?",
    muslimCountryEtiquetteQuery: "Apa yang perlu diketahui tentang etiket dan perilaku di negara Muslim?",
    mentalHealthQuery: "Dukungan kesehatan mental apa yang tersedia bagi ekspatriat di Bahrain?",
    expatMentalHealthQuery: "Bagaimana ekspatriat dapat mengakses layanan dan dukungan kesehatan mental?",
    
    // Loading states
    aiThinking: "Umoja sedang berpikir...",
    connectionRetrying: "Koneksi terputus, mencoba kembali...",
    connectionFallback: "Beralih ke mode stabil",
    
    // Common
    loading: "Memuat...",
    error: "Kesalahan",
    tryAgain: "Coba Lagi",
    close: "Tutup",
    menu: "Menu",
    
    // KnowledgeBase specific
    overview: "Ringkasan",
    knowledgeBaseTitle: "📚 Basis Pengetahuan Hukum Ketenagakerjaan Bahrain",
    expatriateResidentKnowledgeBase: "📚 Basis Pengetahuan untuk Warga Expatriat",
    expatriateKnowledgeBaseSummary: "Panduan komprehensif yang mencakup semua aspek kehidupan ekspatriat di Bahrain, termasuk hukum ketenagakerjaan, pedoman budaya, dukungan kesehatan mental, proses visa, perumahan, layanan kesehatan, layanan perbankan, transportasi, pendidikan, dan sumber daya komunitas.",
    bahrainLabourLaw: "Hukum Ketenagakerjaan Bahrain",
    visaImmigration: "Visa dan Imigrasi",
    housingAccommodation: "Perumahan dan Akomodasi",
    healthcareMedical: "Layanan Kesehatan dan Medis",
    bankingFinance: "Perbankan dan Keuangan",
    transportation: "Transportasi",
    educationSchooling: "Pendidikan dan Sekolah",
    hideDetails: "Sembunyikan Detail",
    showAvailableTopics: "Tampilkan Topik yang Tersedia",
    selectCategoryMsg: "Pilih kategori di atas untuk menjelajahi topik komprehensif tentang kehidupan ekspatriat di Bahrain. Setiap entri berisi informasi praktis mencakup visa, hunian, layanan kesehatan, perbankan, transportasi, pendidikan, dukungan komunitas, dan hukum ketenagakerjaan.",
    source: "Sumber",
    leaveBenefits: "Cuti dan Tunjangan",
    wagesPayment: "Upah dan Pembayaran",
    disputes: "Perselisihan",
    termination: "Pengakhiran",
    employment: "Pekerjaan",
    overtime: "Lembur",
    
    // Footer specific
    copyright: "© {year} Umoja-Aware. Hak cipta dilindungi.",
    about: "Tentang",
    terms: "Ketentuan",
    privacy: "Privasi",
  },

  // Thai
  th: {
    // Header
    umojaAware: "Umoja-Aware",
    
    // Navigation
    chat: "แชท",
    knowledgeBase: "ฐานความรู้",
    community: "ชุมชน",
    
    // Chat Interface
    typeYourMessage: "พิมพ์ข้อความของคุณที่นี่...",
    send: "ส่ง",
    askQuestion: "ถามคำถาม",
    howCanIHelp: "ฉันจะช่วยคุณเกี่ยวกับเรื่องกฎหมายของบาห์เรนได้อย่างไรในวันนี้?",
    selectCategory: "เลือกหมวดหมู่ (ไม่บังคับ)",
    
    // Categories
    labourLaw: "กฎหมายแรงงาน",
    companyFormation: "การจัดตั้งบริษัท",
    visaServices: "บริการวีซ่า",
    gracePeriod: "ระยะเวลาพักรอ",
    lmra: "LMRA",
    sijilat: "ซิจิลัต",
    generalLegal: "กฎหมายทั่วไป",
    other: "อื่นๆ",
    culturalGuidelines: "แนวทางทางวัฒนธรรม",
    mentalHealth: "สุขภาพจิต",
    culturalGuidelinesGuide: "คู่มือแนวทางทางวัฒนธรรม",
    muslimCountryEtiquette: "มารยาทในประเทศมุสลิม",
    decencyLaws: "กฎหมายความสุภาพ",
    ramadanGuidelines: "คู่มือรอมฎอน",
    prayerTimes: "เวลาละหมาด",
    dressCode: "ระเบียบการแต่งกาย",
    publicBehaviour: "พฤติกรรมในที่สาธารณะ",
    mentalHealthGuide: "คู่มือสุขภาพจิต",
    expatMentalHealth: "สุขภาพจิตของชาวต่างชาติ",
    counselingServices: "บริการให้คำปรึกษาและบำบัด",
    stressManagement: "การจัดการความเครียด",
    communitySupport: "การสนับสนุนจากชุมชน",
    emergencyContacts: "เบอร์ติดต่อฉุกเฉิน",
    
    // Knowledge Base
    bahrainLegalGuide: "คำแนะนำด้านกฎหมายของบาห์เรน",
    searchKnowledge: "ค้นหาฐานความรู้...",
    labourLawGuide: "คำแนะนำกฎหมายแรงงาน",
    workingHours: "เวลาทำงานและล่วงเวลา",
    salaryRegulations: "เงินเดือนและสวัสดิการ",
    terminationRights: "การสิ้นสุดและสิทธิ์",
    businessGuide: "คำแนะนำการจัดตั้งธุรกิจ",
    companyRegistration: "การจดทะเบียนบริษัท",
    licenseRequirements: "ข้อกำหนดใบอนุญาต",
    sijillatProcess: "กระบวนการลงทะเบียนซิจิลัต",
    visaGuide: "คำแนะนำวีซ่าและการเข้าเมือง",
    residencePermit: "ใบอนุญาตพำนัก",
    workVisa: "วีซ่าทำงาน",
    visitorVisa: "วีซ่านักท่องเที่ยว",
    
    // Community
    joinCommunity: "เข้าร่วมชุมชนของเรา",
    whatsappGroup: "กลุ่ม WhatsApp",
    telegramChannel: "ช่อง Telegram",
    connectWithUs: "เชื่อมต่อกับเราบนโซเชียลมีเดียและรับข้อมูลกฎหมายล่าสุด",
    
    // Footer
    disclaimer: "ข้อจำกัดความรับผิดชอบ",
    disclaimerText: "เครื่องมือนี้ให้ข้อมูลกฎหมายทั่วไปและไม่ควรถือเป็นคำแนะนำกฎหมายมืออาชีพ สำหรับปัญหากฎหมายเฉพาะ โปรดปรึกษากับผู้เชี่ยวชาญด้านกฎหมายที่มีคุณสมบัติ",
    cookiesNotice: "เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์ของคุณ การดำเนินการใช้ไซต์นี้ต่อไปแสดงว่าคุณยอมรับการใช้คุกกี้ของเรา",
    acceptCookies: "ยอมรับคุกกี้",
    
    // Welcome message
    welcomeTitle: "ยินดีต้อนรับสู่ Umoja-Aware",
    welcomeDescription: "ผู้ช่วย AI เฉพาะทางของคุณสำหรับชาวต่างชาติที่อาศัยอยู่ในบาห์เรน ฉันสามารถช่วยคุณด้วยข้อมูลเกี่ยวกับสิทธิของพนักงาน กฎระเบียบเงินเดือน เวลาทำงาน ขั้นตอนการสิ้นสุดงาน และเรื่องที่เกี่ยวข้องในหลายภาษา!",
    
    // Predefined queries
    labourLawQuery: "สิทธิขั้นพื้นฐานของพนักงานภายใต้กฎหมายแรงงานของบาห์เรนคืออะไร?",
    companyFormationQuery: "ฉันจะจดทะเบียนบริษัทใหม่ในบาห์เรนผ่าน Sijilat ได้อย่างไร?",
    visaServicesQuery: "ฉันต้องการเอกสารอะไรบ้างสำหรับวีซ่าธุรกิจของบาห์เรน?",
    lmraQuery: "ฉันจะสมัครขอใบอนุญาตทำงานแบบยืดหยุ่น (สนับสนุนตนเอง) ผ่าน LMRA ได้อย่างไร?",
    culturalGuidelinesQuery: "แนวทางทางวัฒนธรรมในการใช้ชีวิตและทำงานในบาห์เรนซึ่งเป็นประเทศมุสลิมมีอะไรบ้าง?",
    muslimCountryEtiquetteQuery: "ควรรู้อะไรเกี่ยวกับมารยาทและพฤติกรรมในประเทศมุสลิม?",
    mentalHealthQuery: "มีการสนับสนุนด้านสุขภาพจิตอะไรบ้างสำหรับชาวต่างชาติในบาห์เรน?",
    expatMentalHealthQuery: "ชาวต่างชาติสามารถเข้าถึงบริการและการสนับสนุนด้านสุขภาพจิตได้อย่างไร?",
    
    // Loading states
    aiThinking: "Umoja กำลังคิด...",
    connectionRetrying: "การเชื่อมต่อหยุดชะงัก กำลังลองใหม่...",
    connectionFallback: "เปลี่ยนเป็นโหมดเสถียร",
    
    // Common
    loading: "กำลังโหลด...",
    error: "ข้อผิดพลาด",
    tryAgain: "ลองอีกครั้ง",
    close: "ปิด",
    menu: "เมนู",
    
    // KnowledgeBase specific
    overview: "ภาพรวม",
    knowledgeBaseTitle: "📚 ฐานความรู้กฎหมายแรงงานของบาห์เรน",
    expatriateResidentKnowledgeBase: "📚 ฐานความรู้สำหรับผู้อยู่อาศัยต่างชาติ",
    expatriateKnowledgeBaseSummary: "คำแนะนำที่ครอบคลุมทุกด้านของชีวิตผู้อยู่อาศัยต่างชาติในบาห์เรน รวมถึงกฎหมายแรงงาน แนวทางวัฒนธรรม การสนับสนุนสุขภาพจิต กระบวนการขอวีซ่า ที่อยู่อาศัย การดูแลสุขภาพ บริการธนาคาร การขนส่ง การศึกษา และทรัพยากรชุมชน",
    bahrainLabourLaw: "กฎหมายแรงงานของบาห์เรน",
    visaImmigration: "วีซ่าและการเข้าเมือง",
    housingAccommodation: "ที่อยู่อาศัยและการพักอาศัย",
    healthcareMedical: "การดูแลสุขภาพและการแพทย์",
    bankingFinance: "ธนาคารและการเงิน",
    transportation: "การขนส่ง",
    educationSchooling: "การศึกษาและการเรียน",
    hideDetails: "ซ่อนรายละเอียด",
    showAvailableTopics: "แสดงหัวข้อที่มี",
    selectCategoryMsg: "เลือกหมวดหมู่ด้านบนเพื่อสำรวจหัวข้อเชิงองค์รวมเกี่ยวกับชีวิตชาวต่างชาติในบาห์เรน แต่ละรายการมีข้อมูลเชิงปฏิบัติครอบคลุมวีซ่า ที่อยู่อาศัย การดูแลสุขภาพ ธนาคาร การขนส่ง การศึกษา การสนับสนุนจากชุมชน และกฎหมายแรงงาน",
    source: "แหล่งที่มา",
    leaveBenefits: "การลาและสวัสดิการ",
    wagesPayment: "ค่าจ้างและการจ่ายเงิน",
    disputes: "ข้อพิพาท",
    termination: "การสิ้นสุด",
    employment: "การจ้างงาน",
    overtime: "ล่วงเวลา",
    
    // Footer specific
    copyright: "© {year} Umoja-Aware. สงวนลิขสิทธิ์",
    about: "เกี่ยวกับ",
    terms: "เงื่อนไข",
    privacy: "ความเป็นส่วนตัว",
  },

  // Malay
  ms: {
    // Header
    umojaAware: "Umoja-Aware",
    
    // Navigation
    chat: "Sembang",
    knowledgeBase: "Pangkalan Pengetahuan",
    community: "Komuniti",
    
    // Chat Interface
    typeYourMessage: "Taip mesej anda di sini...",
    send: "Hantar",
    askQuestion: "Tanya soalan",
    howCanIHelp: "Bagaimana saya boleh membantu anda dengan hal-hal undang-undang Bahrain hari ini?",
    selectCategory: "Pilih kategori (pilihan)",
    
    // Categories
    labourLaw: "Undang-undang Buruh",
    companyFormation: "Penubuhan Syarikat",
    visaServices: "Perkhidmatan Visa",
    gracePeriod: "Tempoh Tangguh",
    lmra: "LMRA",
    sijilat: "Sijilat",
    generalLegal: "Undang-undang Umum",
    other: "Lain-lain",
    culturalGuidelines: "Garis Panduan Budaya",
    mentalHealth: "Kesihatan Mental",
    culturalGuidelinesGuide: "Panduan Garis Panduan Budaya",
    muslimCountryEtiquette: "Etika di Negara Muslim",
    decencyLaws: "Undang-undang Kesopanan",
    ramadanGuidelines: "Panduan Ramadan",
    prayerTimes: "Waktu Solat",
    dressCode: "Kod Pakaian",
    publicBehaviour: "Tingkah Laku Awam",
    mentalHealthGuide: "Panduan Kesihatan Mental",
    expatMentalHealth: "Kesihatan Mental Ekspatriat",
    counselingServices: "Perkhidmatan Kaunseling dan Terapi",
    stressManagement: "Pengurusan Tekanan",
    communitySupport: "Sokongan Komuniti",
    emergencyContacts: "Nombor Kecemasan",
    
    // Knowledge Base
    bahrainLegalGuide: "Panduan Undang-undang Bahrain",
    searchKnowledge: "Cari pangkalan pengetahuan...",
    labourLawGuide: "Panduan Undang-undang Buruh",
    workingHours: "Waktu Bekerja dan Masa Lebih",
    salaryRegulations: "Gaji dan Faedah",
    terminationRights: "Penamatan dan Hak",
    businessGuide: "Panduan Penubuhan Perniagaan",
    companyRegistration: "Pendaftaran Syarikat",
    licenseRequirements: "Keperluan Lesen",
    sijillatProcess: "Proses Pendaftaran Sijillat",
    visaGuide: "Panduan Visa dan Imigresen",
    residencePermit: "Permit Kediaman",
    workVisa: "Visa Kerja",
    visitorVisa: "Visa Pelawat",
    
    // Community
    joinCommunity: "Sertai Komuniti Kami",
    whatsappGroup: "Kumpulan WhatsApp",
    telegramChannel: "Saluran Telegram",
    connectWithUs: "Hubungi kami di media sosial dan kekal dimaklumkan dengan maklumat undang-undang terkini.",
    
    // Footer
    disclaimer: "Penafian",
    disclaimerText: "Alat ini memberikan maklumat undang-undang umum dan tidak boleh dianggap sebagai nasihat undang-undang profesional. Untuk isu undang-undang tertentu, sila berunding dengan profesional undang-undang yang berkelayakan.",
    cookiesNotice: "Kami menggunakan kuki untuk meningkatkan pengalaman anda. Dengan meneruskan penggunaan laman ini, anda bersetuju dengan penggunaan kuki kami.",
    acceptCookies: "Terima Kuki",
    
    // Welcome message
    welcomeTitle: "Selamat datang ke Umoja-Aware",
    welcomeDescription: "Pembantu AI pakar anda untuk ekspatriat yang tinggal di Bahrain. Saya boleh membantu anda dengan maklumat mengenai hak pekerja, peraturan gaji, waktu bekerja, prosedur penamatan dan perkara berkaitan dalam pelbagai bahasa!",
    
    // Predefined queries
    labourLawQuery: "Apakah hak asas pekerja di bawah undang-undang buruh Bahrain?",
    companyFormationQuery: "Bagaimana cara mendaftarkan syarikat baharu di Bahrain melalui Sijilat?",
    visaServicesQuery: "Dokumen apakah yang saya perlukan untuk visa perniagaan Bahrain?",
    lmraQuery: "Bagaimana cara memohon permit kerja fleksibel (sendiri ditaja) melalui LMRA?",
    culturalGuidelinesQuery: "Apakah garis panduan budaya untuk hidup dan bekerja di Bahrain sebagai negara Muslim?",
    muslimCountryEtiquetteQuery: "Apa yang perlu diketahui tentang etika dan tingkah laku di negara Muslim?",
    mentalHealthQuery: "Apakah sokongan kesihatan mental yang tersedia untuk ekspatriat di Bahrain?",
    expatMentalHealthQuery: "Bagaimana ekspatriat boleh mengakses perkhidmatan dan sokongan kesihatan mental?",
    
    // Loading states
    aiThinking: "Umoja sedang berfikir...",
    connectionRetrying: "Sambungan terputus, cuba semula...",
    connectionFallback: "Beralih ke mod stabil",
    
    // Common
    loading: "Memuatkan...",
    error: "Ralat",
    tryAgain: "Cuba Lagi",
    close: "Tutup",
    menu: "Menu",
    
    // KnowledgeBase specific
    overview: "Gambaran Keseluruhan",
    knowledgeBaseTitle: "📚 Pangkalan Pengetahuan Undang-undang Buruh Bahrain",
    expatriateResidentKnowledgeBase: "📚 Pangkalan Pengetahuan untuk Penduduk Eksportriat",
    expatriateKnowledgeBaseSummary: "Panduan menyeluruh yang merangkumi semua aspek kehidupan ekspatriat di Bahrain, termasuk undang-undang buruh, garis panduan budaya, sokongan kesihatan mental, proses visa, perumahan, penjagaan kesihatan, perkhidmatan perbankan, pengangkutan, pendidikan dan sumber komuniti.",
    bahrainLabourLaw: "Undang-undang Buruh Bahrain",
    visaImmigration: "Visa dan Imigresen",
    housingAccommodation: "Perumahan dan Penginapan",
    healthcareMedical: "Penjagaan Kesihatan dan Perubatan",
    bankingFinance: "Perbankan dan Kewangan",
    transportation: "Pengangkutan",
    educationSchooling: "Pendidikan dan Persekolahan",
    hideDetails: "Sembunyikan Butiran",
    showAvailableTopics: "Tunjukkan Topik yang Tersedia",
    selectCategoryMsg: "Pilih kategori di atas untuk meneroka topik menyeluruh tentang kehidupan ekspatriat di Bahrain. Setiap entri mengandungi maklumat praktikal merangkumi visa, perumahan, penjagaan kesihatan, perbankan, pengangkutan, pendidikan, sokongan komuniti dan undang‑undang buruh.",
    source: "Sumber",
    leaveBenefits: "Cuti dan Faedah",
    wagesPayment: "Upah dan Bayaran",
    disputes: "Pertikaian",
    termination: "Penamatan",
    employment: "Pekerjaan",
    overtime: "Masa Lebih",
    
    // Footer specific
    copyright: "© {year} Umoja-Aware. Hak cipta terpelihara.",
    about: "Perihal",
    terms: "Terma",
    privacy: "Privasi",
  },

  // Turkish
  tr: {
    // Header
    umojaAware: "Umoja-Aware",
    
    // Navigation
    chat: "Sohbet",
    knowledgeBase: "Bilgi Tabanı",
    community: "Topluluk",
    
    // Chat Interface
    typeYourMessage: "Mesajınızı buraya yazın...",
    send: "Gönder",
    askQuestion: "Soru sor",
    howCanIHelp: "Bugün Bahreyn yasal konularda size nasıl yardımcı olabilirim?",
    selectCategory: "Kategori seçin (isteğe bağlı)",
    
    // Categories
    labourLaw: "İş Yasası",
    companyFormation: "Şirket Kuruluşu",
    visaServices: "Vize Hizmetleri",
    gracePeriod: "Tolerans Süresi",
    lmra: "LMRA",
    sijilat: "Sijilat",
    generalLegal: "Genel Yasal",
    other: "Diğer",
    culturalGuidelines: "Kültürel Rehberler",
    mentalHealth: "Ruh Sağlığı",
    culturalGuidelinesGuide: "Kültürel Rehberler Kılavuzu",
    muslimCountryEtiquette: "Müslüman Ülkede Görgü Kuralları",
    decencyLaws: "Nezaket Yasaları",
    ramadanGuidelines: "Ramazan Rehberi",
    prayerTimes: "Namaz Vakitleri",
    dressCode: "Kıyafet Kodu",
    publicBehaviour: "Kamusal Davranış",
    mentalHealthGuide: "Ruh Sağlığı Kılavuzu",
    expatMentalHealth: "Göçmen Ruh Sağlığı",
    counselingServices: "Danışmanlık ve Terapi Hizmetleri",
    stressManagement: "Stres Yönetimi",
    communitySupport: "Topluluk Desteği",
    emergencyContacts: "Acil İletişim",
    
    // Knowledge Base
    bahrainLegalGuide: "Bahreyn Yasal Rehberi",
    searchKnowledge: "Bilgi tabanında ara...",
    labourLawGuide: "İş Yasası Rehberi",
    workingHours: "Çalışma Saatleri ve Fazla Mesai",
    salaryRegulations: "Maaş ve Faydalar",
    terminationRights: "Sonlandırma ve Haklar",
    businessGuide: "İş Kuruluş Rehberi",
    companyRegistration: "Şirket Kaydı",
    licenseRequirements: "Lisans Gereksinimleri",
    sijillatProcess: "Sijillat Kayıt Süreci",
    visaGuide: "Vize ve Göç Rehberi",
    residencePermit: "İkamet İzni",
    workVisa: "Çalışma Vizesi",
    visitorVisa: "Ziyaretçi Vizesi",
    
    // Community
    joinCommunity: "Topluluğumuza Katılın",
    whatsappGroup: "WhatsApp Grubu",
    telegramChannel: "Telegram Kanalı",
    connectWithUs: "Sosyal medyada bizimle bağlantı kurun ve en son yasal bilgilerle güncel kalın.",
    
    // Footer
    disclaimer: "Sorumluluk Reddi",
    disclaimerText: "Bu araç genel yasal bilgiler sağlar ve profesyonel yasal tavsiye olarak kabul edilmemelidir. Belirli yasal konular için lütfen nitelikli yasal profesyonellerle danışın.",
    cookiesNotice: "Deneyiminizi geliştirmek için çerez kullanıyoruz. Bu siteyi kullanmaya devam ederek çerez kullanımımızı kabul etmiş olursunuz.",
    acceptCookies: "Çerezleri Kabul Et",
    
    // Welcome message
    welcomeTitle: "Umoja-Aware'e Hoş Geldiniz",
    welcomeDescription: "Bahreyn'de yaşayan göçmenler için uzman AI asistanınız. Çalışan hakları, maaş düzenlemeleri, çalışma saatleri, sonlandırma prosedürleri ve ilgili konular hakkında bilgi sağlamak için size çok dilli olarak yardımcı olabilirim!",
    
    // Predefined queries
    labourLawQuery: "Bahreyn iş yasası altında çalışanların temel hakları nelerdir?",
    companyFormationQuery: "Sijilat aracılığıyla Bahreyn'de yeni bir şirket nasıl kurulur?",
    visaServicesQuery: "Bahreyn iş vizesi için hangi belgelere ihtiyacım var?",
    lmraQuery: "LMRA aracılığıyla esnek çalışma izni (kendi kendine sponsorluk) için nasıl başvurulur?",
    culturalGuidelinesQuery: "Bahreyn’de Müslüman bir ülkede yaşama ve çalışma için kültürel rehberler nelerdir?",
    muslimCountryEtiquetteQuery: "Müslüman bir ülkede görgü kuralları ve davranış hakkında neler bilinmeli?",
    mentalHealthQuery: "Bahreyn’de göçmenler için hangi ruh sağlığı desteği mevcut?",
    expatMentalHealthQuery: "Göçmenler ruh sağlığı hizmetlerine ve desteğine nasıl erişebilir?",
    
    // Loading states
    aiThinking: "Umoja düşünüyor...",
    connectionRetrying: "Bağlantı kesildi, yeniden deneniyor...",
    connectionFallback: "Kararlı moda geçildi",
    
    // Common
    loading: "Yükleniyor...",
    error: "Hata",
    tryAgain: "Tekrar Dene",
    close: "Kapat",
    menu: "Menü",
    
    // KnowledgeBase specific
    overview: "Genel Bakış",
    knowledgeBaseTitle: "📚 Bahreyn İş Yasası Bilgi Tabanı",
    expatriateResidentKnowledgeBase: "📚 Expatriot Yerleşikler Bilgi Tabanı",
    expatriateKnowledgeBaseSummary: "Bahreyn'de expatriot yaşamının tüm yönlerini kapsayan kapsamlı rehber, iş yasaları, kültürel yönergeler, ruh sağlığı desteği, vize süreçleri, konut, sağlık hizmetleri, bankacılık hizmetleri, ulaşım, eğitim ve toplum kaynaklarını içerir.",
    bahrainLabourLaw: "Bahreyn İş Yasası",
    visaImmigration: "Vize ve Göç",
    housingAccommodation: "Konut ve Kalacak Yer",
    healthcareMedical: "Sağlık Hizmetleri ve Tıbbi",
    bankingFinance: "Bankacılık ve Finans",
    transportation: "Ulaşım",
    educationSchooling: "Eğitim ve Okul",
    hideDetails: "Detayları Gizle",
    showAvailableTopics: "Mevcut Konuları Göster",
    selectCategoryMsg: "Yukarıdan bir kategori seçerek Bahreyn’de göçmen yaşamına dair kapsamlı konuları keşfedin. Her kayıt; vize, konut, sağlık hizmetleri, bankacılık, ulaşım, eğitim, topluluk desteği ve iş yasaları hakkında pratik bilgiler içerir.",
    source: "Kaynak",
    leaveBenefits: "İzin ve Faydalar",
    wagesPayment: "Ücret ve Ödeme",
    disputes: "Anlaşmazlıklar",
    termination: "Sonlandırma",
    employment: "İstihdam",
    overtime: "Fazla Mesai",
    
    // Footer specific
    copyright: "© {year} Umoja-Aware. Tüm hakları saklıdır.",
    about: "Hakkında",
    terms: "Şartlar",
    privacy: "Gizlilik",
  },

  // Tamil
  ta: {
    // Header
    umojaAware: "Umoja-Aware",
    
    // Navigation
    chat: "அரட்டை",
    knowledgeBase: "அறிவுத் தளம்",
    community: "சமூகம்",
    
    // Chat Interface
    typeYourMessage: "உங்கள் செய்தியை இங்கே தட்டச்சு செய்யவும்...",
    send: "அனுப்பு",
    askQuestion: "கேள்வி கேளுங்கள்",
    howCanIHelp: "இன்று பஹ்ரைன் சட்ட விவகாரங்களில் நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?",
    selectCategory: "வகையைத் தேர்ந்தெடுக்கவும் (விருப்பத்திற்கேற்ப)",
    
    // Categories
    labourLaw: "தொழிலாளர் சட்டம்",
    companyFormation: "நிறுவன உருவாக்கம்",
    visaServices: "விசா சேவைகள்",
    gracePeriod: "கருணை காலம்",
    lmra: "LMRA",
    sijilat: "சிஜிலாட்",
    generalLegal: "பொது சட்டம்",
    other: "மற்றவை",
    culturalGuidelines: "கலாசார வழிகாட்டுதல்கள்",
    mentalHealth: "மனநலம்",
    culturalGuidelinesGuide: "கலாசார வழிகாட்டுதல் கையேடு",
    muslimCountryEtiquette: "முஸ்லிம் நாட்டின் ஒழுக்கம்",
    decencyLaws: "அடக்க ஒழுக்கச் சட்டங்கள்",
    ramadanGuidelines: "ரமதான் வழிகாட்டுதல்கள்",
    prayerTimes: "இருதய நேரங்கள்/நமாஸ் நேரங்கள்",
    dressCode: "உடை விதிமுறைகள்",
    publicBehaviour: "சமூகத்தில் நடத்தை",
    mentalHealthGuide: "மனநல வழிகாட்டி",
    expatMentalHealth: "வெளிநாட்டவர்களின் மனநலம்",
    counselingServices: "ஆலோசனை மற்றும் சிகிச்சை சேவைகள்",
    stressManagement: "மன அழுத்த மேலாண்மை",
    communitySupport: "சமூக ஆதரவு",
    emergencyContacts: "அவசர தொடர்புகள்",
    
    // Knowledge Base
    bahrainLegalGuide: "பஹ்ரைன் சட்ட வழிகாட்டி",
    searchKnowledge: "அறிவுத் தளத்தைத் தேடுங்கள்...",
    labourLawGuide: "தொழிலாளர் சட்ட வழிகாட்டி",
    workingHours: "வேலை நேரம் மற்றும் ஓவர்டைம்",
    salaryRegulations: "சம்பளம் மற்றும் நன்மைகள்",
    terminationRights: "முடிவு மற்றும் உரிமைகள்",
    businessGuide: "வணிக உருவாக்க வழிகாட்டி",
    companyRegistration: "நிறுவன பதிவு",
    licenseRequirements: "உரிமம் தேவைகள்",
    sijillatProcess: "சிஜிலாட் பதிவு செயல்முறை",
    visaGuide: "விசா மற்றும் குடியேற்ற வழிகாட்டி",
    residencePermit: "வதிவிட அனுமதி",
    workVisa: "வேலை விசா",
    visitorVisa: "வருகையாளர் விசா",
    
    // Community
    joinCommunity: "எங்கள் சமூகத்தில் சேருங்கள்",
    whatsappGroup: "WhatsApp குழு",
    telegramChannel: "டெலிகிராம் சேனல்",
    connectWithUs: "சமூக ஊடகங்களில் எங்களுடன் இணைந்திருங்கள் மற்றும் சமீபத்திய சட்ட தகவல்களுடன் புதுப்பித்த நிலையில் இருங்கள்.",
    
    // Footer
    disclaimer: "மறுப்பு",
    disclaimerText: "இந்த கருவி பொது சட்ட தகவல்களை வழங்குகிறது மற்றும் தொழில்முறை சட்ட ஆலோசனையாகக் கருதப்படக்கூடாது. குறிப்பிட்ட சட்ட விவகாரங்களுக்கு, தகுதியுள்ள சட்ட நிபுணர்களைத் தொடர்பு கொள்ளுங்கள்.",
    cookiesNotice: "உங்கள் அனுபவத்தை மேம்படுத்த நாங்கள் குக்கிகளைப் பயன்படுத்துகிறோம். இந்த தளத்தைத் தொடர்ந்து பயன்படுத்துவதன் மூலம், எங்கள் குக்கி பயன்பாட்டை நீங்கள் ஒப்புக்கொள்கிறீர்கள்.",
    acceptCookies: "குக்கிகளை ஏற்கவும்",
    
    // Welcome message
    welcomeTitle: "Umoja-Aware-க்கு வரவேற்கிறோம்",
    welcomeDescription: "பஹ்ரைனில் வசிக்கும் வெளிநாட்டவர்களுக்கான உங்கள் நிபுணர் AI உதவியாளர். ஊழியர் உரிமைகள், சம்பள விதிமுறைகள், வேலை நேரங்கள், முடிவு நடைமுறைகள் மற்றும் தொடர்புடைய விவகாரங்களில் தகவல்களை பல மொழிகளில் வழங்க உதவ முடியும்!",
    
    // Predefined queries
    labourLawQuery: "பஹ்ரைன் தொழிலாளர் சட்டத்தின் கீழ் ஊழியர்களின் அடிப்படை உரிமைகள் என்ன?",
    companyFormationQuery: "சிஜிலாட் மூலம் பஹ்ரைனில் புதிய நிறுவனத்தை எவ்வாறு பதிவு செய்வது?",
    visaServicesQuery: "பஹ்ரைன் வணிக விசாவுக்கு எனக்கு என்ன ஆவணங்கள் தேவை?",
    lmraQuery: "LMRA மூலம் நெகிழ்வான வேலை அனுமதி (தன்னாட்சி) எவ்வாறு விண்ணப்பிப்பது?",
    culturalGuidelinesQuery: "முஸ்லிம் நாடான பஹ்ரைனில் வாழவும் வேலை செய்யவும் கலாசார வழிகாட்டுதல்கள் என்ன?",
    muslimCountryEtiquetteQuery: "முஸ்லிம் நாட்டில் நடத்தை மற்றும் ஒழுக்கம் குறித்து என்ன தெரிந்திருக்க வேண்டும்?",
    mentalHealthQuery: "பஹ்ரைனில் வெளிநாட்டவர்களுக்கு கிடைக்கும் மனநலம் ஆதரவு என்ன?",
    expatMentalHealthQuery: "வெளிநாட்டவர்கள் மனநலம் சேவைகள் மற்றும் ஆதரவுகளை எவ்வாறு அணுகலாம்?",
    
    // Loading states
    aiThinking: "Umoja சிந்திக்கிறது...",
    connectionRetrying: "இணைப்பு தடைபட்டது, மீண்டும் முயற்சிக்கிறது...",
    connectionFallback: "நிலையான பயன்முறைக்கு மாற்றப்பட்டது",
    
    // Common
    loading: "ஏற்றுகிறது...",
    error: "பிழை",
    tryAgain: "மீண்டும் முயற்சி செய்யவும்",
    close: "மூடு",
    menu: "மெனு",
    
    // KnowledgeBase specific
    overview: "மேலோட்டம்",
    knowledgeBaseTitle: "📚 பஹ்ரைன் தொழிலாளர் சட்ட அறிவுத் தளம்",
    expatriateResidentKnowledgeBase: "📚 வெளிநாட்டு வாழ்வாளர்களுக்கான அறிவுத் தளம்",
    expatriateKnowledgeBaseSummary: "பஹ்ரைனில் வெளிநாட்டு வாழ்க்கையின் அனைத்து அம்சங்களையும் உள்ளடக்கிய விரிவான வழிகாட்டி, தொழில் சட்டங்கள், கலாச்சார வழிகாட்டுதல்கள், மனநல ஆதரவு, விசா செயல்முறைகள், வீடமைப்பு, சுகாதார சேவைகள், வங்கி சேவைகள், போக்குவரத்து, கல்வி மற்றும் சமூக வளங்களை உள்ளடக்கியது.",
    bahrainLabourLaw: "பஹ்ரைன் தொழிலாளர் சட்டம்",
    visaImmigration: "விசா மற்றும் குடியேற்றம்",
    housingAccommodation: "வீடமைப்பு மற்றும் தங்குமிடம்",
    healthcareMedical: "சுகாதார சேவைகள் மற்றும் மருத்துவம்",
    bankingFinance: "வங்கி மற்றும் நிதி",
    transportation: "போக்குவரத்து",
    educationSchooling: "கல்வி மற்றும் பள்ளி",
    hideDetails: "விவரங்களை மறைக்கவும்",
    showAvailableTopics: "கிடைக்கும் தலைப்புகளை காட்டு",
    selectCategoryMsg: "பஹ்ரைனில் வெளிநாட்டு வாழ்க்கையின் விரிவான தலைப்புகளை ஆராய்வதற்கு மேலுள்ள வகையைத் தேர்ந்தெடுக்கவும். ஒவ்வொரு பதிவிலும் விசா, வீடமைப்பு, சுகாதாரம், வங்கி, போக்குவரத்து, கல்வி, சமூக ஆதரவு மற்றும் தொழிலாளர் சட்டங்கள் குறித்த நடைமுறை தகவல்கள் இடம்பெறும்.",
    source: "மூலம்",
    leaveBenefits: "விடுப்பு மற்றும் நன்மைகள்",
    wagesPayment: "ஊதியம் மற்றும் செலுத்தல்",
    disputes: "தகராறுகள்",
    termination: "முடிவு",
    employment: "வேலைவாய்ப்பு",
    overtime: "கூடுதல் நேரம்",
    
    // Footer specific
    copyright: "© {year} Umoja-Aware. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    about: "பற்றி",
    terms: "விதிமுறைகள்",
    privacy: "தனியுரிமை",
  },

  // Telugu
  te: {
    // Header
    umojaAware: "Umoja-Aware",
    
    // Navigation
    chat: "చాట్",
    knowledgeBase: "నాలెడ్జ్ బేస్",
    community: "సమాజం",
    
    // Chat Interface
    typeYourMessage: "మీ సందేశాన్ని ఇక్కడ టైప్ చేయండి...",
    send: "పంపండి",
    askQuestion: "ప్రశ్న అడగండి",
    howCanIHelp: "నేను ఈ రోజు మీకు బహ్రెయిన్ చట్టపరమైన విషయాల్లో ఎలా సహాయపడగలను?",
    selectCategory: "వర్గాన్ని ఎంచుకోండి (ఐచ్ఛికం)",
    
    // Categories
    labourLaw: "ఉద్యోగ చట్టం",
    companyFormation: "కంపెనీ ఏర్పాటు",
    visaServices: "వీసా సేవలు",
    gracePeriod: "గ్రేస్ కాలం",
    lmra: "LMRA",
    sijilat: "సిజిలాట్",
    generalLegal: "సాధారణ చట్టం",
    other: "ఇతర",
    culturalGuidelines: "సాంస్కృతిక మార్గదర్శకాలు",
    mentalHealth: "మానసిక ఆరోగ్యం",
    culturalGuidelinesGuide: "సాంస్కృతిక మార్గదర్శక గైడ్",
    muslimCountryEtiquette: "ముస్లిం దేశంలో శిష్టాచారం",
    decencyLaws: "శిస్తు/మర్యాద చట్టాలు",
    ramadanGuidelines: "రమదాన్ మార్గదర్శకాలు",
    prayerTimes: "ప్రార్థన సమయాలు",
    dressCode: "వస్త్ర ధారణ నియమాలు",
    publicBehaviour: "ప్రజా ప్రవర్తన",
    mentalHealthGuide: "మానసిక ఆరోగ్య గైడ్",
    expatMentalHealth: "వలసదారుల మానసిక ఆరోగ్యం",
    counselingServices: "కౌన్సెలింగ్ మరియు థెరపీ సేవలు",
    stressManagement: "ఒత్తిడి నిర్వహణ",
    communitySupport: "సమాజ సహాయం",
    emergencyContacts: "అత్యవసర సంప్రదింపు",
    
    // Knowledge Base
    bahrainLegalGuide: "బహ్రెయిన్ చట్ట గైడ్",
    searchKnowledge: "నాలెడ్జ్ బేస్ లో వెతకండి...",
    labourLawGuide: "ఉద్యోగ చట్ట గైడ్",
    workingHours: "పని గంటలు మరియు ఓవర్‌టైమ్",
    salaryRegulations: "వేతనం మరియు ప్రయోజనాలు",
    terminationRights: "ముగింపు మరియు హక్కులు",
    businessGuide: "వ్యాపార ఏర్పాటు గైడ్",
    companyRegistration: "కంపెనీ నమోదు",
    licenseRequirements: "లైసెన్స్ అవసరాలు",
    sijillatProcess: "సిజిలాట్ నమోదు ప్రక్రియ",
    visaGuide: "వీసా మరియు ఇమ్మిగ్రేషన్ గైడ్",
    residencePermit: "నివాస అనుమతి",
    workVisa: "పని వీసా",
    visitorVisa: "సందర్శకుడు వీసా",
    
    // Community
    joinCommunity: "మా సమాజంలో చేరండి",
    whatsappGroup: "WhatsApp గ్రూప్",
    telegramChannel: "టెలిగ్రామ్ ఛానెల్",
    connectWithUs: "సామాజిక మాధ్యమాలలో మాతో కనెక్ట్ అవ్వండి మరియు తాజా చట్ట సమాచారంతో అప్‌డేట్ అవ్వండి.",
    
    // Footer
    disclaimer: "అస్వీకార",
    disclaimerText: "ఈ సాధనం సాధారణ చట్ట సమాచారాన్ని అందిస్తుంది మరియు దీనిని వృత్తిపరమైన చట్ట సలహాగా పరిగణించకూడదు. ప్రత్యేక చట్టపరమైన విషయాల కోసం, దయచేసి అర్హత కలిగిన చట్ట నిపుణులను సంప్రదించండి.",
    cookiesNotice: "మేము మీ అనుభవాన్ని మెరుగుపరచడానికి కుకీలను ఉపయోగిస్తాము. ఈ సైట్‌ను కొనసాగించడం ద్వారా, మీరు మా కుకీ వినియోగానికి అంగీకరిస్తున్నారు.",
    acceptCookies: "కుకీలను అంగీకరించండి",
    
    // Welcome message
    welcomeTitle: "Umoja-Aware కి స్వాగతం",
    welcomeDescription: "బహ్రెయిన్‌లో నివసిస్తున్న వలసదారుల కోసం మీ నిపుణుడు AI సహాయకుడు. నేను ఉద్యోగుల హక్కులు, వేతన నిబంధనలు, పని గంటలు, ముగింపు విధానాలు మరియు సంబంధిత విషయాల గురించి సమాచారం అందించడంలో మీకు సహాయపడగలను!",
    
    // Predefined queries
    labourLawQuery: "బహ్రెయిన్ ఉద్యోగ చట్టం ప్రకారం ఉద్యోగుల ప్రాథమిక హక్కులు ఏమిటి?",
    companyFormationQuery: "Sijilat ద్వారా బహ్రెయిన్‌లో కొత్త కంపెనీని ఎలా నమోదు చేయాలి?",
    visaServicesQuery: "బహ్రెయిన్ వ్యాపార వీసా కోసం నాకు ఏమైనా పత్రాలు అవసరం?",
    lmraQuery: "LMRA ద్వారా సుదీర్ఘ పని అనుమతి (స్వీయ ప్రాయోజితం) కోసం ఎలా దరఖాస్తు చేయాలి?",
    culturalGuidelinesQuery: "ముస్లిం దేశమైన బహ్రెయిన్‌లో నివసించడానికి మరియు పని చేయడానికి సాంస్కృతిక మార్గదర్శకాలు ఏమిటి?",
    muslimCountryEtiquetteQuery: "ముస్లిం దేశంలో శిష్టాచారం మరియు ప్రవర్తన గురించి ఏమి తెలుసుకోవాలి?",
    mentalHealthQuery: "బహ్రెయిన్‌లో వలసదారులకు లభ్యమయ్యే మానసిక ఆరోగ్య సహాయం ఏమిటి?",
    expatMentalHealthQuery: "వలసదారులు మానసిక ఆరోగ్య సేవలు మరియు మద్దతు ఎలా పొందగలరు?",
    
    // Loading states
    aiThinking: "Umoja ఆలోచిస్తోంది...",
    connectionRetrying: "కనెక్షన్ తెగిపోయింది, తిరిగి ప్రయత్నిస్తోంది...",
    connectionFallback: "స్థిరమైన మోడ్‌కు మార్చబడింది",
    
    // Common
    loading: "లోడ్ అవుతోంది...",
    error: "పొరపాటు",
    tryAgain: "మళ్లీ ప్రయత్నించండి",
    close: "మూసివేయండి",
    menu: "మెనూ",
    
    // KnowledgeBase specific
    overview: "అవలోకనం",
    knowledgeBaseTitle: "📚 బహ్రెయిన్ ఉద్యోగ చట్టం నాలెడ్జ్ బేస్",
    expatriateResidentKnowledgeBase: "📚 ప్రవాస నివాసితుల నాలెడ్జ్ బేస్",
    expatriateKnowledgeBaseSummary: "బహ్రెయిన్‌లో ప్రవాస జీవితం యొక్క అన్ని అంశాలను కవర్ చేసే సమగ్ర గైడ్, ఇందులో ఉద్యోగ చట్టాలు, సాంస్కృతిక మార్గదర్శకాలు, మానసిక ఆరోగ్య మద్దతు, వీసా ప్రక్రియలు, నివాసం, ఆరోగ్య సేవలు, బ్యాంకింగ్ సేవలు రవాణా, విద్య మరియు సముదాయ వనరులు ఉన్నాయి.",
    bahrainLabourLaw: "బహ్రెయిన్ ఉద్యోగ చట్టం",
    visaImmigration: "వీసా మరియు ఇమ్మిగ్రేషన్",
    housingAccommodation: "నివాసం మరియు వసతి",
    healthcareMedical: "ఆరోగ్య సేవలు మరియు వైద్యం",
    bankingFinance: "బ్యాంకింగ్ మరియు ఫైనాన్స్",
    transportation: "రవాణా",
    educationSchooling: "విద్య మరియు పాఠశాల",
    hideDetails: "వివరాలను దాచండి",
    showAvailableTopics: "అందుబాటులో ఉన్న విషయాలను చూపించు",
    selectCategoryMsg: "బహ్రెయిన్‌లో ప్రవాస జీవితం పై సమగ్ర అంశాలను అన్వేషించడానికి పై వర్గాన్ని ఎంచుకోండి. ప్రతి నమోదు వీసాలు, నివాసం, ఆరోగ్య సేవలు, బ్యాంకింగ్, రవాణా, విద్య, కమ్యూనిటీ మద్దతు మరియు కార్మిక చట్టాలపై ప్రాయోగిక సమాచారాన్ని కలిగి ఉంటుంది.",
    source: "మూలం",
    leaveBenefits: "లీవ్ మరియు ప్రయోజనాలు",
    wagesPayment: "వేతనం మరియు చెల్లింపు",
    disputes: "వివాదాలు",
    termination: "ముగింపు",
    employment: "ఉద్యోగం",
    overtime: "అదనపు సమయం",
    
    // Footer specific
    copyright: "© {year} Umoja-Aware. అన్ని హక్కులు ప్రత్యేకంగా ఉన్నాయి.",
    about: "గురించి",
    terms: "నిబంధనలు",
    privacy: "గోప్యత",
  },

  // Punjabi
  pa: {
    // Header
    umojaAware: "Umoja-Aware",
    
    // Navigation
    chat: "ਚੈਟ",
    knowledgeBase: "ਨਾਲੈਜ ਬੇਸ",
    community: "ਸਮਾਜ",
    
    // Chat Interface
    typeYourMessage: "ਆਪਣਾ ਸੁਨੇਹਾ ਇੱਥੇ ਲਿਖੋ...",
    send: "ਭੇਜੋ",
    askQuestion: "ਸਵਾਲ ਪੁੱਛੋ",
    howCanIHelp: "ਮੈਂ ਅੱਜ ਤੁਹਾਡੀ ਬਹਿਰੀਨ ਦੇ ਕਾਨੂੰਨੀ ਮਾਮਲਿਆਂ ਵਿੱਚ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",
    selectCategory: "ਕੈਟਗਰੀ ਚੁਣੋ (ਐਚ्छਿਕ)",
    
    // Categories
    labourLaw: "ਮਜ਼ਦੂਰ ਕਾਨੂੰਨ",
    companyFormation: "ਕੰਪਨੀ ਗਠਨ",
    visaServices: "ਵੀਜ਼ਾ ਸੇਵਾਵਾਂ",
    gracePeriod: "ਰਾਹਤ ਅਵਧੀ",
    lmra: "LMRA",
    sijilat: "ਸਿਜਿਲਾਟ",
    generalLegal: "ਸਧਾਰਣ ਕਾਨੂੰਨੀ",
    other: "ਹੋਰ",
    culturalGuidelines: "ਸਾਂਸਕ੍ਰਿਤਿਕ ਹਦਾਇਤਾਂ",
    mentalHealth: "ਮਨੋਵਿਗਿਆਨਕ ਸਿਹਤ",
    culturalGuidelinesGuide: "ਸਾਂਸਕ੍ਰਿਤਿਕ ਹਦਾਇਤਾਂ ਦੀ ਗਾਈਡ",
    muslimCountryEtiquette: "ਮੁਸਲਿਮ ਦੇਸ਼ ਵਿੱਚ ਅਦਬ",
    decencyLaws: "ਸ਼ਾਲੀਨਤਾ ਦੇ ਕਾਨੂੰਨ",
    ramadanGuidelines: "ਰਮਜ਼ਾਨ ਹਦਾਇਤਾਂ",
    prayerTimes: "ਨਮਾਜ/ਅਰਦਾਸ ਦੇ ਸਮੇਂ",
    dressCode: "ਪਹਿਨਾਵੇ ਦੇ ਨਿਯਮ",
    publicBehaviour: "ਜਨਤਕ ਵਰਤਾਓ",
    mentalHealthGuide: "ਮਨ-ਸਿਹਤ ਗਾਈਡ",
    expatMentalHealth: "ਪਰਵਾਸੀਆਂ ਦੀ ਮਨ-ਸਿਹਤ",
    counselingServices: "ਕਾਊਂਸਲਿੰਗ ਅਤੇ ਥੈਰੇਪੀ ਸੇਵਾਵਾਂ",
    stressManagement: "ਤਣਾਅ ਪ੍ਰਬੰਧਨ",
    communitySupport: "ਸਮੁਦਾਈ ਸਹਾਇਤਾ",
    emergencyContacts: "ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ",
    
    // Knowledge Base
    bahrainLegalGuide: "ਬਹਿਰੀਨ ਕਾਨੂੰਨੀ ਗਾਈਡ",
    searchKnowledge: "ਨਾਲੈਜ ਬੇਸ ਵਿੱਚ ਖੋਜ ਕਰੋ...",
    labourLawGuide: "ਮਜ਼ਦੂਰ ਕਾਨੂੰਨ ਗਾਈਡ",
    workingHours: "ਕੰਮ ਦੇ ਘੰਟੇ ਅਤੇ ਓਵਰਟਾਈਮ",
    salaryRegulations: "ਤਨਖਾਹ ਅਤੇ ਲਾਭ",
    terminationRights: "ਸਮਾਪਤੀ ਅਤੇ ਹੱਕ",
    businessGuide: "ਵਪਾਰ ਗਠਨ ਗਾਈਡ",
    companyRegistration: "ਕੰਪਨੀ ਰਜਿਸਟ੍ਰੇਸ਼ਨ",
    licenseRequirements: "ਲਾਇਸੈਂਸ ਲੋੜਾਂ",
    sijillatProcess: "ਸਿਜਿਲਾਟ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਪ੍ਰਕਿਰਿਆ",
    visaGuide: "ਵੀਜ਼ਾ ਅਤੇ ਇਮੀਗ੍ਰੇਸ਼ਨ ਗਾਈਡ",
    residencePermit: "ਨਿਵਾਸ ਪਰਮਿਟ",
    workVisa: "ਕੰਮ ਵੀਜ਼ਾ",
    visitorVisa: "ਮੁਲਾਕਾਤੀ ਵੀਜ਼ਾ",
    
    // Community
    joinCommunity: "ਸਾਡੇ ਸਮਾਜ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ",
    whatsappGroup: "WhatsApp ਗਰੁੱਪ",
    telegramChannel: "ਟੈਲੀਗ੍ਰਾਮ ਚੈਨਲ",
    connectWithUs: "ਸੋਸ਼ਲ ਮੀਡੀਆ 'ਤੇ ਸਾਡੇ ਨਾਲ ਜੁੜੇ ਰਹੋ ਅਤੇ ਨਵੀਨਤਮ ਕਾਨੂੰਨੀ ਜਾਣਕਾਰੀ ਨਾਲ ਅੱਪਡੇਟ ਰਹੋ।",
    
    // Footer
    disclaimer: "ਅਸਵੀਕਾਰ",
    disclaimerText: "ਇਹ ਔਜ਼ਾਰ ਆਮ ਕਾਨੂੰਨੀ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ ਅਤੇ ਇਸਨੂੰ ਪੇਸ਼ੇਵਰ ਕਾਨੂੰਨੀ ਸਲਾਹ ਵਜੋਂ ਨਹੀਂ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ। ਵਿਸ਼ੇਸ਼ ਕਾਨੂੰਨੀ ਮਾਮਲਿਆਂ ਲਈ, ਕਿਰਪਾ ਕਰਕੇ ਯੋਗ ਕਾਨੂੰਨੀ ਪੇਸ਼ੇਵਰਾਂ ਨਾਲ ਸਲਾਹ-ਮਸ਼ਵਰਾ ਕਰੋ।",
    cookiesNotice: "ਅਸੀਂ ਤੁਹਾਡੇ ਅਨੁਭਵ ਨੂੰ ਬਿਹਤਰ ਬਣਾਉਣ ਲਈ ਕੁਕੀਆਂ ਵਰਤਦੇ ਹਾਂ। ਇਸ ਸਾਈਟ ਦੀ ਵਰਤੋਂ ਜਾਰੀ ਰੱਖ ਕੇ, ਤੁਸੀਂ ਸਾਡੀ ਕੁਕੀ ਵਰਤੋਂ ਨਾਲ ਸਹਿਮਤ ਹੋ।",
    acceptCookies: "ਕੁਕੀਆਂ ਸਵੀਕਾਰ ਕਰੋ",
    
    // Welcome message
    welcomeTitle: "Umoja-Aware ਵਿੱਚ ਸੁਆਗਤ ਹੈ",
    welcomeDescription: "ਬਹਿਰੀਨ ਵਿੱਚ ਰਹਿ ਰਹੇ ਪ੍ਰਵਾਸੀਆਂ ਲਈ ਤੁਹਾਡਾ ਮਾਹਿਰ AI ਸਹਾਇਕ। ਮੈਂ ਕਰਮਚਾਰੀ ਅਧਿਕਾਰਾਂ, ਤਨਖਾਹ ਨਿਯਮਾਂ, ਕੰਮ ਦੇ ਘੰਟਿਆਂ, ਸਮਾਪਤੀ ਪ੍ਰਕਿਰਿਆਵਾਂ ਅਤੇ ਸੰਬੰਧਿਤ ਮਾਮਲਿਆਂ ਬਾਰੇ ਜਾਣਕਾਰੀ ਕਈ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ!",
    
    // Predefined queries
    labourLawQuery: "ਬਹਿਰੀਨ ਮਜ਼ਦੂਰ ਕਾਨੂੰਨ ਦੇ ਅਧੀਨ ਕਰਮਚਾਰੀਆਂ ਦੇ ਮੂਲ ਅਧਿਕਾਰ ਕੀ ਹਨ?",
    companyFormationQuery: "ਮੈਂ Sijilat ਰਾਹੀਂ ਬਹਿਰੀਨ ਵਿੱਚ ਨਵੀਂ ਕੰਪਨੀ ਕਿਵੇਂ ਰਜਿਸਟਰ ਕਰਾਂ?",
    visaServicesQuery: "ਬਹਿਰੀਨ ਵਪਾਰਕ ਵੀਜ਼ਾ ਲਈ ਮੈਨੂੰ ਕਿਹੜੇ ਦਸਤਾਵੇਜ਼ਾਂ ਦੀ ਲੋੜ ਹੈ?",
    lmraQuery: "ਮੈਂ LMRA ਰਾਹੀਂ ਲਚਕੀਲੇ ਕੰਮ ਦੇ ਪਰਮਿਟ (ਆਪਣੇ ਆਪ ਨੂੰ ਪ੍ਰਯੋਜਿਤ) ਲਈ ਕਿਵੇਂ ਅਰਜ਼ੀ ਦਿੰਦਾ ਹਾਂ?",
    culturalGuidelinesQuery: "ਮੁਸਲਿਮ ਦੇਸ਼ ਬਹਿਰੀਨ ਵਿੱਚ ਰਹਿਣ ਤੇ ਕੰਮ ਕਰਨ ਲਈ ਸਾਂਸਕ੍ਰਿਤਿਕ ਹਦਾਇਤਾਂ ਕੀ ਹਨ?",
    muslimCountryEtiquetteQuery: "ਮੁਸਲਿਮ ਦੇਸ਼ ਵਿੱਚ ਅਦਬ ਅਤੇ ਵਰਤਾਓ ਬਾਰੇ ਕੀ ਜਾਣਨਾ ਚਾਹੀਦਾ ਹੈ?",
    mentalHealthQuery: "ਬਹਿਰੀਨ ਵਿੱਚ ਪਰਵਾਸੀਆਂ ਲਈ ਕਿਹੜਾ ਮਨੋਵਿਗਿਆਨਕ ਸਹਾਇਤਾ ਉਪਲਬਧ ਹੈ?",
    expatMentalHealthQuery: "ਪਰਵਾਸੀ ਮਨ-ਸਿਹਤ ਸੇਵਾਵਾਂ ਅਤੇ ਸਹਾਇਤਾ ਕਿਵੇਂ ਪ੍ਰਾਪਤ ਕਰ ਸਕਦੇ ਹਨ?",
    
    // Loading states
    aiThinking: "Umoja ਸੋਚ ਰਿਹਾ ਹੈ...",
    connectionRetrying: "ਕਨੈਕਸ਼ਨ ਰੁਕ ਗਿਆ, ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰ ਰਿਹਾ ਹੈ...",
    connectionFallback: "ਸਥਿਰ ਮੋਡ ਵਿੱਚ ਬਦਲਿਆ ਗਿਆ",
    
    // Common
    loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
    error: "ਗਲਤੀ",
    tryAgain: "ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ",
    close: "ਬੰਦ ਕਰੋ",
    menu: "ਮੇਨੂ",
    
    // KnowledgeBase specific
    overview: "ਓਵਰਵਿਊ",
    knowledgeBaseTitle: "📚 ਬਹਿਰੀਨ ਮਜ਼ਦੂਰ ਕਾਨੂੰਨ ਨਲੈਜ ਬੇਸ",
    expatriateResidentKnowledgeBase: "📚 ਪ੍ਰਵਾਸੀ ਨਿਵਾਸੀ ਨਲੈਜ ਬੇਸ",
    expatriateKnowledgeBaseSummary: "ਬਹਿਰੀਨ ਵਿੱਚ ਪ੍ਰਵਾਸੀ ਜੀਵਨ ਦੇ ਸਾਰੇ ਪਹਲੂਆਂ ਨੂੰ ਕਵਰ ਕਰਦਾ ਵਿਆਪਕ ਗਾਈਡ, ਜਿਸ ਵਿੱਚ ਮਜ਼ਦੂਰ ਕਾਨੂੰਨ, ਸੱਭਿਆਚਾਰਕ ਦਿਸ਼ਾ ਨਿਰਦੇਸ਼, ਮਾਨਸਿਕ ਸਿਹਤ ਸਹਾਇਤਾ, ਵੀਜ਼ਾ ਪ੍ਰਕਿਰਿਆਵਾਂ, ਆਵਾਸ, ਸਿਹਤ ਸੇਵਾਵਾਂ, ਬੈਂਕਿੰਗ ਸੇਵਾਵਾਂ, ਆਵਾਜਾਈ, ਸਿੱਖਿਆ ਅਤੇ ਕਮਿਊਨਿਟੀ ਸਰੋਤ ਸ਼ਾਮਲ ਹਨ।",
    bahrainLabourLaw: "ਬਹਿਰੀਨ ਮਜ਼ਦੂਰ ਕਾਨੂੰਨ",
    visaImmigration: "ਵੀਜ਼ਾ ਅਤੇ ਇਮੀਗ੍ਰੇਸ਼ਨ",
    housingAccommodation: "ਆਵਾਸ ਅਤੇ ਰਹਿਣ ਦੀ ਸਹੂਲਤ",
    healthcareMedical: "ਸਿਹਤ ਸੇਵਾਵਾਂ ਅਤੇ ਚਿਕਿਤਸਾ",
    bankingFinance: "ਬੈਂਕਿੰਗ ਅਤੇ ਵਿੱਤ",
    transportation: "ਆਵਾਜਾਈ",
    educationSchooling: "ਸਿੱਖਿਆ ਅਤੇ ਸਕੂਲਿੰਗ",
    hideDetails: "ਵਿਵਰਨ ਲੁਕਾਓ",
    showAvailableTopics: "ਉਪਲਬਧ ਵਿਸ਼ੇ ਵੇਖੋ",
    selectCategoryMsg: "ਬਹਿਰੀਨ ਵਿਚ ਪਰਵਾਸੀ ਜੀਵਨ ਦੇ ਵਿਆਪਕ ਵਿਸ਼ਿਆਂ ਦੀ ਪੜਚਾਲ ਕਰਨ ਲਈ ਉੱਪਰਲੀ ਕੈਟਗਰੀ ਚੁਣੋ। ਹਰ ਐਂਟਰੀ ਵਿਚ ਵੀਜ਼ਾ, ਆਵਾਸ, ਸਿਹਤ ਸੇਵਾਵਾਂ, ਬੈਂਕਿੰਗ, ਆਵਾਜਾਈ, ਸਿੱਖਿਆ, ਕਮਿਊਨਿਟੀ ਸਹਾਇਤਾ ਅਤੇ ਮਜ਼ਦੂਰੀ ਕਾਨੂੰਨਾਂ ਬਾਰੇ ਕਾਰਗਰ ਜਾਣਕਾਰੀ ਹੁੰਦੀ ਹੈ।",
    source: "ਸਰੋਤ",
    leaveBenefits: "ਛੁੱਟੀ ਅਤੇ ਲਾਭ",
    wagesPayment: "ਵੇਜ ਅਤੇ ਭੁਗਤਾਨ",
    disputes: "ਵਿਵਾਦ",
    termination: "ਸਮਾਪਤੀ",
    employment: "ਰੋਜ਼ਗਾਰ",
    overtime: "ਓਵਰਟਾਈਮ",
    
    // Footer specific
    copyright: "© {year} Umoja-Aware. ਸਭ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।",
    about: "ਬਾਰੇ",
    terms: "ਸ਼ਰਤਾਂ",
    privacy: "ਗੋਪਨੀਯਤਾ",
  },

  // Nepali
  ne: {
    // Header
    umojaAware: "Umoja-Aware",
    
    // Navigation
    chat: "च्याट",
    knowledgeBase: "ज्ञान आधार",
    community: "समुदाय",
    
    // Chat Interface
    typeYourMessage: "आफ्नो सन्देश यहाँ टाइप गर्नुहोस्...",
    send: "पठाउनुहोस्",
    askQuestion: "प्रश्न सोध्नुहोस्",
    howCanIHelp: "म तपाईंलाई आज बहराइन कानुनी मामिलाहरूमा कसरी सहायता गर्न सक्छु?",
    selectCategory: "श्रेणी चयन गर्नुहोस् (वैकल्पिक)",
    
    // Categories
    labourLaw: "श्रम कानून",
    companyFormation: "कम्पनी गठन",
    visaServices: "भिसा सेवाहरू",
    gracePeriod: "अनुग्रह अवधि",
    lmra: "LMRA",
    sijilat: "सिजिलात",
    generalLegal: "सामान्य कानुनी",
    other: "अन्य",
    culturalGuidelines: "सांस्कृतिक मार्गदर्शन",
    mentalHealth: "मानसिक स्वास्थ्य",
    culturalGuidelinesGuide: "सांस्कृतिक मार्गदर्शनको गाईड",
    muslimCountryEtiquette: "मुस्लिम देशको शिष्टाचार",
    decencyLaws: "शालीनता सम्बन्धी कानून",
    ramadanGuidelines: "रमजान मार्गदर्शन",
    prayerTimes: "प्रार्थनाको समय",
    dressCode: "पेहेराको नियम",
    publicBehaviour: "सार्वजनिक व्यवहार",
    mentalHealthGuide: "मानसिक स्वास्थ्य गाईड",
    expatMentalHealth: "विदेशीहरूको मानसिक स्वास्थ्य",
    counselingServices: "काउन्सेलिङ र थेरापी सेवा",
    stressManagement: "तनाव व्यवस्थापन",
    communitySupport: "समुदायिक समर्थन",
    emergencyContacts: "आपतकालीन सम्पर्क",
    
    // Knowledge Base
    bahrainLegalGuide: "बहराइन कानुनी मार्गदर्शन",
    searchKnowledge: "ज्ञान आधार खोज्नुहोस्...",
    labourLawGuide: "श्रम कानून मार्गदर्शन",
    workingHours: "कार्य समय र ओभरटाइम",
    salaryRegulations: "तलब र लाभहरू",
    terminationRights: "समाप्ति र अधिकारहरू",
    businessGuide: "व्यवसाय गठन मार्गदर्शन",
    companyRegistration: "कम्पनी दर्ता",
    licenseRequirements: "इजाजत आवश्यकताहरू",
    sijillatProcess: "सिजिलात दर्ता प्रक्रिया",
    visaGuide: "भिसा र आप्रवासन मार्गदर्शन",
    residencePermit: "बसोबास अनुमति",
    workVisa: "काम भिसा",
    visitorVisa: "आगन्तुक भिसा",
    
    // Community
    joinCommunity: "हाम्रो समुदायमा सामेल हुनुहोस्",
    whatsappGroup: "WhatsApp समूह",
    telegramChannel: "टेलिग्राम च्यानल",
    connectWithUs: "सामाजिक सञ्जालमा हामीसँग जडिनुहोस् र पछिल्लो कानुनी जानकारीसँग अद्यावधिक रहनुहोस्।",
    
    // Footer
    disclaimer: "अस्वीकरण",
    disclaimerText: "यस उपकरणले सामान्य कानुनी जानकारी प्रदान गर्छ र यसलाई पेशेवर कानुनी सलहको रूपमा लिनु हुँदैन। विशिष्ट कानुनी मामिलाहरूका लागि, कृपया योग्य कानुनी पेशेवरहरूसँग सल्लाह लिनुहोस्।",
    cookiesNotice: "हामी तपाईंको अनुभव सुधार गर्न कुकीहरू प्रयोग गर्छौं। यो साइट प्रयोग जारी राखेर, तपाईं हाम्रो कुकी प्रयोगसँग सहमत हुनुहुन्छ।",
    acceptCookies: "कुकीहरू स्वीकार गर्नुहोस्",
    
    // Welcome message
    welcomeTitle: "Umoja-Aware मा स्वागत छ",
    welcomeDescription: "बहराइनमा बसोबास गर्ने प्रवासीहरूका लागि तपाईंको विशेषज्ञ AI सहायक। म कर्मचारी अधिकारहरू, तलब नियमहरू, कार्य समय, समाप्ति प्रक्रियाहरू र सम्बन्धित मामिलाहरूमा जानकारी बहुभाषिक रूपमा सहायता गर्न सक्छु!",
    
    // Predefined queries
    labourLawQuery: "बहराइन श्रम कानून अन्तर्गत कर्मचारीहरूका आधारभूत अधिकारहरू के के हुन्?",
    companyFormationQuery: "म Sijilat मार्फत बहराइनमा नयाँ कम्पनी कसरी दर्ता गर्न सक्छु?",
    visaServicesQuery: "बहराइन व्यापार भिसाका लागि मलाई कस्ता कागजातहरू चाहिन्छन्?",
    lmraQuery: "म LMRA मार्फत लचिलो कार्य अनुमति (स्वयं प्रायोजित) को लागि कसरी आवेदन गर्न सक्छु?",
    culturalGuidelinesQuery: "मुस्लिम देश रहेको बह्रैनमा बस्न‑काम गर्न सांस्कृतिक मार्गदर्शनहरू के‑के हुन्?",
    muslimCountryEtiquetteQuery: "मुस्लिम देशमा शिष्टाचार र व्यवहारबारे के जान्नुपर्छ?",
    mentalHealthQuery: "बह्रैनमा विदेशीका लागि उपलब्ध मानसिक स्वास्थ्य समर्थन के‑के छन्?",
    expatMentalHealthQuery: "विदेशीहरू मानसिक स्वास्थ्य सेवाहरू र समर्थन कसरी पहुँच गर्न सक्छन्?",
    
    // Loading states
    aiThinking: "Umoja सोच्दैछ...",
    connectionRetrying: "कनेक्सन बाधित भयो, पुनः प्रयास गर्दै...",
    connectionFallback: "स्थिर मोडमा स्विच गरियो",
    
    // Common
    loading: "लोड गर्दै...",
    error: "त्रुटि",
    tryAgain: "फेरि प्रयास गर्नुहोस्",
    close: "बन्द गर्नुहोस्",
    menu: "मेनू",
    
    // KnowledgeBase specific
    overview: "अवलोकन",
    knowledgeBaseTitle: "📚 बहराइन श्रम कानून ज्ञान आधार",
    expatriateResidentKnowledgeBase: "📚 प्रवासी बासिन्दा ज्ञान आधार",
    expatriateKnowledgeBaseSummary: "बहराइनमा प्रवासी जीवनका सबै पक्षहरू समेट्ने समग्र मार्गदर्शन, जसमा श्रम कानूनहरू, सांस्कृतिक मार्गदर्शन, मानसिक स्वास्थ्य समर्थन, भिसा प्रक्रियाहरू, आवास, स्वास्थ्य सेवा, बैंकिङ सेवा, यातायात, शिक्षा र सामुदायिक स्रोतहरू समावेश छन्।",
    bahrainLabourLaw: "बहराइन श्रम कानून",
    visaImmigration: "भिसा र आप्रवासन",
    housingAccommodation: "आवास र बसोबास",
    healthcareMedical: "स्वास्थ्य सेवा र चिकित्सा",
    bankingFinance: "बैंकिङ र वित्त",
    transportation: "यातायात",
    educationSchooling: "शिक्षा र स्कूली",
    hideDetails: "विवरण लुकाउनुहोस्",
    showAvailableTopics: "उपलब्ध विषयहरू देखाउनुहोस्",
    selectCategoryMsg: "बहराइनमा प्रवासी जीवनका व्यापक विषयहरू अन्वेषण गर्न माथिको श्रेणी चयन गर्नुहोस्। प्रत्येक प्रविष्टिमा भिसा, आवास, स्वास्थ्य सेवा, बैंकिङ, यातायात, शिक्षा, सामुदायिक सहयोग र श्रम कानुनसम्बन्धी व्यावहारिक जानकारी समावेश हुन्छ।",
    source: "स्रोत",
    leaveBenefits: "बिदा र लाभहरू",
    wagesPayment: "ज्याला र भुक्तानी",
    disputes: "विवादहरू",
    termination: "समाप्ति",
    employment: "रोजगारी",
    overtime: "ओभरटाइम",
    
    // Footer specific
    copyright: "© {year} Umoja-Aware. सबै अधिकार सुरक्षित।",
    about: "बारेमा",
    terms: "सर्तहरू",
    privacy: "गोपनीयता",
  },

  // Amharic
  am: {
    // Header
    umojaAware: "Umoja-Aware",
    
    // Navigation
    chat: "ውይይት",
    knowledgeBase: "የእውቀት መሰረት",
    community: "ማኅበረሰብ",
    
    // Chat Interface
    typeYourMessage: "መልእክትዎን እዚህ ይተይቡ...",
    send: "ላክ",
    askQuestion: "ጥያቄ ይጠይቁ",
    howCanIHelp: "ዛሬ በባህሬይን የህግ ጉዳዮች ውስጥ እንዴት ልርዳዎት?",
    selectCategory: "ምድብ ይምረጡ (አማራኪ)",
    
    // Categories
    labourLaw: "የሰራተኞች ህግ",
    companyFormation: "የኩባንያ መስርት",
    visaServices: "የቪዊሳ አገልግሎት",
    gracePeriod: "የአመራር ወቅት",
    lmra: "LMRA",
    sijilat: "ሲጂሊላት",
    generalLegal: "አጠቃላይ ህግ",
    other: "ሌላ",
    culturalGuidelines: "የባህል መመሪያዎች",
    mentalHealth: "የአእምሮ ጤና",
    culturalGuidelinesGuide: "የባህል መመሪያ መምሪያ",
    muslimCountryEtiquette: "በእስልምና ሀገር ውስጥ ሥነ‑ምግባር",
    decencyLaws: "የክብርና ሥነ‑ምግባር ህጎች",
    ramadanGuidelines: "የረመዳን መመሪያ",
    prayerTimes: "የጸሎት ሰዓታት",
    dressCode: "የአልባ መመሪያ",
    publicBehaviour: "ስነ‑ምግባር በህዝብ ስፍራ",
    mentalHealthGuide: "የአእምሮ ጤና መመሪያ",
    expatMentalHealth: "የእንግዶች የአእምሮ ጤና",
    counselingServices: "የምክር እና የህክምና አገልግሎቶች",
    stressManagement: "የጭንቀት አስተዳደር",
    communitySupport: "የማኅበረሰብ ድጋፍ",
    emergencyContacts: "የድንገተኛ መገናኛ",
    
    // Knowledge Base
    bahrainLegalGuide: "የባህሬይን ህግ መምሪያ",
    searchKnowledge: "የእውቀት መሰረት ይፈልጉ...",
    labourLawGuide: "የሰራተኞች ህግ መምሪያ",
    workingHours: "የስራ ሰዓት እና ከስራ በላይ ሰዓት",
    salaryRegulations: "የደመወዝ እና ጥቅሞች",
    terminationRights: "ማቋረጥ እና መብቶች",
    businessGuide: "የንግድ መስርት መምሪያ",
    companyRegistration: "የኩባንያ ምዝገባ",
    licenseRequirements: "የፍቃድ መስፈርት",
    sijillatProcess: "የሲጂሊላት ምዝገባ ሂደት",
    visaGuide: "የቪዊሳ እና የመጤ ህግ መምሪያ",
    residencePermit: "የመኖሪያ ፍቃድ",
    workVisa: "የስራ ቪዊሳ",
    visitorVisa: "የተመራቂዊ ቪዊሳ",
    
    // Community
    joinCommunity: "የአንተ ማኅበረሰብ ውስጥ ተቀላቀሉ",
    whatsappGroup: "የWhatsApp ቡድን",
    telegramChannel: "የቴሌግራም መንገድ",
    connectWithUs: "በማኅበራዊ መገናኛ ውስጥ ከአንተ ጋር ተገናኝ እና በአዲስ የህግ መረጃ ውስጥ ዘመናዊ ኩኑ.",
    
    // Footer
    disclaimer: "አስተዋውቆ",
    disclaimerText: "ይህ መሳሪያ አጠቃላይ የህግ መረጃ ይሰጣል እና እንደ ሙያዊ የህግ ምክር አይወሰድም። ለተለየ የህግ ጉዳዮች፣ እባክዎን ከብቃማ የህግ ባለሙያዎች ጋር ይምከርቡ።",
    cookiesNotice: "የአንተን አስተርአይ ለማሻሻል ኩኪቶችን እንጠቀማለን። ይህንን ጣቢያ በመጠቀም መቀጠልዎ ከአንተ ኩኪቶችን መጠቀም ውስጥ ይስማማል።",
    acceptCookies: "ኩኪቶችን ተቀበል",
    
    // Welcome message
    welcomeTitle: "ወደ Umoja-Aware እንኳን በደህና መጡ",
    welcomeDescription: "ለባህሬይን ውስጥ የሚኖኑት የውጭ ሰዎች የአንተ የሙያ AI ረዳት። በሰራተኞች መብቶች፣ የደመወዝ ደንቦች፣ የስራ ሰዓቶች፣ የማቋረጥ ሂደቶች እና የተያያዙ ጉዳዮች ውስጥ መረጃ በበዙኛ ቋንቋ ውስጥ ልርዳዎት!",
    
    // Predefined queries
    labourLawQuery: "በባህሬይን የሰራተኞች ህግ ስር የሰራተኞች መሰረታዊ መብቶች ምንድን ናቸው?",
    companyFormationQuery: "በSijilat በኩል በባህሬይን ውስጥ አዲስ ኩባንያ እንዴት ልመዝግብ?",
    visaServicesQuery: "ለባህሬይን የንግድ ቪዊሳ ምን ያህል መረጃ ያስፈልገኛል?",
    lmraQuery: "በLMRA በኩል የተለየ የስራ ፍቃድ (የራስዎ መደገፊ) እንዴት ልጠይቅ?",
    culturalGuidelinesQuery: "እስልምና ሀገር ባለች ባህሬን ውስጥ መኖርና መሥራት ላይ የባህላዊ መመሪያዎች ምንድናቸው?",
    muslimCountryEtiquetteQuery: "በእስልምና ሀገር ውስጥ ስርዓትና ባህሪ ስለሚገባ ምን ማወቅ ያስፈልጋል?",
    mentalHealthQuery: "ባህሬን ውስጥ ለእንግዶች የሚገኙ የስነ‑ልቦና ድጋፎች ምንድናቸው?",
    expatMentalHealthQuery: "እንግዶች የስነ‑ልቦና አገልግሎቶችን እና ድጋፍን እንዴት ሊያገኙ ይችላሉ?",
    
    // Loading states
    aiThinking: "Umoja እያሰበ ነው...",
    connectionRetrying: "ግንኙነቱ ተቋረጠ፣ እየሞከረ ነው...",
    connectionFallback: "ወደ መረጋማ ሁነታ ተቀየረ",
    
    // Common
    loading: "እየጫነ ነው...",
    error: "ስህተት",
    tryAgain: "እንደገና ሞክር",
    close: "ዝጋ",
    menu: "መንግስቱ",
    
    // KnowledgeBase specific
    overview: "አጠቃላይ እይታ",
    knowledgeBaseTitle: "📚 የባህሬይን የሰራተኞች ህግ የእውቀት መሰረት",
    expatriateResidentKnowledgeBase: "📚 ለውጪ ዜጎች የእውቀት መሰረት",
    expatriateKnowledgeBaseSummary: "በባህሬይን ውስጥ የውጪ ዜጎች ሕይቀት በሙሉ በኩል የሚያዳርስ ሙሉ መመሪያ፣ የሰራተኞች ህግን፣ የባህል መመሪያን፣ የአእምሮ ጤና እርዳታን፣ የቪዊሳ ሂደትን፣ መኖሪያን፣ የጤና አገልግሎትን፣ የባንክ አገልግሎትን፣ መጓጓዣን፣ ትምህርትን እና የማኅበረሰብ ሀብቶችን ያካትታል።",
    bahrainLabourLaw: "የባህሬይን የሰራተኞች ህግ",
    visaImmigration: "ቪዊሳ እና መግቢያ",
    housingAccommodation: "መኖሪያ እና መቀመጫ",
    healthcareMedical: "የጤና አገልግሎት እና ህክምና",
    bankingFinance: "ባንክ እና ፋይናንስ",
    transportation: "መጓጓዣ",
    educationSchooling: "ትምህርት እና ትምህርት ቤት",
    hideDetails: "ዝርዝሮችን ደብቅ",
    showAvailableTopics: "የተመረጡ ርዕሶችን አሳይ",
    selectCategoryMsg: "በባህሬን ውስጥ የውጪ ዜጎች ሕይወት ያለውን ሰፊ ርዕስ ለመመርመር ከላይ ምድብ ይምረጡ። እያንዳንዱ ግቤት ላይ ቪዛ፣ መኖሪያ፣ ጤና እንክብካቤ፣ ባንክ፣ መጓጓዣ፣ ትምህርት፣ የማኅበረሰብ ድጋፍና የሥራ ህግ የሚመለከቱ ተግባራዊ መረጃዎች ይገኛሉ።",
    source: "ምንጭ",
    leaveBenefits: "የአረፍ እና ጥቅሞች",
    wagesPayment: "የደመወዝ እና ክፍያ",
    disputes: "ግጭቶች",
    termination: "ማቋረጥ",
    employment: "ስራ",
    overtime: "ከስራ በላይ ሰዓት",
    
    // Footer specific
    copyright: "© {year} Umoja-Aware. ሁሉም መብቶች የተጠበቁ ናቸው።",
    about: "ስለ",
    terms: "ስምምነቶች",
    privacy: "ግልጋሎት",
  },

  // Oromo
  om: {
    // Header
    umojaAware: "Umoja-Aware",
    
    // Navigation
    chat: "Marii",
    knowledgeBase: "Irra qabduu beekumsa",
    community: "Hawaasa",
    
    // Chat Interface
    typeYourMessage: "Ibsa kee asitti barreessi...",
    send: "Ergaa",
    askQuestion: "Gaafii gaafadhu",
    howCanIHelp: "Har'a akkamitti gara mootummaa Bahrain tajajjilaa na gargaara?",
    selectCategory: "Kutaale filadhaa (filannoo)",
    
    // Categories
    labourLaw: "Heera hojii",
    companyFormation: "Hundeeffama kampaanii",
    visaServices: "Tajaajila viizaa",
    gracePeriod: "Yeroo gargaarsaa",
    lmra: "LMRA",
    sijilat: "Sijilat",
    generalLegal: "Seera guutuu",
    other: "Bira",
    culturalGuidelines: "Heera aadaa",
    mentalHealth: "Fayyaa sammuu",
    culturalGuidelinesGuide: "Gorsa heera aadaa",
    muslimCountryEtiquette: "Sirna kabaja biyya Muslimaa",
    decencyLaws: "Seera kabaja fi kunuunsa",
    ramadanGuidelines: "Gorsa Ramadaanaa",
    prayerTimes: "Yeroo kadhannaa",
    dressCode: "Heera uffata",
    publicBehaviour: "Amala uummataa",
    mentalHealthGuide: "Gorsa fayyaa sammuu",
    expatMentalHealth: "Fayyaa sammuu baqattota",
    counselingServices: "Tajaajila gorsaa fi yaalaa",
    stressManagement: "Bulchiinsa dhiphina",
    communitySupport: "Deeggarsa hawaasaa",
    emergencyContacts: "Lakkoofsa quunnamtii balaa",
    
    // Knowledge Base
    bahrainLegalGuide: "Mallattoo seeraa Bahrain",
    searchKnowledge: "Irra qabduu beekumsa naqadhaa...",
    labourLawGuide: "Mallattoo heera hojii",
    workingHours: "Yeroo hojii fi hojii ol'aanaa",
    salaryRegulations: "Hojii fi fayyadama",
    terminationRights: "Xumuraa fi mirga",
    businessGuide: "Mallattoo hundeeffama gibiraa",
    companyRegistration: "Galmaa'ina kampaanii",
    licenseRequirements: "Barbaachisa hayyamaa",
    sijillatProcess: "Tarii galmaa'ina Sijillat",
    visaGuide: "Mallattoo viizaa fi biyya baasuu",
    residencePermit: "Hayyama guutuu",
    workVisa: "Viiza hojii",
    visitorVisa: "Viiza daaw'annaa",
    
    // Community
    joinCommunity: "Hawaasa keenitti makamadhu",
    whatsappGroup: "Waltajjii WhatsApp",
    telegramChannel: "Kallattii Telegram",
    connectWithUs: "Wajjin hawaasa waliin walitti qabadhu fi oduu seeraa haarawaa argadhu.",
    
    // Footer
    disclaimer: "Dhiifama",
    disclaimerText: "Irra qabduu kana oduu seeraa guutuu kenna; kanaafuu gorsa seeraa wabii taasisuu hin qabu. Murtii seeraa addaa irratti, maaloo gorsa seeraa wabiin qaban irraa gorsa fudhadhaa.",
    cookiesNotice: "Muu'annaa kee fooyyessuuf qoqqoddaa fayyadamna. Wabsa kana itti fufiinsaan fayyadamtuun, qoqqoddaa keenya fayyadamna jechuuf ni amantaa.",
    acceptCookies: "Qoqqoddaa fudhadhaa",
    
    // Welcome message
    welcomeTitle: "Umoja-Aware irratti baga nagaan dhufte",
    welcomeDescription: "Gargaara AI wabii kee sirrii ta'een namoota alagaa Bahrain jiraatan. Mirga hojjettoota, sirna hojii, yeroo hojii, tarii xumuraa fi murtii walitti hidhata irratti oduu kennan nan dandeessa!",
    
    // Predefined queries
    labourLawQuery: "Mirga hojjettoota sirna hojii Bahrain jalatti maal irratti murtaayee jira?",
    companyFormationQuery: "Kampaani haaraa Bahrain keessatti Sijilat kauten maal irratti galmaa'uu dandeessa?",
    visaServicesQuery: "Viiza gibiraa Bahrain irratti oduu maal barbaachisa?",
    lmraQuery: "Hayyama hojii sochii qaba (of-qonnaan bulaa) LMRA kauten maal irratti gaafachuu dandeessa?",
    culturalGuidelinesQuery: "Bahrain akka biyya Muslimaa keessatti jiraachuun fi hojjechuun heera aadaa maal qabu?",
    muslimCountryEtiquetteQuery: "Biyya Muslimaa keessatti sirna kabaja fi amala maal beekuu qabna?",
    mentalHealthQuery: "Bahrain keessatti baqattotaaf deeggarsa fayyaa sammuu maal jira?",
    expatMentalHealthQuery: "Baqattotni tajaajila fi deeggarsa fayyaa sammuu akkamitti argatu?",
    
    // Loading states
    aiThinking: "Umoja yaaddaa jira...",
    connectionRetrying: "Waldhunguu dhaabate, irra deebiin yaadaa jira...",
    connectionFallback: "Sirna tasaa taa'ee jijjiirameera",
    
    // Common
    loading: "Dabalataa jira...",
    error: "Dogoggora",
    tryAgain: "Irra deebiin yaadamaa",
    close: "Cufaa",
    menu: "Cuunfaa",
    
    // KnowledgeBase specific
    overview: "Irra qabduu guutuu",
    knowledgeBaseTitle: "📚 Irra qabduu beekumsa heera hojii Bahrain",
    expatriateResidentKnowledgeBase: "📚 Irra qabduu beekumsa baqattota Bahrain jiraatan",
    expatriateKnowledgeBaseSummary: "Baqattota Bahrain jiraatanaf oduu sirrii fi qajeelaa irratti hunda'een. Heera hojii, viizaa, qajeelaa, fayyaa, gibiraa, karaa fagaarsaa, barsiisaa fi deeggarsa hawaasaa irratti beekumsa argadhu.",
    bahrainLabourLaw: "Heera hojii Bahrain",
    visaImmigration: "Viizaa fi biyya baasuu",
    housingAccommodation: "Mana jireenya fi qajeelaa",
    healthcareMedical: "Fayyaa fi tajaajila fayyaa",
    bankingFinance: "Gibiraafi gibirummaa",
    transportation: "Karaa fagaarsaa",
    educationSchooling: "Barsiisaa fi barumsa",
    hideDetails: "Irra qabduu dhoksi",
    showAvailableTopics: "Mata duroo agarsiisi",
    selectCategoryMsg: "Bahrain keessatti jireenya baqattota irratti mataa‑mataa bal’aa qorachuuf gubbaa kutaalee filadhaa. Galmeen hundi visa, mana jireenyaa, tajaajila fayyaa, baankii, imalaa, barnoota, deeggarsa hawaasaa fi seera hojii irratti odeeffannoo hojiirra oolu hammata.",
    source: "Madda",
    leaveBenefits: "Bahaa fi fayyadama",
    wagesPayment: "Hojii fi kaffaltii",
    disputes: "Waldhabdee",
    termination: "Xumuraa",
    employment: "Hojii",
    overtime: "Hojii ol'aanaa",
    
    // Footer specific
    copyright: "© {year} Umoja-Aware. Mirgii hunda kan eegame.",
    about: "Wajjin",
    terms: "Irra qabduu",
    privacy: "Dhuunfaa",
  },

  // Pidgin English (West African)
  pcm: {
    // Header
    umojaAware: "Umoja-Aware",
    
    // Navigation
    chat: "Chat",
    knowledgeBase: "Knowledge Base",
    community: "Community",
    
    // Chat Interface
    typeYourMessage: "Type your message here...",
    send: "Send",
    askQuestion: "Ask question",
    howCanIHelp: "How I fit help you with Bahrain legal matter today?",
    selectCategory: "Select category (optional)",
    apologyProcessing: "Sorry, I dey get small wahala to process your request now. Abeg try again small time.",
    
    // Categories
    labourLaw: "Labour Law",
    companyFormation: "Company Formation",
    visaServices: "Visa Services",
    gracePeriod: "Grace Period",
    lmra: "LMRA",
    sijilat: "Sijilat",
    generalLegal: "General Legal",
    other: "Other",
    culturalGuidelines: "Cultural Guidelines",
    mentalHealth: "Mental Health",
    culturalGuidelinesGuide: "Cultural Guidelines Guide",
    muslimCountryEtiquette: "Muslim Country Etiquette",
    decencyLaws: "Decency Laws",
    ramadanGuidelines: "Ramadan Guidelines",
    prayerTimes: "Prayer Times",
    dressCode: "Dress Code",
    publicBehaviour: "Public Behaviour",
    mentalHealthGuide: "Mental Health Guide",
    expatMentalHealth: "Expat Mental Health",
    counselingServices: "Counseling & Therapy Services",
    stressManagement: "Stress Management",
    communitySupport: "Community Support",
    emergencyContacts: "Emergency Contacts",
    
    // Knowledge Base
    bahrainLegalGuide: "Bahrain Legal Guide",
    searchKnowledge: "Search knowledge base...",
    labourLawGuide: "Labour Law Guide",
    workingHours: "Working Hours & Overtime",
    salaryRegulations: "Salary & Benefits",
    terminationRights: "Termination & Rights",
    businessGuide: "Business Formation Guide",
    companyRegistration: "Company Registration",
    licenseRequirements: "License Requirements",
    sijillatProcess: "Sijillat Registration Process",
    visaGuide: "Visa & Immigration Guide",
    residencePermit: "Residence Permit",
    workVisa: "Work Visa",
    visitorVisa: "Visitor Visa",
    
    // Community
    joinCommunity: "Join Our Community",
    whatsappGroup: "WhatsApp Group",
    telegramChannel: "Telegram Channel",
    connectWithUs: "Connect with us for social media and stay updated with the latest legal information.",
    
    // Footer
    disclaimer: "Disclaimer",
    disclaimerText: "This tool dey provide general legal information and e no be like professional legal advice. For specific legal matter, abeg consult with qualified legal professionals.",
    cookiesNotice: "We dey use cookies to improve your experience. By continuing to use this site, you agree to our use of cookies.",
    acceptCookies: "Accept Cookies",
    
    // Welcome message
    welcomeTitle: "Welcome to Umoja-Aware",
    welcomeDescription: "Your specialized AI assistant for expatriates wey dey live for Bahrain. I fit help you with information on top employee rights, salary regulations, working hours, termination procedures and related matters for plenty languages!",
    
    // Predefined queries
    labourLawQuery: "Which one be the basic employee rights under Bahrain labour law?",
    companyFormationQuery: "How I fit register new company for Bahrain through Sijilat?",
    visaServicesQuery: "Which documents I need for Bahrain business visa?",
    lmraQuery: "How I fit apply for flexible work permit (self-sponsored) through LMRA?",
    culturalGuidelinesQuery: "Wetin be cultural guide to live and work for Bahrain as Muslim country?",
    muslimCountryEtiquetteQuery: "Wetin person suppose know about etiquette and behavior for Muslim country?",
    mentalHealthQuery: "Wetin mental health support dey for expatriates for Bahrain?",
    expatMentalHealthQuery: "How expatriates fit get mental health services and support?",
    
    // Loading states
    aiThinking: "Umoja dey think...",
    connectionRetrying: "Connection don break, e dey retry...",
    connectionFallback: "E don switch to stable mode",
    
    // Common
    loading: "E dey load...",
    error: "Error",
    tryAgain: "Try Again",
    close: "Close",
    menu: "Menu",
    
    // KnowledgeBase specific
    overview: "Overview",
    knowledgeBaseTitle: "📚 Bahrain Labour Law Knowledge Base",
    expatriateResidentKnowledgeBase: "📚 Expatriate Resident Knowledge Base",
    expatriateKnowledgeBaseSummary: "Comprehensive and reliable information for expatriates wey dey live for Bahrain. Find information on top labour law, visa, housing, healthcare, banking, transportation, education and community support.",
    bahrainLabourLaw: "Bahrain Labour Law",
    visaImmigration: "Visa & Immigration",
    housingAccommodation: "Housing & Accommodation",
    healthcareMedical: "Healthcare & Medical",
    bankingFinance: "Banking & Finance",
    transportation: "Transportation",
    educationSchooling: "Education & Schooling",
    hideDetails: "Hide Details",
    showAvailableTopics: "Show Available Topics",
    selectCategoryMsg: "Select category above to explore comprehensive topics for expatriate life in Bahrain. Each entry contains practical information covering visas, housing, healthcare, banking, transportation, education, community support, and labour laws.",
    source: "Source",
    leaveBenefits: "Leave & Benefits",
    wagesPayment: "Wages & Payment",
    disputes: "Disputes",
    termination: "Termination",
    employment: "Employment",
    overtime: "Overtime",
    
    // Footer specific
    copyright: "© {year} Umoja-Aware. All rights reserved.",
    about: "About",
    terms: "Terms",
    privacy: "Privacy",
  },
};

// Helper function to get translations for current language
export const useTranslations = (language: string): Translations => {
  return translations[language] || translations.en;
};
