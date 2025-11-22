interface GlossaryTerm {
  term: string;
  bahrainEquivalent: string;
  definition: string;
  category: 'business' | 'labour' | 'legal' | 'visa' | 'general';
  context?: string;
}

interface TermCorrection {
  incorrect: string[];
  correct: string;
  explanation: string;
}

class BahrainGlossaryService {
  private glossaryTerms: GlossaryTerm[] = [
    // Business Entity Types
    {
      term: 'LLC',
      bahrainEquivalent: 'WLL (With Limited Liability)',
      definition: 'A business entity with limited liability in Bahrain, equivalent to LLC in other jurisdictions',
      category: 'business',
      context: 'Business registration and company formation'
    },
    {
      term: 'PLC',
      bahrainEquivalent: 'BSC (Bahraini Shareholding Company)',
      definition: 'Public shareholding company in Bahrain, equivalent to PLC in other jurisdictions',
      category: 'business',
      context: 'Not commonly used; BSC is the standard term'
    },
    {
      term: 'Corporation',
      bahrainEquivalent: 'Company',
      definition: 'General term for business entities in Bahrain, typically WLL or BSC',
      category: 'business'
    },

    // Labour Law Terms
    {
      term: 'Employment Contract',
      bahrainEquivalent: 'Labour Contract',
      definition: 'Written agreement between employer and employee as per Bahrain Labour Law',
      category: 'labour',
      context: 'Must comply with Bahrain Labour Law for Private Sector'
    },
    {
      term: 'Probation Period',
      bahrainEquivalent: 'Probationary Period',
      definition: 'Initial employment period not exceeding 6 months as per Bahrain Labour Law',
      category: 'labour'
    },
    {
      term: 'Severance Pay',
      bahrainEquivalent: 'End of Service Benefits',
      definition: 'Compensation paid to employees upon termination as per Article 77 of Bahrain Labour Law',
      category: 'labour'
    },
    {
      term: 'Annual Leave',
      bahrainEquivalent: 'Annual Vacation',
      definition: 'Minimum 30 days paid annual leave as per Bahrain Labour Law',
      category: 'labour'
    },
    {
      term: 'Sick Leave',
      bahrainEquivalent: 'Medical Leave',
      definition: 'Paid medical leave up to 45 days per year as per Bahrain Labour Law',
      category: 'labour'
    },
    {
      term: 'Notice Period',
      bahrainEquivalent: 'Notice of Termination',
      definition: 'Required advance notice for employment termination as per Bahrain Labour Law',
      category: 'labour'
    },

    // LMRA and Work Permit Terms
    {
      term: 'Work Visa',
      bahrainEquivalent: 'Work Permit',
      definition: 'Authorization to work in Bahrain issued by LMRA (Labour Market Regulatory Authority)',
      category: 'visa',
      context: 'Processed through LMRA system'
    },
    {
      term: 'Residence Permit',
      bahrainEquivalent: 'CPR (Central Population Registry)',
      definition: 'Identity document and residence authorization in Bahrain',
      category: 'visa'
    },
    {
      term: 'Sponsor',
      bahrainEquivalent: 'Employer/Kafeel',
      definition: 'Employer who sponsors foreign worker in Bahrain under kafala system',
      category: 'visa'
    },
    {
      term: 'Green Card',
      bahrainEquivalent: 'Registered Worker Permit',
      definition: 'Registered Worker permit allowing job mobility in Bahrain',
      category: 'visa'
    },

    // Government Entities
    {
      term: 'Department of Labor',
      bahrainEquivalent: 'LMRA (Labour Market Regulatory Authority)',
      definition: 'Government body regulating labour market and work permits in Bahrain. Contact: 995 for general inquiries, 999 for emergencies (abuse, fear of harm).',
      category: 'legal'
    },
    {
      term: 'Companies Registry',
      bahrainEquivalent: 'Sijilat (Online Business Registration)',
      definition: 'Electronic platform for business registration and licensing in Bahrain',
      category: 'business'
    },
    {
      term: 'Commercial Registration',
      bahrainEquivalent: 'CR (Commercial Registration)',
      definition: 'Official business registration certificate in Bahrain',
      category: 'business'
    },

    // Legal Terms
    {
      term: 'Arbitration',
      bahrainEquivalent: 'Commercial Arbitration',
      definition: 'Alternative dispute resolution method recognized under Bahrain law',
      category: 'legal'
    },
    {
      term: 'Power of Attorney',
      bahrainEquivalent: 'Wakala',
      definition: 'Legal document granting authority to act on behalf of another person in Bahrain',
      category: 'legal'
    },
    {
      term: 'Notarization',
      bahrainEquivalent: 'Notary Public Certification',
      definition: 'Official authentication of documents by authorized notary in Bahrain',
      category: 'legal'
    },

    // Financial Terms
    {
      term: 'Minimum Wage',
      bahrainEquivalent: 'Minimum Wage for Bahrainis',
      definition: 'BD 300 minimum wage applies only to Bahraini nationals in private sector',
      category: 'labour',
      context: 'Does not apply to expatriate workers'
    },
    {
      term: 'Overtime Rate',
      bahrainEquivalent: 'Overtime Compensation',
      definition: '125% of regular wage for overtime work as per Bahrain Labour Law',
      category: 'labour'
    },
    {
      term: 'Social Security',
      bahrainEquivalent: 'SIO (Social Insurance Organization)',
      definition: 'Social insurance system for Bahraini nationals and GCC citizens',
      category: 'labour'
    }
  ];

  private termCorrections: TermCorrection[] = [
    {
      incorrect: ['LLC', 'Limited Liability Company', 'Ltd.'],
      correct: 'WLL (With Limited Liability)',
      explanation: 'In Bahrain, the equivalent of LLC is WLL (With Limited Liability)'
    },
    {
      incorrect: ['PLC', 'Public Limited Company'],
      correct: 'BSC (Bahraini Shareholding Company)',
      explanation: 'Bahrain uses BSC for public companies, not PLC'
    },
    {
      incorrect: ['Department of Labor', 'Labor Department', 'Ministry of Labor'],
      correct: 'LMRA (Labour Market Regulatory Authority)',
      explanation: 'LMRA is the government body responsible for labour regulation in Bahrain'
    },
    {
      incorrect: ['Work Visa', 'Employment Visa'],
      correct: 'Work Permit',
      explanation: 'LMRA issues work permits, not work visas'
    },
    {
      incorrect: ['Green Card', 'Permanent Residence'],
      correct: 'Registered Worker Permit',
      explanation: 'Bahrain offers Registered Worker Permits for flexible employment, not green cards'
    },
    {
      incorrect: ['Severance Pay', 'Redundancy Pay'],
      correct: 'End of Service Benefits',
      explanation: 'Bahrain Labour Law refers to end of service benefits, not severance pay'
    }
  ];

  // Common LMRA FAQ information
  private lmraFaqInfo = {
    workPermitProcess: {
      question: 'How to apply for work permit?',
      answer: 'Work permits are applied through LMRA online portal by the employer. Required documents include passport copy, educational certificates, medical certificate, and employment contract.',
      steps: [
        'Employer registers on LMRA portal',
        'Submit application with required documents',
        'Pay applicable fees',
        'Wait for LMRA approval',
        'Collect work permit upon approval'
      ]
    },
    workPermitFees: {
      question: 'What are the work permit fees?',
      answer: 'Fees vary by nationality and job category. Current fees range from BD 200-400 annually.',
      note: 'Fees are subject to change. Check LMRA website for current rates.'
    },
    registeredWorkerPermit: {
      question: 'What is Registered Worker Permit?',
      answer: 'Registered Worker Permit allows expatriates to work for multiple employers without traditional sponsorship restrictions.',
      eligibility: [
        'Minimum salary requirement (BD 400)',
        'University degree or professional qualification',
        'Clean criminal record',
        'Medical fitness certificate'
      ]
    },
    transferProcess: {
      question: 'How to transfer between employers?',
      answer: 'Employee can transfer with No Objection Certificate (NOC) from current employer or through LMRA process.',
      requirements: [
        'Complete current contract or obtain NOC',
        'New employer applies for transfer',
        'Pay transfer fees',
        'Update work permit details'
      ]
    }
  };

  // Method to correct text with Bahrain-specific terms
  correctBahrainTerminology(text: string): string {
    let correctedText = text;
    
    this.termCorrections.forEach(correction => {
      correction.incorrect.forEach(incorrectTerm => {
        const regex = new RegExp(`\\b${incorrectTerm}\\b`, 'gi');
        correctedText = correctedText.replace(regex, correction.correct);
      });
    });

    return correctedText;
  }

  // Method to get Bahrain equivalent of a term
  getBahrainEquivalent(term: string): string | null {
    const foundTerm = this.glossaryTerms.find(
      item => item.term.toLowerCase() === term.toLowerCase()
    );
    return foundTerm ? foundTerm.bahrainEquivalent : null;
  }

  // Method to search glossary
  searchGlossary(query: string): GlossaryTerm[] {
    const queryLower = query.toLowerCase();
    return this.glossaryTerms.filter(term =>
      term.term.toLowerCase().includes(queryLower) ||
      term.bahrainEquivalent.toLowerCase().includes(queryLower) ||
      term.definition.toLowerCase().includes(queryLower)
    );
  }

  // Method to get terms by category
  getTermsByCategory(category: string): GlossaryTerm[] {
    return this.glossaryTerms.filter(term => term.category === category);
  }

  // Method to get all terms
  getAllTerms(): GlossaryTerm[] {
    return this.glossaryTerms;
  }

  // Method to get LMRA FAQ information
  getLmraFaqInfo() {
    return this.lmraFaqInfo;
  }

  // Method to enhance AI responses with Bahrain-specific corrections
  enhanceResponseWithBahrainContext(response: string): string {
    let enhancedResponse = this.correctBahrainTerminology(response);
    
    // Add contextual notes for common terms
    if (enhancedResponse.toLowerCase().includes('wll')) {
      enhancedResponse += '\n\nNote: WLL (With Limited Liability) is the Bahraini equivalent of LLC.';
    }
    
    if (enhancedResponse.toLowerCase().includes('work permit')) {
      enhancedResponse += '\n\nNote: Work permits in Bahrain are issued by LMRA (Labour Market Regulatory Authority).';
    }
    
    if (enhancedResponse.toLowerCase().includes('end of service')) {
      enhancedResponse += '\n\nNote: End of service benefits are calculated according to Article 77 of Bahrain Labour Law.';
    }

    return enhancedResponse;
  }

  // Method to validate if content uses correct Bahrain terminology
  validateBahrainTerminology(text: string): { isValid: boolean; suggestions: string[] } {
    const suggestions: string[] = [];
    let isValid = true;

    this.termCorrections.forEach(correction => {
      correction.incorrect.forEach(incorrectTerm => {
        const regex = new RegExp(`\\b${incorrectTerm}\\b`, 'gi');
        if (regex.test(text)) {
          isValid = false;
          suggestions.push(`Replace "${incorrectTerm}" with "${correction.correct}": ${correction.explanation}`);
        }
      });
    });

    return { isValid, suggestions };
  }
}

export const bahrainGlossaryService = new BahrainGlossaryService();
export type { GlossaryTerm };
