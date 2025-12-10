'use client';

import React, { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import IIITNRLogo from "../../assets/IIITNR_Logo.png"; // Ensure this path is correct

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

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Arimo:wght@400;700&display=swap');
    
    /* Standard print reset */
    @page { 
      size: A4 portrait; 
      margin: 0; 
    }
    
    @media print {
      /* 1. Hide everything by default */
      body * {
        visibility: hidden;
      }

      /* 2. Reset html/body to avoid scrollbars or extra pages */
      html, body {
        height: 100vh;
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden;
      }

      /* 3. Make ONLY the certificate visible */
      #certificate-root, #certificate-root * {
        visibility: visible;
      }

      /* 4. Position the certificate absolutely at 0,0 to ignore parent spacing */
      #certificate-root {
        position: fixed;
        left: 0;
        top: 0;
        width: 210mm !important;
        height: 297mm !important;
        margin: 0 !important;
        
        /* Remove screen effects */
        box-shadow: none !important;
        border: none !important;
        border-radius: 0 !important;
        background: white !important;
        z-index: 9999;
        
        /* Ensure print colors are exact */
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      
      /* Hide the controls explicitly just in case */
      .no-print {
        display: none !important;
      }
    }
    
    /* Using Arimo or Arial/Calibri to match the Sans-Serif look of the image */
    .cert-font {
      font-family: 'Arimo', 'Calibri', 'Arial', 'Helvetica', sans-serif;
    }

    /* User-entered fields use Times New Roman to match the provided sample */
    .user-text {
      font-family: 'Times New Roman', 'TimesNewRoman', serif;
    }
  `}</style>
);

const defaultData: CertificateData = {
  refNo: "IIITNR/ACAD/OIP/2024/01",
  date: "28. 07. 2024", // Note the spacing in the image
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

export default function CertificateGenerator() {
  const [data, setData] = useState<CertificateData>(defaultData);
  const certRef = useRef<HTMLDivElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData((d) => ({ ...d, [e.target.name as keyof CertificateData]: e.target.value }));

  const handleDownloadPDF = async () => {
    const el = certRef.current;
    if (!el) return;

    // High scale for crisp text
    const canvas = await html2canvas(el, {
      scale: 3, 
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const width = 210;
    const height = 297;
    pdf.addImage(imgData, "JPEG", 0, 0, width, height);
    pdf.save(`${data.studentName.replace(/\s+/g, "_")}_CERTIFICATE.pdf`);
  };

  const handlePrint = () => window.print();

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  // Define the blue color used in the document (Office Blue)
  const themeBlue = "#0070C0";
  const textBlack = "#000000";

  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-8 py-8" style={{ backgroundColor: "#eef3f8", color: "#333" }}>
      <GlobalStyles />

      {/* Controls */}
      <div className="no-print w-full max-w-7xl pr-15 flex justify-between items-center px-4">
        <h1 className="text-3xl font-bold text-left flex-1 text-[#0070C0]">Certificate Generator</h1>
        <div className="flex gap-3">
          <button onClick={handleDownloadPDF} className="px-5 py-2 rounded shadow bg-[#0070C0] text-white font-medium hover:bg-blue-700 transition">
            Download PDF
          </button>
          <button onClick={handlePrint} className="px-5 py-2 rounded shadow bg-white text-[#0070C0] border border-[#0070C0] font-medium hover:bg-blue-50 transition">
            Print
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[350px_1fr] gap-8 w-full max-w-[1400px] px-4">
        {/* Editor Panel */}
        <div className="no-print h-fit rounded-xl bg-white p-6 shadow-sm flex flex-col gap-4">
          <h2 className="font-semibold text-[#0070C0] border-b pb-2">Student Details</h2>
          
          <div className="space-y-3">
            <Input label="Reference No." name="refNo" value={data.refNo} onChange={onChange} />
            <Input label="Date" name="date" value={data.date} onChange={onChange} />
            <Input label="Student Name" name="studentName" value={data.studentName} onChange={onChange} />
            <Input label="Father's Name" name="fatherName" value={data.fatherName} onChange={onChange} />
            <Input label="Department" name="department" value={data.department} onChange={onChange} />
            <Input label="Institute" name="institute" value={data.institute} onChange={onChange} />
          </div>

          <h2 className="font-semibold text-[#0070C0] border-b pb-2 mt-4">Internship Info</h2>
          <div className="space-y-3">
             <div className="grid grid-cols-2 gap-2">
                <Input label="Start Date" name="startDate" value={data.startDate} onChange={onChange} />
                <Input label="End Date" name="endDate" value={data.endDate} onChange={onChange} />
             </div>
             <Input label="Guide Name" name="guideName" value={data.guideName} onChange={onChange} />
             <label className="block text-xs font-medium text-gray-500">
               Focus Areas
               <textarea name="focusAreas" value={data.focusAreas} onChange={onChange} rows={3} className="w-full mt-1 border border-gray-300 rounded p-2 text-sm" />
             </label>
             <label className="block text-xs font-medium text-gray-500">
               Contribution Title
               <textarea name="contribution" value={data.contribution} onChange={onChange} rows={3} className="w-full mt-1 border border-gray-300 rounded p-2 text-sm" />
             </label>
          </div>
        </div>

        {/* Certificate Preview - EXACT A4 Size */}
        <div className="flex justify-center overflow-auto pb-10">
          <div
            id="certificate-root"
            ref={certRef}
            className="cert-font relative flex flex-col bg-white shadow-xl"
            style={{
              width: "210mm",
              height: "297mm",
              // Adjusted padding to ensure header doesn't get cut off or crowded
              padding: "15mm 12mm 0mm 12mm", 
              color: textBlack,
            }}
          >
            {/* Header Section */}
            <div className="w-full flex items-start mb-2 gap-4">
                {/* Logo - Removed negative Y translation so it doesn't float up */}
                <div className="relative w-[28mm] h-[28mm] flex-shrink-0 mt-0 translate-x-[-3mm]">
                    <img src={IIITNRLogo.src} alt="IIIT Logo" className="w-full h-full object-contain" />
                </div>
                
                {/* Header Text */}
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
                    
                    {/* Contact & Est Line */}
                    <div className="relative text-[10pt] font-medium w-full">
                        <span>Email: <a href="mailto:iiitnr@iiitnr.ac.in" className="underline text-[#0070C0]">iiitnr@iiitnr.ac.in</a>, Tel: (0771) 2474040, Web: <a href="http://www.iiitnr.ac.in" className="underline text-[#0070C0]">www.iiitnr.ac.in</a></span>
                        <span className="absolute right-0 top-0 font-bold text-[#0070C0]">Est.2015</span>
                    </div>
                </div>
            </div>

            {/* Blue Separator Line - Added marginTop to prevent text overlap */}
            <div
              className="w-full"
              style={{ 
                  borderTop: `1.5px solid ${themeBlue}`, 
                  marginBottom: "8mm", 
                  marginTop: "3mm", // Push line down away from email text
                  opacity: 1 
              }}
            ></div>

            {/* Ref and Date Line */}
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

                {/* Student Details Grid */}
                <div className="grid grid-cols-[140px_60px_1fr] gap-y-2 mb-6 font-medium">
                    {/* Row 1 */}
                    <div>Students Name</div>
                    <div className="text-center">:</div>
                    <div className="uppercase font-bold">{data.studentName}</div>

                    {/* Row 2 */}
                    <div>Father’s Name</div>
                    <div className="text-center">:</div>
                    <div className="uppercase font-bold">{data.fatherName}</div>

                    {/* Row 3 */}
                    <div>Department Name</div>
                    <div className="text-center">:</div>
                    <div className="uppercase font-bold">{data.department}</div>

                    {/* Row 4 */}
                    <div>Institute Name</div>
                    <div className="text-center">:</div>
                    <div className="uppercase font-bold">{data.institute}</div>
                </div>

                {/* Paragraph 1 */}
                <p className="text-justify mb-5 leading-[1.8]">
                    has successfully completed <span className="font-bold">eight</span> weeks (From <span>{data.startDate}</span> to <span>{data.endDate}</span>) of Internship as 
                    a participant of the IIIT-NR Outreach Program under the guidance of <span className="user-text font-bold">{data.guideName}</span>, <span className="user-text font-bold">{data.guideTitle}</span>. 
                    His internship activity focused on <span className="user-text font-bold">{data.focusAreas}</span>. He has contributed 
                    towards ‘<span className="user-text font-bold">{data.contribution}</span>’.
                </p>

                {/* Paragraph 2 */}
                <p className="text-justify mb-5 leading-[1.8]">
                    During the period of his internship program, he had been exposed to the different 
                    processes and was found punctual, hardworking, and inquisitive. His zeal for learning 
                    something is quite peculiar and unique in its own way.
                </p>

                {/* Closing */}
                <p className="mt-2">I wish all success for his future endeavors.</p>
            </div>

            {/* Signatures */}
            <div className="mt-auto mb-[30mm] grid grid-cols-3 gap-4 items-end text-center px-1">
                <div className="flex flex-col items-center">
                    <div className="font-bold text-[11pt]">{data.signLeftName}</div>
                    <div className="text-[11pt]">{data.signLeftTitle}</div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="font-bold text-[11pt]">{data.signCenterName}</div>
                    <div className="text-[11pt]">{data.signCenterTitle}</div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="font-bold text-[11pt]">{data.signRightName}</div>
                    <div className="text-[11pt]">{data.signRightTitle}</div>
                </div>
            </div>

            {/* Footer - Fixed overlap by removing mb-10 and using strict positioning */}
            <div 
                className="absolute bottom-0 left-0 w-full"
                style={{
                    borderTop: `1.5px solid ${themeBlue}`,
                    paddingBottom: "30px", // Internal padding for text
                    paddingTop: "5px",
                    backgroundColor: "white" // ensure it covers anything behind it if necessary
                }}
            >
                <div className="text-center text-[9pt] font-medium">
                    Plot No. 7, Sector 24, Near Purkhoti Muktangan, Naya Raipur – 493661, Chhattisgarh, India
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Component for Input fields
const Input = ({ label, name, value, onChange }: { label: string, name: string, value: string, onChange: any }) => (
    <label className="block">
        <span className="text-xs font-medium text-gray-500">{label}</span>
        <input 
            name={name} 
            value={value} 
            onChange={onChange} 
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1 focus:outline-none focus:border-[#0070C0]"
        />
    </label>
);