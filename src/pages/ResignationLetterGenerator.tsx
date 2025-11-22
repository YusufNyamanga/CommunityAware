import React, { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  margin: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 12px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px;
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  &[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1) brightness(200%);
    opacity: 1;
  }
  &[type="date"] {
    color-scheme: dark light;
  }
`;

const TextArea = styled.textarea`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100px;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  min-height: 40px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  @media (max-width: 420px) {
    padding: 8px 12px;
    font-size: 0.85rem;
  }
`;

const SignatureContainer = styled.div`
  margin-top: 16px;
  padding: 16px;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.background};
`;

const SignatureCanvas = styled.canvas`
  width: 100%;
  height: 140px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  touch-action: none;
`;

const SigToast = styled.div`
  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.success};
  color: #fff;
  padding: 10px 14px;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.2);
  font-size: 0.9rem;
  z-index: 5000;
`;

const ErrorToast = styled(SigToast)`
  background: ${({ theme }) => theme.colors.error};
`;

const LetterCard = styled.div`
  margin-top: 16px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.background};
  word-break: break-word;
`;

const LetterHeader = styled.div`
  margin-bottom: 56px;
  line-height: 1.6;
`;

const LetterBody = styled.div`
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
`;

const Small = styled.small`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const toDateString = (d?: string) => {
  try {
    const date = d ? new Date(d) : new Date();
    return date.toLocaleDateString();
  } catch {
    return new Date().toLocaleDateString();
  }
};

const Info = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  margin: 8px 0 12px 0;
`;

const Select = styled.select`
  padding: 10px 40px 10px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  box-sizing: border-box;
`;

const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;


const ResignationLetterGenerator: React.FC = () => {
  const [letterType, setLetterType] = useState<'resignation' | 'cover'>('resignation');
  const [employeeName, setEmployeeName] = useState('');
  const [employeeAddress, setEmployeeAddress] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [employerAddress, setEmployerAddress] = useState('');
  const [position, setPosition] = useState('');
  const [noticeDays, setNoticeDays] = useState<number>(30);
  const [resignationDate, setResignationDate] = useState<string>('');
  const [lastWorkingDay, setLastWorkingDay] = useState<string>('');
  const [reason, setReason] = useState('');
  const [contact, setContact] = useState('');
  const [cprNo, setCprNo] = useState('');
  const [employmentStartDate, setEmploymentStartDate] = useState<string>('');
  const [status, setStatus] = useState<'probation' | 'postProbation'>('postProbation');

  const printableRef = useRef<HTMLDivElement>(null);
  const sigCanvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef<boolean>(false);
  const lastRef = useRef<{x:number;y:number}|null>(null);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string>('');
  const [sigAdded, setSigAdded] = useState<boolean>(false);
  const [sigError, setSigError] = useState<boolean>(false);
  const [hasSigned, setHasSigned] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  React.useEffect(() => {
    const c = sigCanvasRef.current; if (!c) return;
    const resize = () => {
      const rect = c.getBoundingClientRect();
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      c.width = Math.floor(rect.width * ratio);
      c.height = Math.floor(rect.height * ratio);
      const ctx = c.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(ratio, ratio);
      ctx.clearRect(0, 0, rect.width, rect.height);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  React.useEffect(() => {
    const updateSize = () => setIsSmallScreen(window.innerWidth <= 420);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const todayStr = useMemo(() => toDateString(resignationDate), [resignationDate]);
  const lwdStr = useMemo(() => toDateString(lastWorkingDay), [lastWorkingDay]);

  const monthsSinceStart = useMemo(() => {
    try {
      if (!employmentStartDate || !lastWorkingDay) return null;
      const start = new Date(employmentStartDate);
      const end = new Date(lastWorkingDay);
      const years = end.getFullYear() - start.getFullYear();
      const months = end.getMonth() - start.getMonth();
      const total = years * 12 + months + (end.getDate() >= start.getDate() ? 0 : -1);
      return Math.max(0, total);
    } catch { return null; }
  }, [employmentStartDate, lastWorkingDay]);

  const isEmail = (s: string) => /.+@.+\..+/.test((s || '').trim());

  const normalizeTitle = (t: string) => t.toLowerCase();
  const generateCoverParagraph = (t: string) => {
    const title = normalizeTitle(t || '');
    if (title.includes('barista')) {
      return 'With hands-on experience in specialty coffee preparation, customer service, and POS operations, I consistently deliver high‑quality beverages while maintaining hygiene standards and service speed. I am confident in latte art, calibrating grinders, and managing peak‑hour workflows to keep wait times low and satisfaction high.';
    }
    if (title.includes('cashier')) {
      return 'I bring strong cash‑handling accuracy, POS proficiency, and daily reconciliation discipline, supported by clear customer communication and queue management. I prioritize error‑free transactions, courteous service, and efficient coordination with front‑of‑house teams.';
    }
    if (title.includes('sales')) {
      return 'I am adept at pipeline building, consultative selling, and CRM hygiene, consistently meeting targets through data‑driven prospecting, tailored proposals, and disciplined follow‑ups. I focus on long‑term relationships, negotiation, and account growth.';
    }
    if (title.includes('developer') || title.includes('engineer') || title.includes('software')) {
      return 'I focus on building reliable, maintainable software with clean architecture, test coverage, and collaborative delivery. I am comfortable with modern web stacks, API design, and iterative shipping, aligning technical decisions with business outcomes.';
    }
    if (title.includes('nurse')) {
      return 'I provide compassionate patient care, accurate charting, and efficient triage while adhering to safety and infection‑control protocols. I collaborate closely with multidisciplinary teams to ensure continuity of care and clear communication.';
    }
    if (title.includes('teacher')) {
      return 'I design engaging lesson plans, differentiate instruction, and manage classrooms effectively, combining assessment data with student‑centered approaches to drive outcomes and maintain a positive learning environment.';
    }
    if (title.includes('driver')) {
      return 'I emphasize safe driving, route planning, and punctual deliveries, maintaining vehicle readiness and courteous client interactions. I adapt to changing schedules and optimize routes to meet SLAs consistently.';
    }
    return 'I bring a track record of reliable performance, clear communication, and ownership. I learn quickly, collaborate well, and focus on delivering measurable results aligned with team goals.';
  };

  const letterText = useMemo(() => {
    if (letterType === 'resignation') {
      const intro = `I am writing to formally tender my resignation from my position${position ? ` as ${position}` : ''} at ${employerName || 'your company'}.`;
      const effectiveNoticeDays = status === 'probation' ? 1 : noticeDays;
      const notice = `This letter serves as notice in accordance with my employment contract and the applicable Bahrain Labour Law provisions. My notice period is ${effectiveNoticeDays} days, with my last working day being ${lwdStr}.`;
      const reasonLine = reason ? `\n\nReason: ${reason}.` : '';
      const thanks = `\n\nI appreciate the opportunities and support provided during my employment. I will ensure a smooth handover and remain available to assist during the notice period.`;
      return `${intro}\n\n${notice}${reasonLine}${thanks}`;
    } else {
      const intro = `I am writing to express my interest in the ${position || 'stated'} position at ${employerName || 'your company'}.`;
      const generated = generateCoverParagraph(position);
      const custom = reason ? `\n\n${reason}` : '';
      const alignment = employerName 
        ? `\n\nI am particularly drawn to ${employerName} for its culture and standards, and I would welcome the opportunity to contribute to your team.`
        : `\n\nI would welcome the opportunity to contribute to your team.`;
      const thanks = `\n\nThank you for considering my application.`;
      return `${intro}\n\n${generated}${custom}${alignment}${thanks}`;
    }
  }, [letterType, employerName, position, noticeDays, status, lwdStr, reason]);

  const downloadPdf = () => {
    const content = printableRef.current;
    if (!content) return;
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Resignation Letter</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; font-size: 15px; }
        h1.title { font-size: 17px; font-weight: 700; margin: 0 0 12px 0; }
        .line { margin: 2px 0; }
        .section { margin: 12px 0; }
        .gap { height: 32px; }
      </style>
    </head><body>${content.innerHTML}
    <script>
      (function(){
        function done(){ try { window.focus(); window.print(); } catch(e) {} }
        var imgs = document.images; var remaining = 0;
        for (var i=0;i<imgs.length;i++) { if (!imgs[i].complete) { remaining++; imgs[i].addEventListener('load', function(){ remaining--; if (remaining<=0) done(); }); imgs[i].addEventListener('error', function(){ remaining--; if (remaining<=0) done(); }); } }
        if (remaining===0) { setTimeout(done, 100); } else { setTimeout(done, 3000); }
      })();
    </script>
    </body></html>`;
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.open();
    win.document.write(html);
    win.document.close();
    try { win.focus(); } catch {}
  };

  return (
    <Container>
      <Title>Letter Generator</Title>
      <Grid>
        <Field>
          Letter Type
          <SelectContainer>
            <Select value={letterType} onChange={e => setLetterType(e.target.value as 'resignation' | 'cover')}>
              <option value="resignation">Resignation Letter</option>
              <option value="cover">Cover Letter</option>
            </Select>
          </SelectContainer>
        </Field>
        <Field>
          Your Full Name
          <Input placeholder="e.g., John Doe" value={employeeName} onChange={e => setEmployeeName(e.target.value)} />
        </Field>
        <Field>
          Your Address
          <Input placeholder="e.g., Manama" value={employeeAddress} onChange={e => setEmployeeAddress(e.target.value)} />
        </Field>
        <Field>
          Employer Name
          <Input placeholder="e.g., XYZ Company W.L.L" value={employerName} onChange={e => setEmployerName(e.target.value)} />
        </Field>
        <Field>
          Employer Address
          <Input placeholder="e.g., Juffair" value={employerAddress} onChange={e => setEmployerAddress(e.target.value)} />
        </Field>
        <Field>
          Position/Title
          <Input placeholder="e.g., Barista" value={position} onChange={e => setPosition(e.target.value)} />
        </Field>
        {letterType === 'resignation' && (
          <>
            <Field>
              Employment Status
              <SelectContainer>
                <Select value={status} onChange={e => setStatus((e.target.value as 'probation' | 'postProbation'))}>
                  <option value="postProbation">After probation</option>
                  <option value="probation">During probation</option>
                </Select>
              </SelectContainer>
            </Field>
            <Field>
              Notice Period (days)
              <Input type="number" min="0" value={status === 'probation' ? 1 : noticeDays} disabled={status === 'probation'} onChange={e => setNoticeDays(parseFloat(e.target.value) || 0)} />
            </Field>
            <Field>
              Resignation Date
              <Input type="date" value={resignationDate} onChange={e => setResignationDate(e.target.value)} />
            </Field>
            <Field>
              Last Working Day
              <Input type="date" value={lastWorkingDay} onChange={e => setLastWorkingDay(e.target.value)} />
            </Field>
            <Field>
              Employment Start Date
              <Input type="date" value={employmentStartDate} onChange={e => setEmploymentStartDate(e.target.value)} />
            </Field>
          </>
        )}
        <Field style={{ gridColumn: '1 / -1' }}>
          {letterType === 'resignation' ? 'Reason (optional)' : 'Cover Letter Body (optional)'}
          <TextArea value={reason} onChange={e => setReason(e.target.value)} />
        </Field>
        <Field style={{ gridColumn: '1 / -1' }}>
          Contact (phone/email)
          <Input value={contact} onChange={e => setContact(e.target.value)} />
        </Field>
        <Field style={{ gridColumn: '1 / -1' }}>
          Bahrain CPR No.
          <Input placeholder="e.g., 123456789" value={cprNo} onChange={e => setCprNo(e.target.value)} />
        </Field>
      </Grid>

      <SignatureContainer>
        <div style={{ marginBottom: 8, color: 'inherit' }}>Digital Signature</div>
        <SignatureCanvas
          ref={sigCanvasRef}
          onPointerDown={e => {
            const c = sigCanvasRef.current; if (!c) return; (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            drawingRef.current = true; const rect = c.getBoundingClientRect(); lastRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
          }}
          onPointerMove={e => {
            const c = sigCanvasRef.current; if (!c || !drawingRef.current || !lastRef.current) return; const rect = c.getBoundingClientRect(); const ctx = c.getContext('2d'); if (!ctx) return; const x = e.clientX - rect.left; const y = e.clientY - rect.top; const lw = Math.max(1.5, (e.pressure || 0.5) * 2.5);
            ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#1e5af7';
            ctx.beginPath(); ctx.moveTo(lastRef.current.x, lastRef.current.y); ctx.lineTo(x, y); ctx.stroke(); lastRef.current = { x, y };
            setHasSigned(true);
          }}
          onPointerUp={() => { drawingRef.current = false; lastRef.current = null; }}
          onPointerLeave={() => { drawingRef.current = false; lastRef.current = null; }}
        />
        <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button onClick={() => { const c = sigCanvasRef.current; if (!c) return; const rect = c.getBoundingClientRect(); const ctx = c.getContext('2d'); if (!ctx) return; ctx.clearRect(0, 0, rect.width, rect.height); setSignatureDataUrl(''); setHasSigned(false); }}>Clear</Button>
          <Button onClick={() => { const c = sigCanvasRef.current; if (!c) return; if (!hasSigned) { setSigError(true); setTimeout(() => setSigError(false), 2000); return; } const rect = c.getBoundingClientRect(); const out = document.createElement('canvas'); out.width = Math.round(rect.width); out.height = Math.round(rect.height); const octx = out.getContext('2d'); if (!octx) return; octx.drawImage(c, 0, 0, c.width, c.height, 0, 0, out.width, out.height); setSignatureDataUrl(out.toDataURL('image/png')); setSigAdded(true); setTimeout(() => setSigAdded(false), 2000); }}>{isSmallScreen ? 'Add' : 'Add Sign'}</Button>
          <Small style={{ marginLeft: 8 }}>
            Sign in the box with mouse or finger. Clear removes the drawing. Add Sign inserts your signature to the letter.
          </Small>
        </div>
      </SignatureContainer>

      <LetterCard ref={printableRef}>
        <LetterHeader>
          <div className="line">{employeeName}</div>
          {employeeAddress && <div className="line">{employeeAddress}</div>}
          <div className="line">Date: {todayStr}</div>
          <div className="gap" style={{ height: 32 }} />
          <div className="line" style={{ marginTop: 10 }}>{employerName}</div>
          {employerAddress && <div className="line">{employerAddress}</div>}
        </LetterHeader>
        <LetterBody>
          <div className="gap" style={{ height: 32 }} />
          <h1 className="title">{letterType === 'resignation' ? 'RE: Resignation Letter' : (position ? `RE: Application for ${position}` : 'RE: Cover Letter')}</h1>
          <div className="section" style={{ whiteSpace: 'pre-wrap' }}>{letterText}</div>
          <div className="section">Sincerely,</div>
          {signatureDataUrl && (
            <div className="section" style={{ textAlign: 'left' }}>
              <img src={signatureDataUrl} alt="Signature" style={{ height: 80, display: 'block' }} />
            </div>
          )}
          <div className="section">
            {employeeName}
            {cprNo && (<><br />CPR: {cprNo}</>)}
            {contact && (<><br />{isEmail(contact) ? 'Email: ' : 'Phone: '}{contact}</>)}
          </div>
        </LetterBody>
      </LetterCard>

      <Actions>
        <Button onClick={downloadPdf}>Download PDF</Button>
      </Actions>
      {sigAdded && (
        <SigToast>Signature added to letter</SigToast>
      )}
      {sigError && (
        <ErrorToast>Please sign first</ErrorToast>
      )}
      {letterType === 'resignation' && (
        <Info>
          During probation, a 1-day notice typically applies in Bahrain. After probation, if resignation occurs within the first year of the contract, acceptance of shorter notice or resignation terms is often subject to employer leniency and policy.
        </Info>
      )}
    </Container>
  );
};

export default ResignationLetterGenerator;
const Gap = styled.div`
  height: 32px;
`;