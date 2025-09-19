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
