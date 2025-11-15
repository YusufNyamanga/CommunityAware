export interface Translations {
  // Header
  umojaAware: string;
  
  // Navigation
  chat: string;
  knowledgeBase: string;
  community: string;
  
  // Chat Interface
  typeYourMessage: string;
  send: string;
  askQuestion: string;
  howCanIHelp: string;
  selectCategory: string;
  
  // Categories
  labourLaw: string;
  companyFormation: string;
  visaServices: string;
  gracePeriod: string;
  lmra: string;
  sijilat: string;
  generalLegal: string;
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
  hideDetails: string;
  showAvailableTopics: string;
  selectCategoryMsg: string;
  source: string;
  leaveBenefits: string;
  wagesPayment: string;
  disputes: string;
  termination: string;
  employment: string;
  overtime: string;
  
  // Footer specific
  copyright: string;
  about: string;
  terms: string;
  privacy: string;
}

export const translations: Record<string, Translations> = {
  en: {
    // Header
    umojaAware: "Umoja Aware",
    
    // Navigation
    chat: "Chat",
    knowledgeBase: "Knowledge Base",
    community: "Community",
    
    // Chat Interface
    typeYourMessage: "Type your message here...",
    send: "Send",
    askQuestion: "Ask a question",
    howCanIHelp: "How can I help you with Bahrain legal matters today?",
    selectCategory: "Select a category (optional)",
    
    // Categories
    labourLaw: "Labour Law",
    companyFormation: "Company Formation",
    visaServices: "Visa Services",
    gracePeriod: "Grace Period",
    lmra: "LMRA",
    sijilat: "Sijilat",
    generalLegal: "General Legal",
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
    welcomeTitle: "Welcome to Umoja Aware",
    welcomeDescription: "Your specialized AI assistant for Private Sector Bahrain Labour Law. I can help you with information on employee rights, salary regulations, working hours, termination procedures in multiple languages. Get expert guidance on all labour law matters!",
    
    // Predefined queries
    labourLawQuery: "What are the basic employee rights under Bahrain labour law?",
    companyFormationQuery: "How do I register a new company in Bahrain through Sijilat?",
    visaServicesQuery: "What documents do I need for a Bahrain business visa?",
    lmraQuery: "How do I apply for a flexible work permit through LMRA?",
    
    // Loading states
    aiThinking: "AI is thinking...",
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
    hideDetails: "Hide Details",
    showAvailableTopics: "Show Available Topics",
    selectCategoryMsg: "Select a category above to explore specific topics in Bahrain Labour Law. Each entry contains official information with article references from the Bahrain Labour Law for Private Sector.",
    source: "Source",
    leaveBenefits: "Leave & Benefits",
    wagesPayment: "Wages & Payment",
    disputes: "Disputes",
    termination: "Termination",
    employment: "Employment",
    overtime: "Overtime",
    
    // Footer specific
    copyright: "© {year} Umoja Aware. All rights reserved.",
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
    
    // Chat Interface
    typeYourMessage: "اكتب رسالتك هنا...",
    send: "إرسال",
    askQuestion: "اطرح سؤالاً",
    howCanIHelp: "كيف يمكنني مساعدتك في الأمور القانونية البحرينية اليوم؟",
    selectCategory: "اختر فئة (اختياري)",
    
    // Categories
    labourLaw: "قانون العمل",
    companyFormation: "تأسيس الشركات",
    visaServices: "خدمات التأشيرة",
    gracePeriod: "فترة السماح",
    lmra: "هيئة تنظيم سوق العمل",
    sijilat: "سجلات",
    generalLegal: "قانوني عام",
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
    welcomeDescription: "مساعدك المتخصص في قانون العمل البحريني. يمكنني مساعدتك في حقوق الموظفين، لوائح الراتب، ساعات العمل، إجراءات الإنهاء، وتصاريح العمل من هيئة تنظيم سوق العمل. احصل على إرشادات الخبراء في جميع مسائل قانون العمل!",
    
    // Predefined queries
    labourLawQuery: "ما هي حقوق الموظف الأساسية في قانون العمل البحريني؟",
    companyFormationQuery: "كيف أسجل شركة جديدة في البحرين من خلال سجلات؟",
    visaServicesQuery: "ما الوثائق التي أحتاجها للحصول على تأشيرة عمل بحرينية؟",
    lmraQuery: "كيف أتقدم بطلب للحصول على تصريح عمل مرن (ذاتي الكفالة) من خلال هيئة تنظيم سوق العمل؟",
    
    // Loading states
    aiThinking: "الذكي الاصطناعي يفكر...",
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
    hideDetails: "إخفاء التفاصيل",
    showAvailableTopics: "عرض الموضوعات المتاحة",
    selectCategoryMsg: "اختر فئة أعلاه لاستكشاف مواضيع محددة في قانون العمل في البحرين. يحتوي كل إدخال على معلومات رسمية مع مراجع المقالات من قانون العمل البحريني للقطاع الخاص.",
    source: "المصدر",
    leaveBenefits: "الإجازة والمزايا",
    wagesPayment: "الأجور والدفع",
    disputes: "النزاعات",
    termination: "الإنهاء",
    employment: "التوظيف",
    overtime: "العمل الإضافي",
    
    // Footer specific
    copyright: "© {year} Umoja Aware. جميع الحقوق محفوظة.",
    about: "حول",
    terms: "الشروط",
    privacy: "الخصوصية",
  },
  
  zh: {
    // Header
    umojaAware: "Umoja Aware",
    
    // Navigation
    chat: "聊天",
    knowledgeBase: "知识库",
    community: "社区",
    
    // Chat Interface
    typeYourMessage: "在此输入您的消息...",
    send: "发送",
    askQuestion: "提问",
    howCanIHelp: "今天我如何帮助您解决巴林法律事务？",
    selectCategory: "选择类别（可选）",
    
    // Categories
    labourLaw: "劳动法",
    companyFormation: "公司成立",
    visaServices: "签证服务",
    gracePeriod: "宽限期",
    lmra: "劳动力市场监管局",
    sijilat: "商业注册",
    generalLegal: "一般法律",
    other: "其他",
    
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
    welcomeTitle: "欢迎来到Umoja Aware",
    welcomeDescription: "您在巴林私营部门劳动法方面的专业AI助手。我可以帮助您了解员工权利、薪资规定、工作时间、解雇程序等信息，支持多种语言。在所有劳动法事务上获得专业指导！",
    
    // Predefined queries
    labourLawQuery: "巴林劳动法下员工的基本权利是什么？",
    companyFormationQuery: "如何通过Sijilat在巴林注册新公司？",
    visaServicesQuery: "申请巴林商务签证需要什么文件？",
    lmraQuery: "如何通过LMRA申请灵活工作许可证（自我保荐）？",
    
    // Loading states
    aiThinking: "AI正在思考...",
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
    hideDetails: "隐藏详情",
    showAvailableTopics: "显示可用主题",
    selectCategoryMsg: "选择上面的类别来探索巴林劳动法的特定主题。每个条目都包含来自巴林私营部门劳动法的官方信息和条文参考。",
    source: "来源",
    leaveBenefits: "休假和福利",
    wagesPayment: "工资和支付",
    disputes: "争议",
    termination: "终止",
    employment: "就业",
    overtime: "加班",
    
    // Footer specific
    copyright: "© {year} Umoja Aware. 保留所有权利。",
    about: "关于",
    terms: "条款",
    privacy: "隐私",
  },
  
  es: {
    // Header
    umojaAware: "Umoja Aware",
    
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
    welcomeDescription: "Tu asistente legal de IA para Bahréin. Puedo ayudarte con preguntas sobre derecho laboral, formación de empresas, servicios de visa, procedimientos de LMRA y más. ¡Pregúntame cualquier cosa sobre asuntos legales en Bahréin!",
    
    // Predefined queries
    labourLawQuery: "¿Cuáles son los derechos básicos de los empleados bajo la ley laboral de Bahréin?",
    companyFormationQuery: "¿Cómo registro una nueva empresa en Bahréin a través de Sijilat?",
    visaServicesQuery: "¿Qué documentos necesito para una visa de negocios de Bahréin?",
    lmraQuery: "¿Cómo solicito un permiso de trabajo flexible (autopatrocinado) a través de LMRA?",
    
    // Loading states
    aiThinking: "La IA está pensando...",
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
    umojaAware: "Umoja Aware",
    
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
    
    // Loading states
    aiThinking: "AI ചിന്തിക്കുന്നു...",
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
    hideDetails: "വിശദാംശങ്ങൾ മറയ്ക്കുക",
    showAvailableTopics: "ലഭ്യമായ വിഷയങ്ങൾ കാണിക്കുക",
    selectCategoryMsg: "ബഹ്റൈൻ തൊഴിൽ നിയമത്തിലെ നിർദ്ദിഷ്ട വിഷയങ്ങൾ പര്യവേക്ഷണം ചെയ്യാൻ മുകളിൽ ഒരു വിഭാഗം തിരഞ്ഞെടുക്കുക. ഓരോ എൻട്രിയിലും സ്വകാര്യ മേഖലയ്ക്കുള്ള ബഹ്റൈൻ തൊഴിൽ നിയമത്തിൽ നിന്നുള്ള ലേഖന പരാമർശങ്ങളോടെ ഔദ്യോഗിക വിവരങ്ങൾ അടങ്ങിയിരിക്കുന്നു.",
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
    umojaAware: "Umoja Aware",
    
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
    welcomeDescription: "Omuyambi wo ogw'amagezi ku mateeka ga Bahrain. Nsobola okukuyamba ku bibuuzo ku mateeka g'omulimu, okutandikawo kkampuni, obuweereza bwa visa, enkola za LMRA, n'ebirala bingi. Mbuuza kyonna ku nsonga z'amateeka mu Bahrain!",
    
    // Predefined queries
    labourLawQuery: "Eddembe lya mukozi ki erisembayo mu mateeka g'omulimu ga Bahrain?",
    companyFormationQuery: "Nnyinza ntya okuwandiisa kkampuni empya mu Bahrain nga mpita mu Sijilat?",
    visaServicesQuery: "Mpapula ki ze nneetaaga ku visa ya bisuubuzi ya Bahrain?",
    lmraQuery: "Nnyinza ntya okusaba olukusa lw'omulimu olukyukakyuka (self-sponsored) nga mpita mu LMRA?",
    
    // Loading states
    aiThinking: "AI etegeeza...",
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
    hideDetails: "Kisa Ebintu",
    showAvailableTopics: "Laga Emitwe Egiriwo",
    selectCategoryMsg: "Londa ekibiina waggulu okunoonyereza ku mitwe egitongole mu Mateeka g'Omulimu ga Bahrain. Buli kintu kirimu amawulire amatuufu ag'obwakabaka okuva mu Mateeka g'Omulimu ga Bahrain aga Ssekitali ya Kibuganda.",
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
    umojaAware: "Umoja Aware",
    
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
    welcomeDescription: "Votre assistant juridique IA pour Bahreïn. Je peux vous aider avec les questions de droit du travail, la formation d'entreprises, les services de visa, les procédures LMRA et plus encore. Demandez-moi n'importe quoi sur les questions juridiques à Bahreïn!",
    
    // Predefined queries
    labourLawQuery: "Quels sont les droits fondamentaux des employés sous la loi du travail de Bahreïn?",
    companyFormationQuery: "Comment enregistrer une nouvelle entreprise à Bahreïn via Sijilat?",
    visaServicesQuery: "Quels documents ai-je besoin pour un visa d'affaires de Bahreïn?",
    lmraQuery: "Comment demander un permis de travail flexible (auto-parrainé) via LMRA?",
    
    // Loading states
    aiThinking: "L'IA réfléchit...",
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
    hideDetails: "Masquer les Détails",
    showAvailableTopics: "Afficher les Sujets Disponibles",
    selectCategoryMsg: "Sélectionnez une catégorie ci-dessus pour explorer des sujets spécifiques dans la Loi du Travail de Bahreïn. Chaque entrée contient des informations officielles avec des références d'articles de la Loi du Travail de Bahreïn pour le Secteur Privé.",
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
    umojaAware: "Umoja Aware",
    
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
    welcomeDescription: "Ang inyong AI legal assistant para sa Bahrain. Makakatulong ako sa mga tanong tungkol sa batas sa paggawa, pagtatayo ng kumpanya, mga serbisyo ng visa, mga pamamaraan ng LMRA, at marami pang iba. Magtanong ng kahit ano tungkol sa mga usaping legal sa Bahrain!",
    
    // Predefined queries
    labourLawQuery: "Ano ang mga pangunahing karapatan ng empleyado sa ilalim ng batas sa paggawa ng Bahrain?",
    companyFormationQuery: "Paano ako makakapag-rehistro ng bagong kumpanya sa Bahrain sa pamamagitan ng Sijilat?",
    visaServicesQuery: "Anong mga dokumento ang kailangan ko para sa Bahrain business visa?",
    lmraQuery: "Paano ako mag-apply para sa flexible work permit (self-sponsored) sa pamamagitan ng LMRA?",
    
    // Loading states
    aiThinking: "Nag-iisip ang AI...",
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
    hideDetails: "Itago ang mga Detalye",
    showAvailableTopics: "Ipakita ang mga Available na Paksa",
    selectCategoryMsg: "Piliin ang isang kategorya sa itaas upang tuklasin ang mga tiyak na paksa sa Batas sa Paggawa ng Bahrain. Ang bawat entry ay naglalaman ng opisyal na impormasyon na may mga reference sa artikulo mula sa Batas sa Paggawa ng Bahrain para sa Private Sector.",
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
    umojaAware: "Umoja Aware",
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
    welcomeTitle: "Umoja Aware में आपका स्वागत है",
    welcomeDescription: "बहरीन निजी क्षेत्र श्रम कानून के लिए आपका विशेष AI सहायक। मैं कर्मचारी अधिकार, वेतन नियम, कार्य समय, समाप्ति प्रक्रियाओं की जानकारी में कई भाषाओं में सहायता कर सकता हूँ। सभी श्रम कानून मामलों पर विशेषज्ञ मार्गदर्शन प्राप्त करें!",
    labourLawQuery: "बहरीन श्रम कानून के तहत कर्मचारी के बुनियादी अधिकार क्या हैं?",
    companyFormationQuery: "सिजिलात के माध्यम से बहरीन में नई कंपनी कैसे पंजीकृत करूं?",
    visaServicesQuery: "बहरीन व्यापार वीज़ा के लिए मुझे कौन से दस्तावेज चाहिए?",
    lmraQuery: "LMRA के माध्यम से लचीले कार्य परमिट (स्वयं प्रायोजित) के लिए कैसे आवेदन करूं?",
    aiThinking: "AI सोच रहा है...",
    connectionRetrying: "कनेक्शन बाधित, पुनः प्रयास हो रहा है…",
    connectionFallback: "स्थिर मोड में स्विच किया गया",
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    tryAgain: "फिर कोशिश करें",
    close: "बंद करें",
    menu: "मेनू",
    overview: "अवलोकन",
    knowledgeBaseTitle: "📚 बहरीन श्रम कानून ज्ञान आधार",
    hideDetails: "विवरण छुपाएं",
    showAvailableTopics: "उपलब्ध विषय दिखाएं",
    selectCategoryMsg: "बहरीन श्रम कानून में विशिष्ट विषयों का अन्वेषण करने के लिए ऊपर एक श्रेणी चुनें। प्रत्येक प्रविष्टि में निजी क्षेत्र के लिए बहरीन श्रम कानून से लेख संदर्भ के साथ आधिकारिक जानकारी है।",
    source: "स्रोत",
    leaveBenefits: "छुट्टी और लाभ",
    wagesPayment: "मजदूरी और भुगतान",
    disputes: "विवाद",
    termination: "समाप्ति",
    employment: "रोजगार",
    overtime: "ओवरटाइम",
    copyright: "© {year} Umoja Aware. सभी अधिकार सुरक्षित।",
    about: "के बारे में",
    terms: "शर्तें",
    privacy: "गोपनीयता",
  },

  // Urdu (RTL language)
  ur: {
    umojaAware: "Umoja Aware",
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
    welcomeTitle: "Umoja Aware میں آپ کا خیر مقدم",
    welcomeDescription: "بحرین پرائیویٹ سیکٹر لیبر لاء کے لیے آپ کا خصوصی AI اسسٹنٹ۔ میں ملازم کے حقوق، تنخواہ کے ضوابط، کام کے اوقات، برطرفی کے طریقہ کار کی معلومات میں متعدد زبانوں میں آپ کی مدد کر سکتا ہوں۔ تمام لیبر لاء کے معاملات میں ماہرانہ رہنمائی حاصل کریں!",
    labourLawQuery: "بحرین لیبر لاء کے تحت ملازم کے بنیادی حقوق کیا ہیں؟",
    companyFormationQuery: "سجلات کے ذریعے بحرین میں نئی کمپنی کیسے رجسٹر کروں؟",
    visaServicesQuery: "بحرین کاروباری ویزا کے لیے مجھے کون سے دستاویزات درکار ہیں؟",
    lmraQuery: "LMRA کے ذریعے لچکدار ورک پرمٹ (خود کفالت) کے لیے کیسے درخواست دوں؟",
    aiThinking: "AI سوچ رہا ہے...",
    connectionRetrying: "کنکشن منقطع، دوبارہ کوشش جاری…",
    connectionFallback: "مستحکم موڈ پر منتقل",
    loading: "لوڈ ہو رہا ہے...",
    error: "خرابی",
    tryAgain: "دوبارہ کوشش کریں",
    close: "بند کریں",
    menu: "مینو",
    overview: "جائزہ",
    knowledgeBaseTitle: "📚 بحرین لیبر لاء علم کا ذخیرہ",
    hideDetails: "تفصیلات چھپائیں",
    showAvailableTopics: "دستیاب موضوعات دکھائیں",
    selectCategoryMsg: "بحرین لیبر لاء میں مخصوص موضوعات کا جائزہ لینے کے لیے اوپر ایک زمرہ منتخب کریں۔ ہر انٹری میں پرائیویٹ سیکٹر کے لیے بحرین لیبر لاء سے آرٹیکل کے حوالے کے ساتھ سرکاری معلومات ہیں۔",
    source: "ذریعہ",
    leaveBenefits: "چھٹی اور فوائد",
    wagesPayment: "اجرت اور ادائیگی",
    disputes: "تنازعات",
    termination: "برطرفی",
    employment: "ملازمت",
    overtime: "اوور ٹائم",
    copyright: "© {year} Umoja Aware. تمام حقوق محفوظ ہیں۔",
    about: "کے بارے میں",
    terms: "شرائط",
    privacy: "رازداری",
  },

  // Portuguese
  pt: {
    umojaAware: "Umoja Aware",
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
    welcomeTitle: "Bem-vindo ao Umoja Aware",
    welcomeDescription: "Seu assistente especializado em AI para a Lei Trabalhista do Setor Privado do Bahrein. Posso ajudá-lo com informações sobre direitos dos empregados, regulamentações salariais, horário de trabalho, procedimentos de rescisão em vários idiomas. Obtenha orientação especializada em todas as questões da lei trabalhista!",
    labourLawQuery: "Quais são os direitos básicos dos funcionários sob a lei trabalhista do Bahrein?",
    companyFormationQuery: "Como registrar uma nova empresa no Bahrein através do Sijilat?",
    visaServicesQuery: "Quais documentos preciso para um visto de negócios do Bahrein?",
    lmraQuery: "Como solicitar uma autorização de trabalho flexível (autopatrocinada) através do LMRA?",
    aiThinking: "IA está pensando...",
    connectionRetrying: "Conexão interrompida, tentando novamente…",
    connectionFallback: "Alternado para modo estável",
    loading: "Carregando...",
    error: "Erro",
    tryAgain: "Tentar Novamente",
    close: "Fechar",
    menu: "Menu",
    overview: "Visão Geral",
    knowledgeBaseTitle: "📚 Base de Conhecimento da Lei Trabalhista do Bahrein",
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
    copyright: "© {year} Umoja Aware. Todos os direitos reservados.",
    about: "Sobre",
    terms: "Termos",
    privacy: "Privacidade",
  },
  
  sw: {
    // Header
    umojaAware: "Umoja Aware",
    
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
    welcomeTitle: "Karibu Umoja Aware",
    welcomeDescription: "Msaidizi wako maalum wa AI kwa Sheria za Kazi za Sekta Binafsi ya Bahrain. Ninaweza kukusaidia na habari kuhusu haki za wafanyakazi, kanuni za mishahara, masaa ya kazi, na taratibu za kumaliza kazi kwa lugha nyingi. Pata mwongozo wa kitaalamu juu ya mambo yote ya sheria za kazi!",
    
    // Predefined queries
    labourLawQuery: "Haki za kimsingi za wafanyakazi ni zipi chini ya sheria za kazi za Bahrain?",
    companyFormationQuery: "Ninajenga kampuni mpya Bahrain kupitia Sijilat?",
    visaServicesQuery: "Ninahitaji nyaraka gani kwa visa ya biashara ya Bahrain?",
    lmraQuery: "Ninaomba vipi kibali cha kazi chenye kubadilika kupitia LMRA?",
    
    // Loading states
    aiThinking: "AI inafikiria...",
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
    hideDetails: "Ficha Maelezo",
    showAvailableTopics: "Onyesha Mada Zinazopatikana",
    selectCategoryMsg: "Chagua kategoria hapo juu ili uchunguze mada maalum katika Sheria za Kazi za Bahrain. Kila ingizo lina habari rasmi pamoja na marejeleo ya makala kutoka Sheria za Kazi za Bahrain za Sekta Binafsi.",
    source: "Chanzo",
    leaveBenefits: "Likizo na Faida",
    wagesPayment: "Mishahara na Malipo",
    disputes: "Migogoro",
    termination: "Kumaliza",
    employment: "Ajira",
    overtime: "Masaa ya Ziada",
    
    // Footer specific
    copyright: "© {year} Umoja Aware. Haki zote zimehifadhiwa.",
    about: "Kuhusu",
    terms: "Masharti",
    privacy: "Faragha",
  },
};

// Helper function to get translations for current language
export const useTranslations = (language: string): Translations => {
  return translations[language] || translations.en;
};
