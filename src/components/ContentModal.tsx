import React from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslations } from '../locales/translations';

const ModalOverlay = styled.div<{ $show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  opacity: ${props => props.$show ? 1 : 0};
  visibility: ${props => props.$show ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalContainer = styled.div<{ $show: boolean }>`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  transform: ${props => props.$show ? 'scale(1)' : 'scale(0.95)'};
  transition: transform 0.3s ease;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 0 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 16px;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const ModalContent = styled.div`
  padding: 0 24px 24px 24px;
  color: ${({ theme }) => theme.colors.text};
  
  h3 {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.2rem;
    font-weight: 600;
    margin: 24px 0 16px 0;
    
    &:first-child {
      margin-top: 0;
    }
  }
  
  p {
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 16px;
    color: ${({ theme }) => theme.colors.text};
  }
  
  ul {
    padding-left: 20px;
    margin-bottom: 16px;
  }
  
  li {
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.text};
  }
  
  strong {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

interface ContentModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

export const ContentModal: React.FC<ContentModalProps> = ({ show, onClose, title, content }) => {
  return (
    <ModalOverlay $show={show} onClick={onClose}>
      <ModalContainer $show={show} onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>
            <X />
          </CloseButton>
        </ModalHeader>
        <ModalContent>
          {content}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

// Language-aware Terms of Service Content
export const TermsContent: React.FC = () => {
  const { currentLanguage } = useLanguage();
  
  if (currentLanguage === 'ar') {
    return (
      <>
        <h3>1. قبول الشروط</h3>
        <p>
          من خلال الوصول إلى واستخدام مجتمع واعي، فإنك تقبل وتوافق على الالتزام بالشروط والأحكام 
          الواردة في هذه الاتفاقية. تنطبق شروط الخدمة هذه على جميع مستخدمي الخدمة.
        </p>

        <h3>2. وصف الخدمة</h3>
        <p>
          مجتمع واعي هو منصة مساعد قانوني مدعومة بالذكاء الاصطناعي مصممة لتوفير المعلومات 
          حول الأمور القانونية البحرينية. تشمل خدمتنا:
        </p>
        <ul>
          <li>مساعد محادثة ذكي للاستفسارات القانونية</li>
          <li>قاعدة معرفة لقانون العمل البحريني</li>
          <li>منتدى مجتمعي للمناقشات القانونية</li>
        </ul>

        <h3>3. مسؤوليات المستخدم</h3>
        <p>المستخدمون مسؤولون عن:</p>
        <ul>
          <li>تقديم معلومات دقيقة عند استخدام الخدمة</li>
          <li>استخدام الخدمة وفقاً للقوانين المطبقة</li>
          <li>احترام المستخدمين الآخرين والحفاظ على السلوك المهني</li>
          <li>عدم مشاركة المعلومات الشخصية السرية أو الحساسة</li>
        </ul>

        <h3>4. إخلاء المسؤولية</h3>
        <p>
          <strong>مهم:</strong> يوفر مجتمع واعي معلومات قانونية عامة ولا ينبغي اعتباره 
          استشارة قانونية مهنية. استشر دائماً المهنيين القانونيين المؤهلين للأمور القانونية المحددة.
        </p>

        <h3>5. تحديد المسؤولية</h3>
        <p>
          لن يكون مجتمع واعي مسؤولاً عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو تبعية 
          أو عقابية تنشأ من استخدامك للخدمة.
        </p>

        <h3>6. الخصوصية</h3>
        <p>
          خصوصيتك مهمة بالنسبة لنا. يرجى مراجعة سياسة الخصوصية الخاصة بنا لفهم كيفية 
          جمع واستخدام وحماية معلوماتك.
        </p>

        <h3>7. التعديلات</h3>
        <p>
          نحتفظ بالحق في تعديل هذه الشروط في أي وقت. الاستخدام المستمر للخدمة 
          يشكل قبولاً لأي تغييرات.
        </p>

        <h3>8. معلومات الاتصال</h3>
        <p>
          إذا كان لديك أسئلة حول شروط الخدمة هذه، يرجى الاتصال بنا من خلال قنوات الدعم الخاصة بنا.
        </p>
      </>
    );
  }
  
  // Default English content
  return (
    <>
      <h3>1. Acceptance of Terms</h3>
      <p>
        By accessing and using Umoja Aware, you accept and agree to be bound by the terms and 
        provision of this agreement. These Terms of Service apply to all users of the service.
      </p>

      <h3>2. Description of Service</h3>
      <p>
        Umoja Aware is an AI-powered legal assistant platform designed to provide information 
        about Bahrain legal matters. Our service includes:
      </p>
      <ul>
        <li>AI chat assistant for legal queries</li>
        <li>Knowledge base of Bahrain labour law</li>
        <li>Community forum for legal discussions</li>
      </ul>

      <h3>3. User Responsibilities</h3>
      <p>Users are responsible for:</p>
      <ul>
        <li>Providing accurate information when using the service</li>
        <li>Using the service in compliance with applicable laws</li>
        <li>Respecting other users and maintaining professional conduct</li>
        <li>Not sharing confidential or sensitive personal information</li>
      </ul>

      <h3>4. Disclaimer</h3>
      <p>
        <strong>Important:</strong> Umoja Aware provides general legal information and should not be 
        considered as professional legal advice. Always consult with qualified legal professionals 
        for specific legal matters.
      </p>

      <h3>5. Limitation of Liability</h3>
      <p>
        Umoja Aware shall not be liable for any direct, indirect, incidental, consequential, 
        or punitive damages arising from your use of the service.
      </p>

      <h3>6. Privacy</h3>
      <p>
        Your privacy is important to us. Please review our Privacy Policy to understand how we 
        collect, use, and protect your information.
      </p>

      <h3>7. Modifications</h3>
      <p>
        We reserve the right to modify these terms at any time. Continued use of the service 
        constitutes acceptance of any changes.
      </p>

      <h3>8. Contact Information</h3>
      <p>
        If you have questions about these Terms of Service, please contact us through our support channels.
      </p>
    </>
  );
};

// Language-aware Privacy Policy Content
export const PrivacyContent: React.FC = () => {
  const { currentLanguage } = useLanguage();
  
  if (currentLanguage === 'ar') {
    return (
      <>
        <h3>1. المعلومات التي نجمعها</h3>
        <p>نقوم بجمع المعلومات لتوفير خدمات أفضل لمستخدمينا:</p>
        <ul>
          <li><strong>معلومات الاستخدام:</strong> كيفية تفاعلك مع خدمتنا</li>
          <li><strong>بيانات المحادثة:</strong> الأسئلة والتفاعلات مع مساعد الذكاء الاصطناعي الخاص بنا</li>
          <li><strong>مشاركات المجتمع:</strong> المحتوى الذي تشاركه في المناقشات المجتمعية</li>
          <li><strong>البيانات التقنية:</strong> نوع المتصفح وعنوان IP ومعلومات الجهاز</li>
        </ul>

        <h3>2. كيفية استخدام المعلومات</h3>
        <p>نستخدم المعلومات التي تم جمعها لـ:</p>
        <ul>
          <li>تقديم وتحسين خدمات مساعدنا القانوني المعتمد على الذكاء الاصطناعي</li>
          <li>تخصيص تجربتك</li>
          <li>تحليل أنماط الاستخدام لتعزيز منصتنا</li>
          <li>التواصل معك حول تحديثات الخدمة</li>
          <li>ضمان أمان المنصة ومنع الإساءة</li>
        </ul>

        <h3>3. مشاركة المعلومات</h3>
        <p>
          لا نقوم ببيع أو تداول أو تأجير معلوماتك الشخصية لأطراف ثالثة. قد نقوم بمشاركة 
          المعلومات في الحالات التالية:
        </p>
        <ul>
          <li>بموافقتك الصريحة</li>
          <li>للألتزام بالالتزامات القانونية</li>
          <li>لحماية حقوقنا وسلامتنا</li>
          <li>في حال نقل الأعمال أو الدمج</li>
        </ul>

        <h3>4. أمن البيانات</h3>
        <p>
          نقوم بتطبيق التدابير الفنية والتنظيمية المناسبة لحماية معلوماتك 
          من الوصول غير المصرح به أو التعديل أو الكشف أو التدمير.
        </p>

        <h3>5. الكوكيز والتتبع</h3>
        <p>
          نستخدم الكوكيز والتقنيات المشابهة لتحسين تجربتك، وتحليل الحركة، 
          وتخصيص المحتوى. يمكنك التحكم في تفضيلات الكوكيز من خلال لافتة موافقة الكوكيز.
        </p>

        <h3>6. حقوقك</h3>
        <p>لديك الحق في:</p>
        <ul>
          <li>الوصول إلى معلوماتك الشخصية</li>
          <li>تصحيح البيانات غير الدقيقة</li>
          <li>طلب حذف بياناتك</li>
          <li>الأعتراض على معالجة معلوماتك</li>
          <li>نقل البيانات عندما ينطبق</li>
        </ul>

        <h3>7. احتفاظ البيانات</h3>
        <p>
          نحتفظ بمعلوماتك طالما كانت ضرورية لتقديم خدماتنا والامتثال 
          للالتزامات القانونية. يمكنك طلب حذف حسابك والبيانات المرتبطة به في أي وقت.
        </p>

        <h3>8. التحويلات الدولية</h3>
        <p>
          قد تتم معالجة معلوماتك في بلدان غير بلدك. نضمن تطبيق التدابير 
          الوقائية المناسبة لحماية بياناتك أثناء التحويلات الدولية.
        </p>

        <h3>9. تغييرات على سياسة الخصوصية</h3>
        <p>
          قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنبلغك بأي تغييرات 
          كبيرة عن طريق نشر السياسة الجديدة على منصتنا.
        </p>

        <h3>10. اتصل بنا</h3>
        <p>
          إذا كان لديك استفسارات حول سياسة الخصوصية هذه أو ممارساتنا المتعلقة بالبيانات، يرجى الاتصال 
          بنا من خلال قنوات الدعم الخاصة بنا.
        </p>
      </>
    );
  }
  
  // Default English content
  return (
  <>
    <h3>1. Information We Collect</h3>
    <p>We collect information to provide better services to our users:</p>
    <ul>
      <li><strong>Usage Information:</strong> How you interact with our service</li>
      <li><strong>Chat Data:</strong> Questions and interactions with our AI assistant</li>
      <li><strong>Community Posts:</strong> Content you share in community discussions</li>
      <li><strong>Technical Data:</strong> Browser type, IP address, device information</li>
    </ul>

    <h3>2. How We Use Information</h3>
    <p>We use the collected information to:</p>
    <ul>
      <li>Provide and improve our AI legal assistance services</li>
      <li>Personalize your experience</li>
      <li>Analyze usage patterns to enhance our platform</li>
      <li>Communicate with you about service updates</li>
      <li>Ensure platform security and prevent abuse</li>
    </ul>

    <h3>3. Information Sharing</h3>
    <p>
      We do not sell, trade, or rent your personal information to third parties. We may share 
      information in the following circumstances:
    </p>
    <ul>
      <li>With your explicit consent</li>
      <li>To comply with legal obligations</li>
      <li>To protect our rights and safety</li>
      <li>In case of business transfer or merger</li>
    </ul>

    <h3>4. Data Security</h3>
    <p>
      We implement appropriate technical and organizational measures to protect your information 
      against unauthorized access, alteration, disclosure, or destruction.
    </p>

    <h3>5. Cookies and Tracking</h3>
    <p>
      We use cookies and similar technologies to enhance your experience, analyze traffic, 
      and personalize content. You can control cookie preferences through our cookie consent banner.
    </p>

    <h3>6. Your Rights</h3>
    <p>You have the right to:</p>
    <ul>
      <li>Access your personal information</li>
      <li>Correct inaccurate data</li>
      <li>Request deletion of your data</li>
      <li>Object to processing of your information</li>
      <li>Data portability where applicable</li>
    </ul>

    <h3>7. Data Retention</h3>
    <p>
      We retain your information for as long as necessary to provide our services and comply 
      with legal obligations. You may request deletion of your account and associated data at any time.
    </p>

    <h3>8. International Transfers</h3>
    <p>
      Your information may be processed in countries other than your own. We ensure appropriate 
      safeguards are in place to protect your data during international transfers.
    </p>

    <h3>9. Changes to Privacy Policy</h3>
    <p>
      We may update this Privacy Policy from time to time. We will notify you of any significant 
      changes by posting the new policy on our platform.
    </p>

    <h3>10. Contact Us</h3>
    <p>
      If you have questions about this Privacy Policy or our data practices, please contact 
      us through our support channels.
    </p>
  </>
  );
};

// Language-aware About Content
export const AboutContent: React.FC = () => {
  const { currentLanguage } = useLanguage();
  
  if (currentLanguage === 'ar') {
    return (
      <>
        <h3>حول مجتمع واعي</h3>
        <p>
          مجتمع واعي هو منصة مساعد قانوني مبتكرة تعمل بالذكاء الاصطناعي ومصممة خصيصًا 
          للمجتمع البحريني. مهمتنا هي جعل المعلومات القانونية متاحة ويمكن الوصول إليها بسهولة للجميع.
        </p>

        <h3>خدماتنا</h3>
        <p>نقدم ثلاث خدمات رئيسية لمساعدتك في احتياجاتك القانونية:</p>
        <ul>
          <li>
            <strong>مساعد المحادثة الذكي:</strong> احصل على إجابات فورية لأسئلتك القانونية باستخدام 
            تكنولوجيا الذكاء الاصطناعي المتقدمة والمصادر القانونية الرسمية في البحرين
          </li>
          <li>
            <strong>قاعدة المعرفة:</strong> يمكن الوصول إلى معلومات شاملة حول قانون العمل البحريني 
            وتكوين الشركة وخدمات التأشيرات والمزيد
          </li>
          <li>
            <strong>منتدى المجتمع:</strong> تواصل مع أعضاء المجتمع الآخرين وشارك التجارب واحصل على دعم الأقران في المواضيع القانونية
          </li>
        </ul>

        <h3>مجالات تركيزنا</h3>
        <p>مجتمع واعي متخصص في المجالات الرئيسية لقانون البحرين:</p>
        <ul>
          <li>قانون العمل وحقوق الموظفين</li>
          <li>تأسيس الشركات وتسجيل الأعمال التجارية</li>
          <li>خدمات التأشيرات والهجرة</li>
          <li>إجراءات هيئة تنظيم سوق العمل</li>
          <li>عمليات تسجيل سجلات</li>
          <li>تمديد فترة السماح</li>
        </ul>

        <h3>إخلاء مسؤولية مهم</h3>
        <p>
          <strong>يرجى الملاحظة:</strong> يوفر مجتمع واعي معلومات قانونية عامة وتوجيهات 
          استنادًا إلى المصادر المتاحة للجمهور. خدمتنا لا تعتبر استشارة قانونية محترفة. 
          للمسائل القانونية المحددة، استشر دائمًا المهنيين القانونيين المؤهلين أو السلطات الحكومية الرسمية.
        </p>

        <h3>التزامنا</h3>
        <p>
          نحن ملتزمون بتقديم معلومات دقيقة ومحدثة بينما نحافظ على خصوصية المستخدم 
          وأمان البيانات. تم تصميم منصتنا لتمكين المجتمع البحريني بالمعرفة القانونية المتاحة 
          ودعم المجتمع التفاعلي.
        </p>

        <h3>التقنية</h3>
        <p>
          يستخدم منصتنا تقنية الذكاء الاصطناعي المتقدمة جنبًا إلى جنب مع المعرفة القانونية 
          المصنفة بعناية من المصادر القانونية الرسمية في البحرين لتقديم مساعدة موثوقة وذات صلة لمستخدمينا.
        </p>
      </>
    );
  }
  
  // Default English content
  return (
  <>
    <h3>About Umoja Aware</h3>
    <p>
      Umoja Aware is an innovative AI-powered legal assistant platform specifically designed 
      for the Bahrain community. Our mission is to make legal information accessible, accurate, 
      and easy to understand for everyone.
    </p>

    <h3>Our Services</h3>
    <p>We provide three main services to help you with your legal needs:</p>
    <ul>
      <li>
        <strong>AI Chat Assistant:</strong> Get instant answers to your legal questions powered 
        by advanced AI technology and official Bahrain legal sources
      </li>
      <li>
        <strong>Knowledge Base:</strong> Access comprehensive information about Bahrain labour 
        law, company formation, visa services, and more
      </li>
      <li>
        <strong>Community Forum:</strong> Connect with other community members, share experiences, 
        and get peer support for legal matters
      </li>
    </ul>

    <h3>Our Focus Areas</h3>
    <p>Umoja Aware specializes in key areas of Bahrain law:</p>
    <ul>
      <li>Labour Law and Employee Rights</li>
      <li>Company Formation and Business Registration</li>
      <li>Visa Services and Immigration</li>
      <li>LMRA (Labour Market Regulatory Authority) Procedures</li>
      <li>Sijilat Registration Processes</li>
      <li>Grace Period Extensions</li>
    </ul>

    <h3>Important Disclaimer</h3>
    <p>
      <strong>Please Note:</strong> Umoja Aware provides general legal information and guidance 
      based on publicly available sources. Our service does not constitute professional legal advice. 
      For specific legal matters, always consult with qualified legal professionals or official 
      government authorities.
    </p>

    <h3>Our Commitment</h3>
    <p>
      We are committed to providing accurate, up-to-date information while maintaining user privacy 
      and data security. Our platform is designed to empower the Bahrain community with accessible 
      legal knowledge and supportive community engagement.
    </p>

    <h3>Technology</h3>
    <p>
      Our platform uses advanced AI technology combined with carefully curated legal knowledge 
      from official Bahrain legal sources to provide reliable and relevant assistance to our users.
    </p>
  </>
  );
};
