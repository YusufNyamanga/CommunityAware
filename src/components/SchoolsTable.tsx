import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslations } from '../locales/translations';

interface School {
  id: number;
  name: string;
  location: string;
  contact: string;
  email: string;
  website: string;
  curriculum: string;
  grades: string;
  specialNotes?: string;
  flag: string;
}

const schoolsData: School[] = [
  {
    id: 1,
    name: "St. Christopher's School",
    location: "Isa Town & Saar",
    contact: "+973 1773 5555",
    email: "admissions@st-chris.net",
    website: "www.st-chris.net",
    curriculum: "British (IGCSE & A-Level)",
    grades: "Nursery to Year 13",
    flag: "🇬🇧"
  },
  {
    id: 2,
    name: "The British School of Bahrain",
    location: "Hamala",
    contact: "+973 1769 0999",
    email: "admissions@britishschool.bh",
    website: "www.britishschool.bh",
    curriculum: "British (IGCSE & A-Level)",
    grades: "FS1 to Year 13",
    flag: "🇬🇧"
  },
  {
    id: 3,
    name: "Riffa Views International School",
    location: "Riffa Views",
    contact: "+973 1650 5555",
    email: "admissions@rvis.edu.bh",
    website: "www.rvis.edu.bh",
    curriculum: "British (IGCSE & A-Level)",
    grades: "FS1 to Year 13",
    flag: "🇬🇧"
  },
  {
    id: 4,
    name: "Al Mahd School",
    location: "Saar, Samaheej, East Riffa",
    contact: "+973 1779 2422",
    email: "almahdschool@gmail.com",
    website: "www.almahdschool.com",
    curriculum: "British (IGCSE)",
    grades: "Kindergarten to Grade 12",
    specialNotes: "Affordable fees, Cambridge Center since 2004",
    flag: "🇬🇧"
  },
  {
    id: 5,
    name: "Bahrain School",
    location: "Juffair",
    contact: "+973 1772 7822",
    email: "info@bahrainschool.org",
    website: "www.bahrainschool.org",
    curriculum: "American (AP Courses)",
    grades: "K-12",
    flag: "🇺🇸"
  },
  {
    id: 6,
    name: "Bahrain International School",
    location: "Salmabad",
    contact: "+973 1778 2828",
    email: "info@bis.edu.bh",
    website: "www.bis.edu.bh",
    curriculum: "American",
    grades: "Pre-K to Grade 12",
    flag: "🇺🇸"
  },
  {
    id: 7,
    name: "Al Raja School",
    location: "Juffair",
    contact: "+973 1772 3333",
    email: "info@alraja.org",
    website: "www.alraja.org",
    curriculum: "American",
    grades: "K-12",
    flag: "🇺🇸"
  },
  {
    id: 8,
    name: "Ibn Khuldoon National School",
    location: "Isa Town",
    contact: "+973 1773 9999",
    email: "info@ikns.edu.bh",
    website: "www.ikns.edu.bh",
    curriculum: "IB & American",
    grades: "K-12",
    flag: "🇺🇸"
  },
  {
    id: 9,
    name: "Indian School Bahrain",
    location: "Isa Town",
    contact: "+973 1773 8888",
    email: "info@indianschoolbahrain.com",
    website: "www.indianschoolbahrain.com",
    curriculum: "Indian (CBSE)",
    grades: "KG to Grade 12",
    flag: "🇮🇳"
  },
  {
    id: 10,
    name: "New Indian School Bahrain",
    location: "Salmaniya",
    contact: "+973 1772 5555",
    email: "contact@newindianschool.net",
    website: "www.newindianschool.net",
    curriculum: "Indian (CBSE)",
    grades: "KG to Grade 12",
    flag: "🇮🇳"
  },
  {
    id: 11,
    name: "Sacred Heart School",
    location: "Isa Town",
    contact: "+973 1773 6666",
    email: "info@sacredheartbahrain.com",
    website: "www.sacredheartbahrain.com",
    curriculum: "Indian (CBSE)",
    grades: "KG to Grade 12",
    flag: "🇮🇳"
  },
  {
    id: 12,
    name: "The Asian School Bahrain",
    location: "Tubli",
    contact: "+973 1773 7777",
    email: "info@theasianschool.net",
    website: "www.theasianschool.net",
    curriculum: "Indian (CBSE)",
    grades: "KG to Grade 12",
    flag: "🇮🇳"
  },
  {
    id: 13,
    name: "Pakistan Urdu School",
    location: "Isa Town",
    contact: "+973 1773 4444",
    email: "info@pakistanurduschool.com",
    website: "www.pakistanurduschool.com",
    curriculum: "Pakistani",
    grades: "KG to Grade 12",
    flag: "🇵🇰"
  },
  {
    id: 14,
    name: "Bahrain Pakistani School",
    location: "Manama",
    contact: "+973 1725 5555",
    email: "info@bps.edu.bh",
    website: "www.bps.edu.bh",
    curriculum: "Pakistani",
    grades: "KG to Grade 12",
    flag: "🇵🇰"
  },
  {
    id: 15,
    name: "Philippine School Bahrain",
    location: "Isa Town",
    contact: "+973 1773 2222",
    email: "info@philippineschoolbahrain.com",
    website: "www.philippineschoolbahrain.com",
    curriculum: "Philippine (K-12)",
    grades: "K to Grade 12",
    flag: "🇵🇭"
  },
  {
    id: 16,
    name: "Naseem International School",
    location: "Hamala",
    contact: "+973 1769 1111",
    email: "info@naseemschool.com",
    website: "www.naseemschool.com",
    curriculum: "International Baccalaureate (IB)",
    grades: "K-12",
    flag: "🌍"
  },
  {
    id: 17,
    name: "Al Noor International School",
    location: "Sitra (Al Hamriya)",
    contact: "+973 1773 6773",
    email: "info@alnoor.com.bh",
    website: "www.alnoor.com.bh",
    curriculum: "British, Bahraini, Indian (CBSE)",
    grades: "Kindergarten to Grade 12",
    specialNotes: "3,000+ students from 40+ countries",
    flag: "🌟"
  },
  {
    id: 18,
    name: "Nadeen School Bahrain",
    location: "Janabiya",
    contact: "+973 1772 6000",
    email: "admissions@nadeenschool.com",
    website: "www.nadeenschool.com",
    curriculum: "British (IGCSE & A-Level)",
    grades: "FS1 to Year 13",
    flag: "🇬🇧"
  },
  {
    id: 19,
    name: "Abdulrahman Kanoo International School (ARKIS)",
    location: "Busaiteen",
    contact: "+973 1739 5555",
    email: "info@arkis.edu.bh",
    website: "www.arkis.edu.bh",
    curriculum: "IB & British",
    grades: "KG to Grade 12",
    flag: "🌍"
  },
  {
    id: 20,
    name: "Bahrain Bayan School",
    location: "Isa Town",
    contact: "+973 1769 0909",
    email: "info@bayanschool.edu.bh",
    website: "www.bayanschool.edu.bh",
    curriculum: "IB & American",
    grades: "KG to Grade 12",
    flag: "🌍"
  },
  {
    id: 21,
    name: "Beacon Private School",
    location: "Riffa",
    contact: "+973 7777 7474",
    email: "info@beaconprivate.school",
    website: "www.beaconprivate.school",
    curriculum: "American & IB",
    grades: "KG to Grade 12",
    flag: "🇺🇸"
  },
  {
    id: 22,
    name: "AMA International School Bahrain",
    location: "Salwa",
    contact: "+973 1605 7000",
    email: "info@amais.edu.bh",
    website: "www.amais.edu.bh",
    curriculum: "Philippine K-12 & American",
    grades: "K to Grade 12",
    flag: "🇵🇭"
  },
  {
    id: 23,
    name: "Al Hekma International School",
    location: "Busaiteen",
    contact: "+973 1723 3333",
    email: "info@ahis.edu.bh",
    website: "www.ahis.edu.bh",
    curriculum: "American & British",
    grades: "KG to Grade 12",
    flag: "🇺🇸"
  },
  {
    id: 24,
    name: "Lycee Francais MLF de Bahreïn",
    location: "Amwaj Islands",
    contact: "+973 1603 0033",
    email: "contact@mlfbahrain.com",
    website: "www.mlfbahrain.com",
    curriculum: "French (AEFE)",
    grades: "Maternelle to Lycée",
    flag: "🇫🇷"
  },
  {
    id: 25,
    name: "Al Wisam School",
    location: "Adliya",
    contact: "+973 1774 4448",
    email: "info@alwisamschool.com",
    website: "www.alwisamschool.com",
    curriculum: "British (IGCSE)",
    grades: "Primary to Secondary",
    flag: "🇬🇧"
  },
  {
    id: 26,
    name: "British International School of Bahrain (Britus)",
    location: "Hamala",
    contact: "+973 1769 0999",
    email: "admissions@britus.edu.bh",
    website: "www.britus.edu.bh",
    curriculum: "British (IGCSE & A-Level)",
    grades: "FS1 to Year 13",
    flag: "🇬🇧"
  }
];

const TableContainer = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  background: transparent;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 20px 0;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ResponsiveTable = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.thead`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
`;

const TableHeaderCell = styled.th`
  padding: 16px 12px;
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  white-space: nowrap;
  
  @media (max-width: 768px) {
    padding: 12px 8px;
    font-size: 0.8rem;
    white-space: normal;
  }
  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight}10;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 16px 12px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  vertical-align: top;
  white-space: normal;
  word-break: break-word;
  hyphens: auto;
  
  @media (max-width: 768px) {
    padding: 12px 8px;
    font-size: 0.8rem;
  }
`;

const SchoolName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const CurriculumBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
  white-space: normal;
  max-width: 100%;
`;

const MobileCard = styled.div`
  display: block;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const MobileCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

const MobileCardContent = styled.div`
  display: grid;
  gap: 8px;
  margin-top: 8px;
  grid-auto-rows: min-content;
  align-content: start;
`;

const MobileCardRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  
  .label {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.8rem;
    min-width: 80px;
  }
  
  .value {
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.85rem;
    text-align: right;
    flex: 1;
    
    a {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  }
`;

const getCurriculumColor = (curriculum: string): string => {
  if (curriculum.toLowerCase().includes('british')) return 'british';
  if (curriculum.toLowerCase().includes('american')) return 'american';
  if (curriculum.toLowerCase().includes('indian') || curriculum.toLowerCase().includes('cbse')) return 'indian';
  if (curriculum.toLowerCase().includes('pakistani')) return 'pakistani';
  if (curriculum.toLowerCase().includes('philippine')) return 'philippine';
  if (curriculum.toLowerCase().includes('ib') || curriculum.toLowerCase().includes('international baccalaureate')) return 'ib';
  return 'default';
};

const SchoolsTable: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const t = useTranslations(currentLanguage);
  const totalSchools = schoolsData.length;
  const britishCount = schoolsData.filter(s => s.curriculum.toLowerCase().includes('british')).length;
  const americanCount = schoolsData.filter(s => s.curriculum.toLowerCase().includes('american')).length;
  const indianCount = schoolsData.filter(s => s.curriculum.toLowerCase().includes('indian') || s.curriculum.toLowerCase().includes('cbse')).length;
  const ibCount = schoolsData.filter(s => s.curriculum.toLowerCase().includes('ib') || s.curriculum.toLowerCase().includes('international baccalaureate')).length;

  return (
    <TableContainer>
      <Title>🏫 Major Expatriate Schools in Bahrain</Title>
      <div className="mobile-cards">
        {schoolsData.map((school) => (
          <MobileCard key={school.id} className="school-card">
            <MobileCardHeader>
              <SchoolName>
                <span>{school.flag}</span>
                {school.name}
              </SchoolName>
              <CurriculumBadge color={getCurriculumColor(school.curriculum)}>
                {school.curriculum}
              </CurriculumBadge>
            </MobileCardHeader>
            <MobileCardContent>
              <MobileCardRow>
                <span className="label">📍 Location:</span>
                <span className="value">{school.location}</span>
              </MobileCardRow>
              <MobileCardRow>
                <span className="label">📞 Contact:</span>
                <span className="value">
                  <a href={`tel:${school.contact}`}>{school.contact}</a>
                </span>
              </MobileCardRow>
              <MobileCardRow>
                <span className="label">📧 Email:</span>
                <span className="value">
                  <a href={`mailto:${school.email}`}>{school.email}</a>
                </span>
              </MobileCardRow>
              <MobileCardRow>
                <span className="label">🌐 Website:</span>
                <span className="value">
                  <a href={`https://${school.website}`} target="_blank" rel="noopener noreferrer">
                    {school.website}
                  </a>
                </span>
              </MobileCardRow>
              <MobileCardRow>
                <span className="label">🎓 Grades:</span>
                <span className="value">{school.grades}</span>
              </MobileCardRow>
              {school.specialNotes && (
                <MobileCardRow>
                  <span className="label">💡 Notes:</span>
                  <span className="value">{school.specialNotes}</span>
                </MobileCardRow>
              )}
            </MobileCardContent>
          </MobileCard>
        ))}
      </div>

      {/* Summary Stats */}
      <SummaryContainer>
        <SummaryTitle>📊 Directory Summary</SummaryTitle>
        <SummaryGrid>
          <SummaryStat>
            <SummaryNumber>{totalSchools}</SummaryNumber>
            <SummaryLabel>Total Schools</SummaryLabel>
          </SummaryStat>
          <SummaryStat>
            <SummaryNumber>{britishCount}</SummaryNumber>
            <SummaryLabel>British Curriculum</SummaryLabel>
          </SummaryStat>
          <SummaryStat>
            <SummaryNumber>{americanCount}</SummaryNumber>
            <SummaryLabel>American Curriculum</SummaryLabel>
          </SummaryStat>
          <SummaryStat>
            <SummaryNumber>{indianCount}</SummaryNumber>
            <SummaryLabel>Indian CBSE</SummaryLabel>
          </SummaryStat>
          <SummaryStat>
            <SummaryNumber>{ibCount}</SummaryNumber>
            <SummaryLabel>International Baccalaureate</SummaryLabel>
          </SummaryStat>
        </SummaryGrid>
      </SummaryContainer>

      <GlobalStyle />
    </TableContainer>
  );
};

const GlobalStyle = styled.div`
  .mobile-cards {
    display: grid !important;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 16px;
    align-items: stretch;
  }
  .mobile-cards .school-card {
    height: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    margin-bottom: 0 !important;
  }
`;

const SummaryContainer = styled.div`
  margin-top: 32px;
  text-align: center;
  padding: 20px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
`;

const SummaryTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const SummaryStat = styled.div`
  text-align: center;
`;

const SummaryNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const SummaryLabel = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SpecialNote = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 4px;
`;

export default SchoolsTable;