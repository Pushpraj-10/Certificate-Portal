'use client';

import React, { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ArrowLeft, Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import IIITNRLogo from "../../assets/IIITNR_Logo.png"; // Ensure this path is correct

// --- Types ---
type CertificateData = {
  refNo: string;
  date: string;
  studentName: string;
  fatherName: string;
  department: string;
  institute: string;
  startDate: string;
  endDate: string;
  guideName: string;
  guideTitle: string;
  focusAreas: string;
  contribution: string;
  signLeftName: string;
  signLeftTitle: string;
  signCenterName: string;
  signCenterTitle: string;
  signRightName: string;
  signRightTitle: string;
};

type Step = 'form' | 'preview';

// --- Default Data ---
const defaultData: CertificateData = {
  refNo: "IIITNR/ACAD/OIP/2024/01",
  date: "28. 07. 2024",
  studentName: "OM BHATIA",
  fatherName: "SUSHIL BHATIA",
  department: "INFORMATION TECHNOLOGY",
  institute: "MANIPAL UNIVERSITY JAIPUR",
  startDate: "22/05/2023",
  endDate: "22/07/2023",
  guideName: "Dr. Mallikharjuna Rao K",
  guideTitle: "Assistant Professor",
  focusAreas: "Evolutionary Algorithms, Optimization and Artifical Intelligence",
  contribution: "Application of Optimzation Algorithms for Predective Modeling on Diabetes",
  signLeftName: "Dr. Anurag Singh",
  signLeftTitle: "Faculty-in-charge OIP",
  signCenterName: "Mr. K. G. Atram",
  signCenterTitle: "Faculty-in-charge OIP",
  signRightName: "Dr. Mithilesh Chaube",
  signRightTitle: "Dean (R&I)",
};

// --- Global Styles (Print Logic) ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Arimo:wght@400;700&display=swap');
    
    @page { 
      size: A4 portrait; 
      margin: 0; 
    }
    
    @media print {
      body * { visibility: hidden; }
      html, body { height: 100vh; margin: 0 !important; padding: 0 !important; overflow: hidden; }
      
      /* Make ONLY the certificate visible */
      #certificate-root, #certificate-root * { visibility: visible; }

      #certificate-root {
        position: fixed;
        left: 0;
        top: 0;
        width: 210mm !important;
        height: 297mm !important;
        margin: 0 !important;
        box-shadow: none !important;
        border: none !important;
        background: white !important;
        z-index: 9999;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      
      .no-print { display: none !important; }
    }
    
    .cert-font { font-family: 'Arimo', 'Calibri', 'Arial', 'Helvetica', sans-serif; }
    .user-text { font-family: 'Times New Roman', 'TimesNewRoman', serif; }
  `}</style>
);

// --- Main Component ---
export default function CertificateWizard() {
  const [step, setStep] = useState<Step>('form');
  const [data, setData] = useState<CertificateData>(defaultData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen w-full bg-[#eef3f8] text-[#333] font-sans">
      <GlobalStyles />
      
      {/* Header */}
      <div className="no-print bg-white border-b border-gray-200 py-4 px-6 shadow-sm flex items-center gap-4 sticky top-0 z-10">
        <div className="w-10 h-10 relative">
             <img src={IIITNRLogo.src} alt="Logo" className="object-contain w-full h-full"/>
        </div>
        <div>
            <h1 className="text-xl font-bold text-[#0070C0]">Certificate Portal</h1>
            <p className="text-xs text-gray-500">IIIT Naya Raipur</p>
        </div>
        <div className="ml-auto flex gap-2">
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${step === 'form' ? 'bg-[#0070C0] text-white' : 'bg-gray-200 text-gray-500'}`}>1. Details</div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${step === 'preview' ? 'bg-[#0070C0] text-white' : 'bg-gray-200 text-gray-500'}`}>2. Preview & Download</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {step === 'form' ? (
          <FormView data={data} onChange={handleChange} onContinue={() => setStep('preview')} />
        ) : (
          <PreviewView data={data} onBack={() => setStep('form')} />
        )}
      </div>
    </div>

  );
}

// --- View 1: Data Entry Form ---
const FormView = ({ data, onChange, onContinue }: { data: CertificateData, onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>, onContinue: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    // Simulate API call/Network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    onContinue();
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
            <div>
                <h2 className="text-lg font-bold text-gray-800">Student Information</h2>
                <p className="text-sm text-gray-500">Please fill in the details exactly as they should appear.</p>
            </div>
        </div>
        
        <div className="p-8 grid gap-8">
            {/* Section 1 */}
            <section>
                <h3 className="text-[#0070C0] font-bold border-b border-gray-100 pb-2 mb-4">Basic Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <Input label="Reference No." name="refNo" value={data.refNo} onChange={onChange} />
                    <Input label="Issue Date" name="date" value={data.date} onChange={onChange} />
                    <Input label="Student Name" name="studentName" value={data.studentName} onChange={onChange} />
                    <Input label="Father's Name" name="fatherName" value={data.fatherName} onChange={onChange} />
                    <Input label="Department" name="department" value={data.department} onChange={onChange} />
                    <Input label="Institute" name="institute" value={data.institute} onChange={onChange} />
                </div>
            </section>

            {/* Section 2 */}
            <section>
                <h3 className="text-[#0070C0] font-bold border-b border-gray-100 pb-2 mb-4">Internship Details</h3>
                <div className="grid gap-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <Input label="Start Date" name="startDate" value={data.startDate} onChange={onChange} />
                        <Input label="End Date" name="endDate" value={data.endDate} onChange={onChange} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Input label="Guide Name" name="guideName" value={data.guideName} onChange={onChange} />
                        <Input label="Guide Title" name="guideTitle" value={data.guideTitle} onChange={onChange} />
                    </div>
                    <TextArea label="Focus Areas" name="focusAreas" value={data.focusAreas} onChange={onChange} />
                    <TextArea label="Contribution Title" name="contribution" value={data.contribution} onChange={onChange} />
                </div>
            </section>

            {/* Section 3 */}
            <section>
                <h3 className="text-[#0070C0] font-bold border-b border-gray-100 pb-2 mb-4">Signatories</h3>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <p className="text-xs font-bold text-gray-400 uppercase">Left Signatory</p>
                        <Input label="Name" name="signLeftName" value={data.signLeftName} onChange={onChange} />
                        <Input label="Title" name="signLeftTitle" value={data.signLeftTitle} onChange={onChange} />
                    </div>
                    <div className="space-y-2">
                        <p className="text-xs font-bold text-gray-400 uppercase">Center Signatory</p>
                        <Input label="Name" name="signCenterName" value={data.signCenterName} onChange={onChange} />
                        <Input label="Title" name="signCenterTitle" value={data.signCenterTitle} onChange={onChange} />
                    </div>
                    <div className="space-y-2">
                        <p className="text-xs font-bold text-gray-400 uppercase">Right Signatory</p>
                        <Input label="Name" name="signRightName" value={data.signRightName} onChange={onChange} />
                        <Input label="Title" name="signRightTitle" value={data.signRightTitle} onChange={onChange} />
                    </div>
                </div>
            </section>
        </div>
        
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex justify-center">
            <button 
                onClick={handleGenerate}
                disabled={isLoading}
                className="px-8 py-3 bg-[#0070C0] hover:bg-blue-700 text-white rounded-lg font-bold shadow-lg hover:shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                "Generate Certificate"
              )}
            </button>
        </div>
      </div>
    </div>
  );
};

// --- View 2: Certificate Preview ---
const PreviewView = ({ data, onBack }: { data: CertificateData, onBack: () => void }) => {
    const searchParams = useSearchParams();
    const loginEmail = useMemo(() => searchParams.get("email") || "", [searchParams]);
    const [emailToSend, setEmailToSend] = useState(loginEmail);
    const [isEmailSending, setIsEmailSending] = useState(false);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const certRef = useRef<HTMLDivElement>(null);

    const handleDownloadPDF = async () => {
        const el = certRef.current;
        if (!el) return;
        const canvas = await html2canvas(el, { scale: 3, useCORS: true, logging: false, backgroundColor: "#ffffff" });
        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
        pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
        pdf.save(`${data.studentName.replace(/\s+/g, "_")}_CERTIFICATE.pdf`);
    };

    const handlePrint = () => window.print();

    const handleSendEmail = async () => {
        if (!emailToSend) {
            alert("Please enter an email to send the certificate.");
            return;
        }
        try {
            setIsEmailSending(true);

            // Generate PDF
            const el = certRef.current;
            if (!el) {
                alert("Certificate not found. Please refresh and try again.");
                return;
            }

            const canvas = await html2canvas(el, { scale: 3, useCORS: true, logging: false, backgroundColor: "#ffffff" });
            const pdfData = canvas.toDataURL("image/jpeg", 1.0);

            // Send to API
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailToSend,
                    pdfData,
                    studentName: data.studentName,
                }),
            });

            if (response.ok) {
                alert(`Certificate emailed to ${emailToSend}`);
                setIsEmailModalOpen(false);
            } else {
                const error = await response.json();
                alert(`Failed to send email: ${error.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Email sending error:', error);
            alert("Failed to send email. Please try again.");
        } finally {
            setIsEmailSending(false);
        }
    };

    // Theme Constants
    const themeBlue = "#0070C0";
    const textBlack = "#000000";

    return (
        <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-300">
            {/* Action Bar */}
            <div className="no-print w-full max-w-4xl p-4 rounded-xl flex flex-wrap justify-between items-center px-12">
                <button 
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium px-4 py-2 rounded-lg transition-colors bg-white border border-gray-200 hover:border-gray-300"
                >
                    <ArrowLeft size={16} /> Edit Details
                </button>
                <div className="flex flex-wrap items-center gap-3">
                    <button onClick={handlePrint} className="px-5 py-2 rounded-lg border border-[#0070C0] text-[#0070C0] font-semibold hover:bg-blue-50 transition-colors">
                        Print
                    </button>
                    <button 
                        onClick={() => setIsEmailModalOpen(true)}
                        className="px-5 py-2 rounded-lg border border-[#0070C0] text-[#0070C0] font-semibold hover:bg-blue-50 transition-colors"
                    >
                        <span className="flex items-center gap-2">
                            <Send size={16} />
                            Email Certificate
                        </span>
                    </button>
                    <button onClick={handleDownloadPDF} className="px-5 py-2 rounded-lg bg-[#0070C0] text-white font-semibold hover:bg-blue-700 shadow-md transition-all">
                        Download PDF
                    </button>
                </div>
            </div>

            {/* Certificate Canvas */}
            <div className="shadow-2xl overflow-hidden rounded-sm">
                <div
                    id="certificate-root"
                    ref={certRef}
                    className="cert-font relative flex flex-col bg-white"
                    style={{
                        width: "210mm",
                        height: "297mm",
                        padding: "15mm 12mm 0mm 12mm", 
                        color: textBlack,
                    }}
                >
                    {/* --- PIXEL PERFECT CERTIFICATE CONTENT START --- */}
                    
                    {/* Header Section */}
                    <div className="w-full flex items-start mb-2 gap-4">
                        <div className="relative w-[28mm] h-[28mm] flex-shrink-0 mt-0 translate-x-[-3mm]">
                            <img src={IIITNRLogo.src} alt="IIIT Logo" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 text-left leading-tight">
                            <div className="text-[12pt] font-bold text-[#0070C0] tracking-wide mb-1">
                                डॉ. श्यामाप्रसाद मुखर्जी अंतरराष्ट्रीय सूचना प्रौद्योगिकी संस्थान
                            </div>
                            <div className="text-[13pt] font-bold text-[#0070C0] mb-1">
                                Dr. Shyama Prasad Mukherjee International Institute of Information <br/> Technology, Naya Raipur
                            </div>
                            <div className="text-[10pt] font-normal text-black mb-1 ml-10">
                                (a Joint Initiative of NTPC & Govt. of Chhattisgarh)
                            </div>
                            <div className="relative text-[10pt] font-medium w-full">
                                <span>Email: <a href="mailto:iiitnr@iiitnr.ac.in" className="underline text-[#0070C0]">iiitnr@iiitnr.ac.in</a>, Tel: (0771) 2474040, Web: <a href="http://www.iiitnr.ac.in" className="underline text-[#0070C0]">www.iiitnr.ac.in</a></span>
                                <span className="absolute right-0 top-0 font-bold text-[#0070C0]">Est.2015</span>
                            </div>
                        </div>
                    </div>

                    {/* Separator Line */}
                    <div className="w-full" style={{ borderTop: `1.5px solid ${themeBlue}`, marginBottom: "8mm", marginTop: "3mm", opacity: 1 }}></div>

                    {/* Ref and Date */}
                    <div className="flex justify-between items-end text-[11pt] font-bold mb-10 px-1">
                        <div>Ref: {data.refNo}</div>
                        <div>Date: {data.date}</div>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-10">
                        <h1 className="text-[14pt] font-bold uppercase tracking-wide inline-block" style={{ paddingBottom: "4px", borderBottom: `1px solid` }}>
                            TO WHOM IT MAY CONCERN
                        </h1>
                    </div>

                    {/* Body Content */}
                    <div className="flex flex-col text-[12pt] leading-[1.6] px-1">
                        <p className="mb-4">This is to certify that</p>
                        <div className="grid grid-cols-[140px_60px_1fr] gap-y-2 mb-6 font-medium">
                            <div>Students Name</div><div className="text-center">:</div><div className="uppercase font-bold">{data.studentName}</div>
                            <div>Father’s Name</div><div className="text-center">:</div><div className="uppercase font-bold">{data.fatherName}</div>
                            <div>Department Name</div><div className="text-center">:</div><div className="uppercase font-bold">{data.department}</div>
                            <div>Institute Name</div><div className="text-center">:</div><div className="uppercase font-bold">{data.institute}</div>
                        </div>
                        <p className="text-justify mb-5 leading-[1.8]">
                            has successfully completed <span className="font-bold">eight</span> weeks (From <span>{data.startDate}</span> to <span>{data.endDate}</span>) of Internship as 
                            a participant of the IIIT-NR Outreach Program under the guidance of <span className="user-text font-bold">{data.guideName}</span>, <span className="user-text font-bold">{data.guideTitle}</span>. 
                            His internship activity focused on <span className="user-text font-bold">{data.focusAreas}</span>. He has contributed 
                            towards ‘<span className="user-text font-bold">{data.contribution}</span>’.
                        </p>
                        <p className="text-justify mb-5 leading-[1.8]">
                            During the period of his internship program, he had been exposed to the different 
                            processes and was found punctual, hardworking, and inquisitive. His zeal for learning 
                            something is quite peculiar and unique in its own way.
                        </p>
                        <p className="mt-2">I wish all success for his future endeavors.</p>
                    </div>

                    {/* Signatures */}
                    <div className="mt-auto mb-[30mm] grid grid-cols-3 gap-4 items-end text-center px-1">
                        <div className="flex flex-col items-center"><div className="font-bold text-[11pt]">{data.signLeftName}</div><div className="text-[11pt]">{data.signLeftTitle}</div></div>
                        <div className="flex flex-col items-center"><div className="font-bold text-[11pt]">{data.signCenterName}</div><div className="text-[11pt]">{data.signCenterTitle}</div></div>
                        <div className="flex flex-col items-center"><div className="font-bold text-[11pt]">{data.signRightName}</div><div className="text-[11pt]">{data.signRightTitle}</div></div>
                    </div>

                    {/* Footer */}
                    <div className="absolute bottom-0 left-0 w-full" style={{ borderTop: `1.5px solid ${themeBlue}`, paddingBottom: "30px", paddingTop: "5px", backgroundColor: "white" }}>
                        <div className="text-center text-[9pt] font-medium">
                            Plot No. 7, Sector 24, Near Purkhoti Muktangan, Naya Raipur – 493661, Chhattisgarh, India
                        </div>
                    </div>

                    {/* --- PIXEL PERFECT CERTIFICATE CONTENT END --- */}
                </div>
            </div>
            <div className="no-print text-sm text-gray-400 pb-10">
                Preview Mode - The output is optimized for A4 Paper size.
            </div>

            {/* Email Modal */}
            {isEmailModalOpen && (
                <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 p-6 relative">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Email Certificate</h3>
                        <p className="text-sm text-gray-600 mb-4">Enter the email address to send this certificate.</p>
                        <label className="block mb-4">
                            <span className="text-xs font-semibold text-gray-500 mb-1 block">Recipient Email</span>
                            <input
                                type="email"
                                value={emailToSend}
                                onChange={(e) => setEmailToSend(e.target.value)}
                                placeholder="student@example.com"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0070C0] focus:border-transparent"
                            />
                        </label>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsEmailModalOpen(false)}
                                disabled={isEmailSending}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-60"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSendEmail}
                                disabled={!emailToSend || isEmailSending}
                                className="px-4 py-2 rounded-lg bg-[#0070C0] text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isEmailSending ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        Send Email
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
const Input = ({ label, name, value, onChange }: { label: string, name: string, value: string, onChange: React.ChangeEventHandler<HTMLInputElement> }) => (
    <label className="block">
        <span className="text-xs font-semibold text-gray-500 mb-1 block">{label}</span>
        <input 
            name={name} 
            value={value} 
            onChange={onChange} 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0070C0] focus:border-transparent transition-all"
            placeholder={`Enter ${label}`}
        />
    </label>
);

const TextArea = ({ label, name, value, onChange }: { label: string, name: string, value: string, onChange: React.ChangeEventHandler<HTMLTextAreaElement> }) => (
    <label className="block">
        <span className="text-xs font-semibold text-gray-500 mb-1 block">{label}</span>
        <textarea 
            name={name} 
            value={value} 
            onChange={onChange} 
            rows={2}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0070C0] focus:border-transparent transition-all resize-none"
            placeholder={`Enter ${label}`}
        />
    </label>
);