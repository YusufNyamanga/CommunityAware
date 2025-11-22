// Bahrain Labour Law Knowledge Base
// This file contains structured knowledge from official Bahrain labour law documents

export interface KnowledgeBaseEntry {
  id: string;
  title: string;
  content: string;
  category: string;
  keywords: string[];
  articleNumber?: string;
  source: string;
  lastUpdated: string;
}

export const bahrainLabourLawKB: KnowledgeBaseEntry[] = [
  {
    id: 'working-hours-1',
    title: 'Standard Working Hours',
    content: `According to Bahrain Labour Law, the standard working hours are:
    - 8 hours per day or 48 hours per week for most employees
    - During Ramadan: 6 hours per day for Muslim employees
    - Maximum 10 hours per day including overtime
    - Friday is the weekly rest day unless otherwise agreed`,
    category: 'working-hours',
    keywords: ['working hours', 'daily hours', 'weekly hours', 'ramadan', 'overtime', 'rest day'],
    articleNumber: 'Article 55-58',
    source: 'Bahrain Labour Law for Private Sector',
    lastUpdated: '2024-01-01'
  },
  {
    id: 'overtime-1',
    title: 'Overtime Compensation',
    content: `Overtime work compensation in Bahrain:
    - Overtime rate: 125% of regular hourly wage (25% extra)
    - Night work (9 PM to 6 AM): 150% of regular wage (50% extra)
    - Friday work: 150% of regular wage
    - Official holiday work: 200% of regular wage
    - Maximum overtime: 2 hours per day`,
    category: 'overtime',
    keywords: ['overtime', 'compensation', 'night work', 'holiday work', 'extra pay'],
    articleNumber: 'Article 59-62',
    source: 'Bahrain Labour Law for Private Sector',
    lastUpdated: '2024-01-01'
  },
  {
    id: 'annual-leave-1',
    title: 'Annual Leave Entitlement',
    content: `Annual leave entitlements in Bahrain:
    - First 5 years: 21 days per year
    - After 5 years: 30 days per year
    - Leave must be taken within 2 years or it expires
    - Employee can carry forward maximum 6 days to next year
    - Cash compensation allowed only upon contract termination`,
    category: 'leave',
    keywords: ['annual leave', 'vacation', 'days off', 'carry forward', 'compensation'],
    articleNumber: 'Article 67-71',
    source: 'Bahrain Labour Law for Private Sector',
    lastUpdated: '2024-01-01'
  },
  {
    id: 'sick-leave-1',
    title: 'Sick Leave Benefits',
    content: `Sick leave provisions in Bahrain:
    - First 15 days: Full salary
    - Next 20 days: Half salary
    - Remaining days in the year: No salary
    - Total sick leave: Maximum 35 days per year
    - Medical certificate required for absences over 3 days
    - Pregnancy-related leave: 10 days at full salary`,
    category: 'leave',
    keywords: ['sick leave', 'medical leave', 'salary', 'medical certificate', 'pregnancy'],
    articleNumber: 'Article 72-74',
    source: 'Bahrain Labour Law for Private Sector',
    lastUpdated: '2024-01-01'
  },
  {
    id: 'termination-1',
    title: 'Contract Termination Notice',
    content: `Notice periods for contract termination:
    - Probation period: No notice required
    - Less than 3 months service: 1 week notice
    - 3 months to 2 years: 2 weeks notice
    - 2 to 5 years: 1 month notice
    - More than 5 years: 2 months notice
    - Notice can be paid in lieu of working`,
    category: 'termination',
    keywords: ['termination', 'notice period', 'resignation', 'dismissal', 'probation'],
    articleNumber: 'Article 107-109',
    source: 'Bahrain Labour Law for Private Sector',
    lastUpdated: '2024-01-01'
  },
  {
    id: 'end-service-1',
    title: 'End of Service Benefits',
    content: `End of service gratuity calculation:
    - First 3 years: 15 days salary per year
    - After 3 years: 1 month salary per year
    - Based on last drawn salary
    - Payable for contracts terminated by employer without cause
    - Also payable upon employee resignation after 3+ years
    - Calculated on basic salary only (excluding allowances)`,
    category: 'termination',
    keywords: ['end of service', 'gratuity', 'severance', 'benefits', 'calculation'],
    articleNumber: 'Article 110-112',
    source: 'Bahrain Labour Law for Private Sector',
    lastUpdated: '2024-01-01'
  },
  {
    id: 'probation-1',
    title: 'Probation Period Rules',
    content: `Probation period regulations:
    - Maximum 3 months for most positions
    - Maximum 6 months for technical/professional roles
    - Can be extended once for same duration
    - Either party can terminate without notice or compensation
    - Must be specified in employment contract
    - Probation period counts toward service calculation`,
    category: 'employment',
    keywords: ['probation', 'trial period', 'employment contract', 'termination'],
    articleNumber: 'Article 39-41',
    source: 'Bahrain Labour Law for Private Sector',
    lastUpdated: '2024-01-01'
  },
  {
    id: 'maternity-leave-1',
    title: 'Maternity Leave Benefits',
    content: `Maternity leave provisions:
    - 60 days maternity leave (10 weeks)
    - Full salary during leave
    - Can start up to 4 weeks before delivery
    - Additional 15 days unpaid leave if needed
    - Job protection during maternity leave
    - Nursing breaks: 2 periods of 30 minutes daily for 6 months`,
    category: 'leave',
    keywords: ['maternity leave', 'pregnancy', 'nursing', 'job protection', 'salary'],
    articleNumber: 'Article 34-36',
    source: 'Bahrain Labour Law for Private Sector',
    lastUpdated: '2024-01-01'
  },
  {
    id: 'wages-1',
    title: 'Wage Payment Rules',
    content: `Wage payment regulations:
    - Wages must be paid in Bahraini Dinars
    - Monthly payment for salaries
    - Weekly payment for daily/hourly wages
    - Payment within 7 days of due date
    - Deductions limited to 10% of basic salary
    - Overtime must be paid with regular wages
    - Written salary certificate required`,
    category: 'wages',
    keywords: ['wages', 'salary', 'payment', 'deductions', 'currency', 'overtime pay'],
    articleNumber: 'Article 47-54',
    source: 'Bahrain Labour Law for Private Sector',
    lastUpdated: '2024-01-01'
  },
  {
    id: 'disputes-1',
    title: 'Labour Dispute Resolution',
    content: `Labour dispute resolution process:
    - First step: Direct negotiation between parties
    - Second step: LMRA mediation service
    - Final step: Labour Court
    - Time limit: 1 year from incident date
    - Free legal assistance available
    - Court decisions are final and binding`,
    category: 'disputes',
    keywords: ['labour disputes', 'court', 'mediation', 'LMRA', 'legal assistance'],
    articleNumber: 'Article 150-160',
    source: 'Bahrain Labour Law for Private Sector',
    lastUpdated: '2024-01-01'
  },
  {
    id: 'work-permit-1',
    title: 'Work Permit Application Process',
    content: `There are three main ways to apply for a work permit in Bahrain through the Labour Market Regulatory Authority (LMRA):

**1. Company Sponsored Work Permit:**
- Employee must first secure a job offer from a Bahrain Registered Company
- The company applies for and sponsors the work permit through LMRA
- This is the most common type for regular employment
- Company handles all application procedures and fees
- Work permit is tied to the specific company and job position

**2. Domestic Worker Permit:**
- For domestic workers (housekeepers, drivers, nannies, etc.)
- The employer (household sponsor) submits application through LMRA
- Requires specific documentation including employer's salary certificate
- Different fee structure and requirements than regular work permits
- Covers household and domestic services only

**3. Self-Sponsored Work Permit (Flexible Work Permit):**
- Allows worker to work for multiple employers
- Subject to eligibility criteria including:
  - Minimum age requirement (usually 25 years)
  - Educational qualifications
  - Previous work experience in Bahrain
  - Financial requirements
- Higher fees than company-sponsored permits
- Requires annual renewal
- Provides greater employment flexibility

**Important Notes:**
- All applications must be submitted through LMRA's official channels
- Medical examinations and security clearances are required for all permit types
- Processing times vary depending on permit type and completeness of documentation
- Penalties apply for working without valid permits`,
    category: 'work-permits',
    keywords: ['work permit', 'LMRA', 'employment permit', 'visa', 'company sponsored', 'domestic worker', 'self sponsored', 'flexible permit'],
    articleNumber: 'LMRA Regulations',
    source: 'Labour Market Regulatory Authority (LMRA)',
    lastUpdated: '2024-01-01'
  },
  {
    id: 'flexible-work-permit-1',
    title: 'Flexible Work Permit Application Process',
    content: `The Flexible Work Permit (Self-Sponsored) allows individuals to work independently for multiple employers in Bahrain. Here's the complete application process:

**Eligibility Criteria:**
- Minimum age: 25 years
- Educational qualification: Bachelor's degree or equivalent professional certification
- Previous work experience in Bahrain (minimum 2 years with valid work permit)
- Clean criminal record and security clearance
- Medical fitness certificate
- Minimum monthly salary requirement (BD 400-500 depending on profession)

**Required Documents:**
- Completed application form (available on LMRA website)
- Copy of passport with minimum 1 year validity
- Educational certificates (attested by relevant authorities)
- Previous work experience certificates from Bahrain
- Salary certificates from previous employers
- Bank statement showing financial capability
- Medical fitness certificate from approved medical center
- Police clearance certificate from home country (if applicable)
- Two passport-size photographs

**Application Process:**
1. **Online Application**: Submit application through LMRA's official website or mobile app
2. **Document Upload**: Upload all required documents in specified formats
3. **Fee Payment**: Pay application fees online (approximately BD 200-400)
4. **Biometric Data**: Visit LMRA office for biometric data collection
5. **Medical Examination**: Complete medical examination at approved centers
6. **Application Review**: LMRA reviews application (7-14 working days)
7. **Approval/Rejection**: Receive notification of decision
8. **Permit Collection**: If approved, collect permit from LMRA office

**Important Notes:**
- Annual renewal required with updated documentation
- Permit allows work for multiple employers simultaneously
- Higher fees compared to company-sponsored permits
- Must maintain minimum salary requirements throughout permit validity
- Violations can result in permit cancellation and deportation
- Processing time: 2-4 weeks from complete application submission`,
    category: 'work-permits',
    keywords: ['flexible work permit', 'self sponsored', 'LMRA application', 'independent work', 'multiple employers', 'eligibility criteria'],
    articleNumber: 'LMRA Flexible Work Permit Regulations',
    source: 'Labour Market Regulatory Authority (LMRA)',
    lastUpdated: '2024-01-01'
  }
  ,
  {
    id: 'runaway-case-1',
    title: 'Runaway (Absconding) Case Consequences',
    content: `If an employer files a runaway (absconding) case against a worker with LMRA:
    - Work permit and CPR are cancelled immediately upon confirmation
    - A criminal order for deportation is issued by competent authorities
    - Permanent ban from re-entering Bahrain may be imposed along with deportation
    - LMRA does not impose financial penalties/fines for runaway cases; immigration overstay fees may apply until departure
    - Appeals are time-bound and must be lodged through the official channels
    - Working without a valid permit after filing constitutes an additional offence
    
    Practical notes:
    - Always resolve employment disputes before leaving employer accommodation
    - Seek LMRA mediation early to avoid escalation to absconding
    - Keep passport, contract copies, and proof of dues ready for any proceedings
    - Overstay costs are handled by immigration authorities, not LMRA`,
    category: 'disputes',
    keywords: ['absconding', 'runaway', 'LMRA', 'deportation', 'ban', 'criminal order', 'permit cancellation'],
    articleNumber: 'LMRA Violations & Enforcement',
    source: 'Labour Market Regulatory Authority (LMRA)',
    lastUpdated: '2025-11-16'
  },
  
  // CULTURAL GUIDELINES CATEGORY
  {
    id: 'cultural-guidelines-1',
    title: 'Respectful Conduct in a Muslim Country',
    content: `Core etiquette for living and working in Bahrain:
    - Respect Islamic practices (Friday holy day, prayer times)
    - Dress modestly in public places and government buildings
    - During Ramadan: avoid eating/drinking/smoking in public daytime
    - Be mindful of gender interactions and personal space
    - Use polite greetings; basic Arabic helps (Salam Alaikum)
    - Avoid public intoxication; alcohol only in licensed venues
    - Do not display offensive symbols or slogans in public`,
    category: 'cultural-guidelines',
    keywords: ['etiquette', 'Islamic practices', 'Ramadan', 'dress code', 'gender interactions', 'public conduct'],
    articleNumber: 'Cultural Conduct Guide',
    source: 'Bahrain Cultural Affairs',
    lastUpdated: '2025-11-20'
  },
  {
    id: 'cultural-guidelines-2',
    title: 'Public Decency and Social Norms',
    content: `Public decency expectations:
    - No public displays of offensive behavior or profanity
    - Keep noise levels reasonable, especially near mosques
    - Photography: avoid photographing people without consent
    - Religious sites: dress conservatively; remove shoes if required
    - Family areas: follow posted rules; respect privacy
    - Social media: avoid content that insults religion/culture`,
    category: 'cultural-guidelines',
    keywords: ['public decency', 'privacy', 'photography', 'religious sites', 'social media'],
    articleNumber: 'Decency & Social Norms',
    source: 'Ministry of Interior Bahrain',
    lastUpdated: '2025-11-20'
  },
  {
    id: 'cultural-guidelines-ramadan',
    title: 'Ramadan Conduct for Non‑Muslims',
    content: `During Ramadan in Bahrain:
    - Public eating/drinking/smoking: avoid during daylight hours out of respect
    - Restaurants: many screen dining areas; takeaway may be limited at daytime
    - Alcohol: bars/clubs typically closed; alcohol service suspended; expect strict enforcement
    - Work hours: reduced schedules common; plan government visits accordingly
    - Music and events: keep volumes low; avoid festive public gatherings in fasting hours
    - Greetings: use respectful phrases (Ramadan Kareem) when appropriate
    - Dress and conduct: maintain modest attire and considerate behavior, especially near mosques and prayer times`,
    category: 'cultural-guidelines',
    keywords: ['Ramadan', 'fasting', 'alcohol restrictions', 'working hours', 'restaurants', 'respect'],
    articleNumber: 'Ramadan Conduct Guide',
    source: 'Bahrain Cultural Affairs',
    lastUpdated: '2025-11-20'
  },
  {
    id: 'cultural-guidelines-social-media',
    title: 'Social Media and Online Conduct',
    content: `Online content expectations:
    - Prohibited: insulting religion, incitement, defamation, hate speech, and spreading false news
    - Privacy: do not share private images/videos without consent; avoid filming officials without permission
    - Sensitive areas: refrain from posting content from restricted/government/security locations
    - Respect: avoid mocking cultural or religious practices; be mindful of public decency online
    - Enforcement: cybercrime and penal laws apply to social platforms; violations can lead to fines or prosecution`,
    category: 'cultural-guidelines',
    keywords: ['social media', 'online laws', 'privacy', 'defamation', 'cybercrime'],
    articleNumber: 'Online Conduct & Legal Considerations',
    source: 'Ministry of Interior Bahrain',
    lastUpdated: '2025-11-20'
  },
  {
    id: 'cultural-guidelines-dress-code',
    title: 'Dress Code for Government Premises',
    content: `Expected attire when visiting government offices and police stations:
    - Modest clothing: cover shoulders and knees; avoid shorts, sleeveless tops, and revealing outfits
    - Footwear: wear appropriate shoes; avoid beachwear
    - Headwear: remove caps/hoods when requested for identification
    - Conduct: maintain polite behavior; avoid filming or photographing inside without permission
    - Documents: carry ID/residency and appointment references to expedite service`,
    category: 'cultural-guidelines',
    keywords: ['dress code', 'government premises', 'police stations', 'modest attire', 'identification'],
    articleNumber: 'Government Visit Etiquette',
    source: 'Civil Service & Interior Guidance',
    lastUpdated: '2025-11-20'
  },
  
  // MENTAL HEALTH CATEGORY
  {
    id: 'mental-health-1',
    title: 'Accessing Mental Health Services',
    content: `Where to get help:
    - Government: Psychiatric Hospital, primary health centers referral
    - Private: American Mission Hospital, Royal Bahrain Hospital, IBH
    - Insurance: check outpatient psychiatry/psychology coverage
    - Emergency: call 999 for acute crisis; hospital ER triage
    - Language: many providers offer English and other languages`,
    category: 'mental-health',
    keywords: ['mental health services', 'psychiatry', 'psychology', 'emergency', 'insurance'],
    articleNumber: 'Mental Health Access',
    source: 'Bahrain Ministry of Health',
    lastUpdated: '2025-11-20'
  },
  {
    id: 'mental-health-2',
    title: 'Community and Self‑Care Resources',
    content: `Support options for expatriates:
    - EAP programmes via employers (confidential counselling)
    - Community groups: expat associations and faith communities
    - Online therapy: licensed telehealth providers
    - Self‑care: sleep, nutrition, exercise, social connection
    - Crisis plan: identify local contacts and nearest ER`,
    category: 'mental-health',
    keywords: ['EAP', 'community support', 'online therapy', 'self-care', 'crisis plan'],
    articleNumber: 'Expat Support & Self‑Care',
    source: 'Bahrain Expatriate Support Networks',
    lastUpdated: '2025-11-20'
  },
  
  // VISA & IMMIGRATION CATEGORY
  {
    id: 'visa-types-1',
    title: 'Types of Visas in Bahrain',
    content: `Bahrain offers several types of visas for expatriates:
    - Work Visa: For employed professionals, sponsored by employer
    - Business Visa: For short-term business activities (2 weeks to 3 months)
    - Tourist Visa: For leisure travel (14 days to 3 months)
    - Family Visa: For dependents of residents (spouse, children)
    - Investor Visa: For business owners and investors
    - Student Visa: For educational purposes
    - Transit Visa: For short layovers (up to 72 hours)
    - Freelance/Self-sponsored: For independent professionals`,
    category: 'visa-immigration',
    keywords: ['visa types', 'work visa', 'business visa', 'tourist visa', 'family visa', 'investor visa', 'student visa'],
    articleNumber: 'Visa Categories Guide',
    source: 'Bahrain Immigration Authority',
    lastUpdated: '2025-11-20'
  },
  {
    id: 'work-visa-process-1',
    title: 'Work Visa Application Process',
    content: `Step-by-step work visa process for Bahrain:
    1. Job offer from Bahraini employer
    2. Employer applies for work permit through LMRA
    3. Medical examination in home country
    4. Security clearance and background check
    5. Visa issuance at Bahraini embassy/consulate
    6. Entry to Bahrain within visa validity period
    7. Medical test upon arrival in Bahrain
    8. Residence permit application within 30 days
    9. CPR (Central Population Registry) card issuance`,
    category: 'visa-immigration',
    keywords: ['work visa process', 'LMRA', 'work permit', 'medical examination', 'residence permit', 'CPR card'],
    articleNumber: 'Work Visa Procedure',
    source: 'Labour Market Regulatory Authority',
    lastUpdated: '2025-11-20'
  },
  {
    id: 'visa-renewal-1',
    title: 'Visa Renewal and Extension',
    content: `Visa renewal requirements and procedures:
    - Work visa: Renew 1-2 months before expiry through employer
    - Residence permit: Annual renewal required
    - Medical test: Required for each renewal
    - Fees: BD 300-500 for work visa renewal
    - Processing time: 2-4 weeks
    - Required documents: Passport, CPR, employment contract, medical certificate
    - Grace period: 30 days after expiry for renewal
    - Overstay penalties: BD 10 per day after grace period`,
    category: 'visa-immigration',
    keywords: ['visa renewal', 'residence permit renewal', 'medical test', 'renewal fees', 'grace period', 'overstay penalties'],
    articleNumber: 'Visa Renewal Guidelines',
    source: 'Bahrain Immigration Department',
    lastUpdated: '2025-11-20'
  },
  
  // HOUSING & ACCOMMODATION CATEGORY
  {
    id: 'housing-types-1',
    title: 'Types of Housing in Bahrain',
    content: `Housing options for expatriates in Bahrain:
    - Apartments: Most common, 1-3 bedroom units in buildings
    - Villas: Standalone houses with private compounds
    - Shared Accommodation: Rooms in shared apartments/houses
    - Serviced Apartments: Fully furnished with hotel services
    - Company Housing: Provided by employers for staff
    - Gated Communities: Secure compounds with amenities
    - Studio Flats: Single room with kitchenette and bathroom
    - Penthouse Suites: Luxury top-floor apartments`,
    category: 'housing-accommodation',
    keywords: ['housing types', 'apartments', 'villas', 'shared accommodation', 'serviced apartments', 'gated communities'],
    articleNumber: 'Housing Options Guide',
    source: 'Bahrain Real Estate Authority',
    lastUpdated: '2025-11-20'
  },
  {
    id: 'rental-process-1',
    title: 'Rental Process and Requirements',
    content: `Standard rental process in Bahrain:
    1. Property viewing and selection
    2. Negotiate rent and terms (usually 1-year lease)
    3. Provide documents: passport, CPR, salary certificate
    4. Pay security deposit (1-2 months rent)
    5. Sign tenancy contract in Arabic (get English translation)
    6. Register with municipality (some areas require this)
    7. Set up utilities: electricity, water, internet
    8. Pay first month's rent plus deposit
    9. Conduct move-in inspection with photos`,
    category: 'housing-accommodation',
    keywords: ['rental process', 'tenancy contract', 'security deposit', 'lease agreement', 'municipality registration', 'utilities setup'],
    articleNumber: 'Rental Procedures',
    source: 'Bahrain Municipalities',
    lastUpdated: '2025-11-20'
  },
  {
    id: 'rent-prices-1',
    title: 'Rental Prices by Area',
    content: `Average monthly rents in Bahrain (2024):
    - Manama City Center: BD 400-800 (1BR), BD 600-1200 (2BR)
    - Juffair: BD 300-600 (1BR), BD 450-900 (2BR)
    - Adliya: BD 250-500 (1BR), BD 400-800 (2BR)
    - Seef: BD 350-700 (1BR), BD 550-1100 (2BR)
    - Amwaj Islands: BD 400-800 (1BR), BD 600-1200 (2BR)
    - Riffa: BD 200-400 (1BR), BD 350-700 (2BR)
    - Muharraq: BD 150-300 (1BR), BD 250-500 (2BR)
    - Hamala/Saar: BD 500-1000+ for villas`,
    category: 'housing-accommodation',
    keywords: ['rent prices', 'Manama rent', 'Juffair rent', 'Amwaj Islands', 'Riffa rent', 'Muharraq rent'],
    articleNumber: 'Rental Market Rates',
    source: 'Bahrain Real Estate Market Report',
    lastUpdated: '2025-11-20'
  },
  
  // HEALTHCARE & MEDICAL CATEGORY
  {
    id: 'healthcare-system-1',
    title: 'Healthcare System Overview',
    content: `Bahrain healthcare system for expatriates:
    - Public Healthcare: Government hospitals and clinics
    - Private Healthcare: Private hospitals and medical centers
    - Health Insurance: Mandatory for all residents
    - Primary Care: Health centers and clinics
    - Specialist Care: Referral-based system
    - Emergency Care: Available 24/7 at major hospitals
    - Pharmacies: Widely available with prescription services
    - Preventive Care: Vaccinations and health screenings`,
    category: 'healthcare-medical',
    keywords: ['healthcare system', 'public healthcare', 'private healthcare', 'health insurance', 'primary care', 'emergency care'],
    articleNumber: 'Healthcare Overview',
    source: 'Bahrain Ministry of Health',
    lastUpdated: '2025-11-20'
  },
  {
    id: 'health-insurance-1',
    title: 'Health Insurance Requirements',
    content: `Health insurance requirements for expatriates:
    - Mandatory for all residents (Law No. 23 of 2018)
    - Minimum coverage: BD 5,000 per year
    - Employer must provide insurance for employees
    - Family members must be covered by sponsor
    - Coverage includes: inpatient, outpatient, emergency
    - Pre-existing conditions: Must be covered after 6 months
    - Premium costs: BD 200-500 per person annually
    - Penalties: BD 50-500 for non-compliance`,
    category: 'healthcare-medical',
    keywords: ['health insurance', 'mandatory insurance', 'insurance coverage', 'employer insurance', 'insurance penalties'],
    articleNumber: 'Health Insurance Law',
    source: 'Bahrain Insurance Authority',
    lastUpdated: '2025-11-20'
  },
  {
    id: 'hospitals-clinics-1',
    title: 'Major Hospitals and Clinics',
    content: `Top hospitals and medical centers in Bahrain:
    - Salmaniya Medical Complex: Main government hospital
    - Bahrain Defence Force Hospital: Military hospital open to public
    - American Mission Hospital: Private with English-speaking staff
    - International Bahrain Hospital: Private modern facility
    - Royal Bahrain Hospital: Private with specialist centers
    - Awali Hospital: Private in Awali area
    - KIMS Bahrain Medical Centre: Kerala-based private hospital
    - German Orthopedic Hospital: Specialized orthopedic care
    - Al Kindi Specialised Hospital: Multi-specialty private hospital`,
    category: 'healthcare-medical',
    keywords: ['hospitals', 'clinics', 'Salmaniya Medical Complex', 'American Mission Hospital', 'Royal Bahrain Hospital'],
    articleNumber: 'Medical Facilities Directory',
    source: 'Bahrain Medical Society',
    lastUpdated: '2025-11-20'
  },
  {
    id: 'health-licensing-overview-1',
    title: 'Licensing for Nurses, Doctors and Health Professionals (NHRA)',
    content: `Overview of practising as a healthcare professional in Bahrain:
    - Regulator: National Health Regulatory Authority (NHRA)
    - Professions: Physicians, Dentists, Nurses, Midwives, Pharmacists, Allied Health (Physiotherapists, Lab Technicians, Radiographers, etc.)
    - License Types: Professional license (individual) and facility license (employer healthcare facility)
    - Core Requirements: Primary Source Verification (PSV), qualifying exam (where applicable), valid job offer/attachment to licensed facility, medical fitness and good standing
    - Common Platforms: DataFlow Group (PSV) and Prometric (exams) used by NHRA
    - Renewal: Typically annual; must maintain good standing, CPD hours, and valid employer attachment
    
    Important considerations:
    - You cannot practise without an NHRA professional license and an attachment to a licensed healthcare facility
    - Titles and scopes of practice depend on verified education and experience
    - Overseas qualifications must be attested and verified via PSV (DataFlow) before licensing`,
    category: 'healthcare-medical',
    keywords: ['NHRA', 'licensing', 'DataFlow', 'Prometric', 'primary source verification', 'health professionals', 'nurse', 'doctor', 'physician'],
    articleNumber: 'NHRA Professional Licensing Overview',
    source: 'National Health Regulatory Authority (NHRA)',
    lastUpdated: '2025-11-22'
  },
  {
    id: 'emergency-hotlines-1',
    title: 'Emergency & Important Contacts',
    content: `Key emergency and important hotlines:
    - Police: 999
    - Ambulance: 999
    - Fire & Civil Defence: 999
    - Traffic Police: 199
    - LMRA Expat Protection: 995
    - National Contact Center (Government Services): 80008080
    
    Notes:
    - 999 covers Police, Ambulance, and Fire emergencies; use it for any life‑threatening situation.
    - For road incidents, Traffic Police 199 can coordinate on‑scene assistance and reports.
    - LMRA Expat Protection (995) assists expatriates with urgent labour concerns and welfare.
    - The National Contact Center (80008080) provides general government service help and referrals.
    
    Tip:
    - Save these numbers on your phone and post them at home/work.
    - When calling, provide location details (landmarks/Google Plus codes) and a brief description of the situation.`,
    category: 'emergency-contacts',
    keywords: ['emergency numbers', 'police', 'ambulance', 'fire', 'traffic police', 'LMRA', 'expat protection', 'hotlines', 'Bahrain'],
    articleNumber: 'Emergency & Hotline Directory',
    source: 'Government of Bahrain; LMRA; MOI',
    lastUpdated: '2025-11-23'
  },
  {
    id: 'health-licensing-process-1',
    title: 'NHRA Licensing Process – Nurses, Doctors and Allied Health',
    content: `Step-by-step licensing process (indicative; check NHRA portal for your profession):
    
    1) Primary Source Verification (PSV)
    - Create a DataFlow Group profile linked to NHRA
    - Submit documents for verification: passport, degree/diploma, transcripts, professional registration, experience certificates, good standing certificate
    - Pay PSV fees and track your case; outcome is a DataFlow verification report
    
    2) Qualifying Examination (where applicable)
    - Many categories require a Prometric exam (e.g., General Nurse, General Practitioner, Pharmacist)
    - Register on Prometric with NHRA eligibility, schedule exam, and pass with required score
    
    3) NHRA Licensing Application
    - Create/Log in to NHRA e-Services portal
    - Select your profession and license type (physician, nurse, allied health, etc.)
    - Upload PSV report, exam result (if applicable), attested certificates, passport, CPR (if available), photo
    - Provide employer attachment (offer letter or facility sponsorship) from a licensed NHRA facility
    - Pay licensing fees
    
    4) Review and Issuance
    - NHRA reviews application and may request clarifications
    - Upon approval, license is issued; practise only within approved scope and facility
    
    5) Post-Issuance Requirements
    - Obtain/renew CPR card and residence permit
    - Maintain CPD credits, good standing, malpractice insurance (if required by facility)
    - Renew license annually via NHRA portal
    
    Notes for specific groups:
    - Nurses: Usually require General Nursing diploma/degree, valid registration at home country, experience; Prometric may be required
    - Physicians: Degree, internship, training/residency; category (GP/Specialist/Consultant) depends on postgraduate training and experience
    - Allied Health: Profession-specific standards (e.g., physiotherapy, lab, radiology); check NHRA standards and exams
    
    Useful links (search): NHRA Bahrain, DataFlow NHRA, Prometric NHRA Bahrain`,
    category: 'healthcare-medical',
    keywords: ['NHRA licensing process', 'nurse license', 'doctor license', 'allied health', 'DataFlow PSV', 'Prometric exam', 'CPD', 'good standing'],
    articleNumber: 'NHRA Licensing Procedure',
    source: 'National Health Regulatory Authority (NHRA)',
    lastUpdated: '2025-11-22'
  },
  
  // BANKING & FINANCE CATEGORY
  {
    id: 'banking-basics-1',
    title: 'Banking Basics for Expatriates',
    content: `Essential banking information for expatriates:
    - Account Types: Current, savings, fixed deposits
    - Required Documents: Passport, CPR, salary certificate, employment letter
    - Minimum Balance: BD 50-100 for most accounts
    - Online Banking: Available with mobile apps
    - ATM Network: Extensive across the country
    - International Transfers: SWIFT and wire transfers available
    - Currency: Bahraini Dinar (BHD), fixed to USD (1 BHD = 2.65 USD)
    - Banking Hours: Sunday-Thursday, 7:30 AM - 2:00 PM`,
    category: 'banking-finance',
    keywords: ['banking', 'bank accounts', 'current account', 'savings account', 'online banking', 'ATM network'],
    articleNumber: 'Banking Guide',
    source: 'Central Bank of Bahrain',
    lastUpdated: '2025-11-20'
  },
  {
    id: 'major-banks-1',
    title: 'Major Banks in Bahrain',
    content: `Leading banks operating in Bahrain:
    - National Bank of Bahrain (NBB): Largest local bank
    - Ahli United Bank: Major commercial bank
    - Bank of Bahrain and Kuwait (BBK): Regional bank
    - Arab Bank: International bank with strong presence
    - HSBC Bahrain: Global bank with local services
    - Standard Chartered: International banking services
    - Citibank Bahrain: American bank, corporate focus
    - Al Baraka Banking Group: Islamic banking specialist
    - Kuwait Finance House: Islamic banking services
    - Bahrain Islamic Bank: Local Islamic banking`,
    category: 'banking-finance',
    keywords: ['major banks', 'National Bank of Bahrain', 'Ahli United Bank', 'HSBC Bahrain', 'Islamic banking'],
    articleNumber: 'Banking Directory',
    source: 'Bahrain Bankers Association',
    lastUpdated: '2025-11-20'
  },
  {
    id: 'money-transfers-1',
    title: 'Money Transfers and Remittances',
    content: `Money transfer options for expatriates:
    - Bank Transfers: SWIFT transfers to international accounts
    - Exchange Houses: Western Union, MoneyGram, UAE Exchange
    - Online Services: TransferWise, Remitly, Xpress Money
    - Mobile Apps: Bank apps and specialized remittance apps
    - Transfer Fees: BD 5-25 depending on amount and destination
    - Exchange Rates: Compare rates across providers
    - Transfer Time: 1-5 business days for bank transfers
    - Daily Limits: BD 3,000-10,000 for most services`,
    category: 'banking-finance',
    keywords: ['money transfers', 'remittances', 'Western Union', 'MoneyGram', 'exchange rates', 'transfer fees'],
    articleNumber: 'Remittance Services',
    source: 'Bahrain Money Exchange Association',
    lastUpdated: '2025-11-20'
  },
  
  // TRANSPORTATION CATEGORY
  {
    id: 'driving-license-1',
    title: 'Driving License for Expatriates',
    content: `Driving license requirements and process:
    - International License: Valid for 3 months from arrival
    - Bahrain License Required: After 3 months or residency
    - Age Requirement: 18 years minimum
    - Required Documents: Passport, CPR, eye test, medical certificate
    - Driving Schools: Mandatory for new drivers (20-30 lessons)
    - Theory Test: Traffic laws and road signs
    - Practical Test: On-road driving assessment
    - License Fees: BD 20-30 for issuance and renewal
    - Validity: 5 years for residents under 50 years`,
    category: 'transportation',
    keywords: ['driving license', 'international license', 'driving schools', 'theory test', 'practical test', 'license fees'],
    articleNumber: 'Driving License Regulations',
    source: 'Bahrain Traffic Directorate',
    lastUpdated: '2025-11-20'
  },
  {
    id: 'public-transport-1',
    title: 'Public Transportation System',
    content: `Public transport options in Bahrain:
    - Buses: Extensive network covering major areas
    - Bus Routes: Connect Manama with other cities
    - Operating Hours: 6:00 AM - 10:00 PM daily
    - Fares: BD 0.200-0.500 depending on distance
    - Bus Cards: Pre-paid cards available (GO Card)
    - Taxis: Available but expensive (BD 2-5 for short trips)
    - Ride-sharing: Uber and Careem operate in Bahrain
    - Airport Transport: Taxis and hotel shuttles available
    - Inter-city: Buses to Saudi Arabia via King Fahd Causeway`,
    category: 'transportation',
    keywords: ['public transport', 'buses', 'bus routes', 'GO Card', 'taxis', 'ride-sharing', 'Uber', 'Careem'],
    articleNumber: 'Public Transport Guide',
    source: 'Bahrain Public Transport Company',
    lastUpdated: '2025-11-20'
  },
  {
    id: 'car-ownership-1',
    title: 'Car Ownership and Registration',
    content: `Car ownership process for expatriates:
    - Purchase Options: New cars from dealerships, used cars from market
    - Registration Required: Within 30 days of purchase
    - Required Documents: CPR, passport, insurance, purchase receipt
    - Vehicle Inspection: Annual inspection required
    - Insurance: Mandatory third-party liability insurance
    - Registration Fees: BD 50-200 depending on vehicle type
    - License Plates: Standard and premium numbers available
    - Renewal: Annual registration renewal required
    - Selling Process: Transfer ownership at Traffic Directorate`,
    category: 'transportation',
    keywords: ['car ownership', 'vehicle registration', 'car insurance', 'vehicle inspection', 'registration fees', 'license plates'],
    articleNumber: 'Vehicle Registration Process',
    source: 'Bahrain Traffic Directorate',
    lastUpdated: '2025-11-20'
  },
  
  // EDUCATION & SCHOOLING CATEGORY
  {
    id: 'school-system-1',
    title: 'School System Overview',
    content: `Education system for expatriate children:
    - Public Schools: Limited access for expatriates
    - Private Schools: Main option for expatriate families
    - International Schools: Follow foreign curricula (British, American, Indian)
    - Curriculum Options: CBSE, IGCSE, IB, American High School
    - Language of Instruction: English, with Arabic as second language
    - School Years: September to June (similar to Western systems)
    - Age Groups: Kindergarten (3-5), Primary (6-11), Secondary (12-18)
    - Accreditation: Schools must be licensed by Ministry of Education`,
    category: 'education-schooling',
    keywords: ['school system', 'private schools', 'international schools', 'curriculum', 'CBSE', 'IGCSE', 'IB'],
    articleNumber: 'Education System Guide',
    source: 'Bahrain Ministry of Education',
    lastUpdated: '2025-11-20'
  },
  {
    id: 'school-admission-1',
    title: 'School Admission Process',
    content: `School admission requirements and process:
    - Application Timeline: January to March for September intake
    - Required Documents: Passport, residence permit, previous school records
    - Entrance Tests: English and Mathematics assessments
    - Age Requirements: Based on September 1st cut-off date
    - Medical Records: Vaccination certificates required
    - Parent Interview: Some schools require family interview
    - Registration Fees: BD 50-200 non-refundable
    - Waiting Lists: Popular schools may have waiting lists
    - Admission Criteria: Academic performance, behavior, family background`,
    category: 'education-schooling',
    keywords: ['school admission', 'application process', 'entrance tests', 'registration fees', 'waiting lists', 'admission criteria'],
    articleNumber: 'School Admission Guidelines',
    source: 'Bahrain Private Schools Association',
    lastUpdated: '2025-11-20'
  },
  {
    id: 'school-fees-1',
    title: 'School Fees and Costs',
    content: `Average annual school fees in Bahrain (2024):
    - Kindergarten: BD 800-2,000
    - Primary School: BD 1,200-3,500
    - Middle School: BD 1,500-4,000
    - High School: BD 2,000-5,000
    - Additional Costs: Uniforms, books, transportation, activities
    - Payment Terms: Usually 3 installments per year
    - Discounts: Sibling discounts (10-25% for second child)
    - Scholarships: Merit-based and need-based available
    - Fee Increases: Typically 5-10% annually`,
    category: 'education-schooling',
    keywords: ['school fees', 'tuition fees', 'kindergarten fees', 'primary school', 'high school', 'scholarships'],
    articleNumber: 'School Fee Structure',
    source: 'Bahrain Private Schools Fee Survey',
    lastUpdated: '2025-11-20'
  },
  {
    id: 'expatriate-schools-1',
    title: 'Major Expatriate Schools in Bahrain - Contact Information',
    content: `Here are 17 major expatriate schools in Bahrain with contact details:

**1. St. Christopher's School (British Curriculum)**
- Location: Isa Town & Saar
- Contact: +973 1773 5555
- Email: admissions@st-chris.net
- Website: www.st-chris.net
- Curriculum: British (IGCSE & A-Level)
- Grades: Nursery to Year 13

**2. Bahrain School (American Curriculum)**
- Location: Juffair
- Contact: +973 1772 7822
- Email: info@bahrainschool.org
- Website: www.bahrainschool.org
- Curriculum: American (AP Courses)
- Grades: K-12

**3. The British School of Bahrain (British Curriculum)**
- Location: Hamala
- Contact: +973 1769 0999
- Email: admissions@britishschool.bh
- Website: www.britishschool.bh
- Curriculum: British (IGCSE & A-Level)
- Grades: FS1 to Year 13

**4. Bahrain International School (American Curriculum)**
- Location: Salmabad
- Contact: +973 1778 2828
- Email: info@bis.edu.bh
- Website: www.bis.edu.bh
- Curriculum: American
- Grades: Pre-K to Grade 12

**5. Indian School Bahrain (CBSE Curriculum)**
- Location: Isa Town
- Contact: +973 1773 8888
- Email: info@indianschoolbahrain.com
- Website: www.indianschoolbahrain.com
- Curriculum: Indian (CBSE)
- Grades: KG to Grade 12

**6. New Indian School Bahrain (CBSE Curriculum)**
- Location: Salmaniya
- Contact: +973 1772 5555
- Email: contact@newindianschool.net
- Website: www.newindianschool.net
- Curriculum: Indian (CBSE)
- Grades: KG to Grade 12

**7. Sacred Heart School (CBSE Curriculum)**
- Location: Isa Town
- Contact: +973 1773 6666
- Email: info@sacredheartbahrain.com
- Website: www.sacredheartbahrain.com
- Curriculum: Indian (CBSE)
- Grades: KG to Grade 12

**8. The Asian School Bahrain (CBSE Curriculum)**
- Location: Tubli
- Contact: +973 1773 7777
- Email: info@theasianschool.net
- Website: www.theasianschool.net
- Curriculum: Indian (CBSE)
- Grades: KG to Grade 12

**9. Pakistan Urdu School (Pakistani Curriculum)**
- Location: Isa Town
- Contact: +973 1773 4444
- Email: info@pakistanurduschool.com
- Website: www.pakistanurduschool.com
- Curriculum: Pakistani
- Grades: KG to Grade 12

**10. Bahrain Pakistani School (Pakistani Curriculum)**
- Location: Manama
- Contact: +973 1725 5555
- Email: info@bps.edu.bh
- Website: www.bps.edu.bh
- Curriculum: Pakistani
- Grades: KG to Grade 12

**11. Philippine School Bahrain (Philippine Curriculum)**
- Location: Isa Town
- Contact: +973 1773 2222
- Email: info@philippineschoolbahrain.com
- Website: www.philippineschoolbahrain.com
- Curriculum: Philippine (K-12)
- Grades: K to Grade 12

**12. Al Raja School (American Curriculum)**
- Location: Juffair
- Contact: +973 1772 3333
- Email: info@alraja.org
- Website: www.alraja.org
- Curriculum: American
- Grades: K-12

**13. Ibn Khuldoon National School (IB & American)**
- Location: Isa Town
- Contact: +973 1773 9999
- Email: info@ikns.edu.bh
- Website: www.ikns.edu.bh
- Curriculum: IB & American
- Grades: K-12

**14. Naseem International School (IB Curriculum)**
- Location: Hamala
- Contact: +973 1769 1111
- Email: info@naseemschool.com
- Website: www.naseemschool.com
- Curriculum: International Baccalaureate (IB)
- Grades: K-12

**15. Riffa Views International School (British Curriculum)**
- Location: Riffa Views
- Contact: +973 1650 5555
- Email: admissions@rvis.edu.bh
- Website: www.rvis.edu.bh
- Curriculum: British (IGCSE & A-Level)
- Grades: FS1 to Year 13

**16. Al Noor International School (Multi-Curriculum)**
- Location: Sitra (Road No 1104, Block 611 Al Hamriya)
- Contact: +973 1773 6773
- Email: info@alnoor.com.bh
- Website: www.alnoor.com.bh
- Curriculum: British (IGCSE & A-Level), Bahraini, Indian (CBSE)
- Grades: Kindergarten to Grade 12
- Special Notes: Over 3,000 students from 40+ countries, Cambridge Fellowship Center

**17. Al Mahd School (British Curriculum)**
- Location: Multiple campuses - Saar, Samaheej, East Riffa
- Contact: +973 1779 2422 (Saar), +973 1747 9040 (Samaheej), +973 1762 0730 (East Riffa)
- Email: almahdschool@gmail.com
- Website: www.almahdschool.com
- Curriculum: British (IGCSE)
- Grades: Kindergarten to Grade 12
- Special Notes: Day boarding school, affordable fees, Cambridge International Center since 2004

**Important Notes:**
- All schools require advance registration
- Admission tests may be required
- School fees vary from BD 1,000-8,000 annually
- Most schools offer transportation services
- Arabic language is mandatory for all students
- Islamic studies required for Muslim students`,
    category: 'education-schooling',
    keywords: ['expatriate schools', 'international schools', 'British schools', 'American schools', 'Indian schools', 'CBSE', 'IGCSE', 'school admissions', 'school contact', 'Bahrain schools directory'],
    articleNumber: 'Expatriate Schools Directory',
    source: 'Bahrain Ministry of Education & School Directories',
    lastUpdated: '2025-11-20'
  },
  
  // COMMUNITY SUPPORT CATEGORY
  {
    id: 'expat-communities-1',
    title: 'Expatriate Communities and Groups',
    content: `Major expatriate communities in Bahrain:
    - Indian Community: Largest expat group (300,000+ people)
    - Filipino Community: Strong presence in healthcare and services
    - Pakistani Community: Business and trading sector
    - British Community: Professional and corporate sectors
    - Egyptian Community: Education and healthcare
    - Sri Lankan Community: Domestic and construction work
    - Community Associations: Cultural clubs and welfare associations
    - Religious Groups: Churches, temples, and cultural centers
    - Social Clubs: Country clubs, sports clubs, hobby groups`,
    category: 'community-support',
    keywords: ['expat communities', 'Indian community', 'Filipino community', 'British community', 'cultural clubs', 'religious groups'],
    articleNumber: 'Community Directory',
    source: 'Bahrain Expatriate Welfare Associations',
    lastUpdated: '2025-11-20'
  },
  {
    id: 'embassy-services-1',
    title: 'Embassy and Consular Services',
    content: `Major embassies and consulates in Bahrain:
    - Indian Embassy: Diplomatic enclave, Manama
    - Philippines Embassy: Juffair area, Manama
    - British Embassy: Diplomatic area with consular services
    - US Embassy: Zinj area, comprehensive services
    - Pakistani Embassy: Central Manama location
    - Egyptian Embassy: Consular and cultural services
    - Services: Passport renewal, document attestation, emergency assistance
    - Working Hours: Sunday-Thursday, 8:00 AM - 2:00 PM
    - Emergency Contact: 24/7 hotline for citizens`,
    category: 'community-support',
    keywords: ['embassy services', 'consular services', 'Indian Embassy', 'Philippines Embassy', 'British Embassy', 'passport renewal'],
    articleNumber: 'Diplomatic Missions',
    source: 'Ministry of Foreign Affairs Bahrain',
    lastUpdated: '2025-11-20'
  },
  {
    id: 'community-events-1',
    title: 'Community Events and Activities',
    content: `Regular community events for expatriates:
    - Cultural Festivals: Diwali, Eid, Christmas, Chinese New Year celebrations
    - Food Festivals: International food fairs and cultural cuisine events
    - Sports Tournaments: Cricket, football, basketball leagues
    - Music and Arts: Concerts, exhibitions, cultural performances
    - Religious Celebrations: Special services and community gatherings
    - Charity Events: Fundraising and community service activities
    - Networking Events: Professional and business meetups
    - Family Activities: Children's festivals, family fun days
    - Venue Locations: Cultural centers, hotels, community halls`,
    category: 'community-support',
    keywords: ['community events', 'cultural festivals', 'Diwali', 'food festivals', 'sports tournaments', 'charity events'],
    articleNumber: 'Community Activities Calendar',
    source: 'Bahrain Cultural Events Committee',
    lastUpdated: '2025-11-20'
  }
];

// Search function for knowledge base
export function searchKnowledgeBase(query: string, category?: string): KnowledgeBaseEntry[] {
  const searchTerms = query.toLowerCase().split(' ');
  
  return bahrainLabourLawKB.filter(entry => {
    // Category filter
    if (category && entry.category !== category) {
      return false;
    }
    
    // Search in title, content, and keywords
    const searchText = `${entry.title} ${entry.content} ${entry.keywords.join(' ')}`.toLowerCase();
    
    return searchTerms.some(term => searchText.includes(term));
  });
}

// Get knowledge base entry by category
export function getKnowledgeByCategory(category: string): KnowledgeBaseEntry[] {
  return bahrainLabourLawKB.filter(entry => entry.category === category);
}

// Get all available categories
export function getKnowledgeCategories(): string[] {
  const categories = bahrainLabourLawKB.map(entry => entry.category);
  const uniqueCategories = new Set(categories);
  return Array.from(uniqueCategories);
}
