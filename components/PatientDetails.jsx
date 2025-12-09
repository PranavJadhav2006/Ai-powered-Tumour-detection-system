import React from 'react';

const PatientDetails = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight">Patient Details</p>
          <p className="text-[#637588] text-sm font-normal leading-normal">View and manage patient information and visit history.</p>
        </div>
      </div>
      <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Personal Information</h3>
      <div className="p-4 grid grid-cols-2">
        <div className="flex flex-col gap-1 border-t border-solid border-t-[#dce0e5] py-4 pr-2">
          <p className="text-[#637588] text-sm font-normal leading-normal">Name</p>
          <p className="text-[#111418] text-sm font-normal leading-normal">Ethan Carter</p>
        </div>
        <div className="flex flex-col gap-1 border-t border-solid border-t-[#dce0e5] py-4 pl-2">
          <p className="text-[#637588] text-sm font-normal leading-normal">Age</p>
          <p className="text-[#111418] text-sm font-normal leading-normal">35</p>
        </div>
        <div className="flex flex-col gap-1 border-t border-solid border-t-[#dce0e5] py-4 pr-2">
          <p className="text-[#637588] text-sm font-normal leading-normal">Gender</p>
          <p className="text-[#111418] text-sm font-normal leading-normal">Male</p>
        </div>
        <div className="flex flex-col gap-1 border-t border-solid border-t-[#dce0e5] py-4 pl-2">
          <p className="text-[#637588] text-sm font-normal leading-normal">Contact</p>
          <p className="text-[#111418] text-sm font-normal leading-normal">+1-555-123-4567</p>
        </div>
        <div className="flex flex-col gap-1 border-t border-solid border-t-[#dce0e5] py-4 pr-2">
          <p className="text-[#637588] text-sm font-normal leading-normal">Address</p>
          <p className="text-[#111418] text-sm font-normal leading-normal">123 Elm Street, Anytown, USA</p>
        </div>
        <div className="flex flex-col gap-1 border-t border-solid border-t-[#dce0e5] py-4 pl-2">
          <p className="text-[#637588] text-sm font-normal leading-normal">Date of Birth</p>
          <p className="text-[#111418] text-sm font-normal leading-normal">1988-05-15</p>
        </div>
      </div>
      <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Visit History</h3>
      <div className="px-4 py-3 @container">
        <div className="flex overflow-hidden rounded-lg border border-[#dce0e5] bg-white">
          <table className="flex-1">
            <thead>
              <tr className="bg-white">
                <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Date</th>
                <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                  Symptoms
                </th>
                <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                  Diagnosis
                </th>
                <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                  Prescribed Medicines
                </th>
                <th className="px-4 py-3 text-left text-[#111418] w-[200px] text-sm font-medium leading-normal">View</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-t-[#dce0e5]">
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                  2023-08-15
                </td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                  Headache, fatigue
                </td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">Migraine</td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                  Ibuprofen, Rest
                </td>
                <td className="h-[72px] px-4 py-2 w-[200px] text-sm font-normal leading-normal">
                  <a href="patient-visit.records.html" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#1980e6] text-white text-sm font-medium leading-normal w-full">
                    <span className="truncate">View</span>
                  </a>
                </td>
              </tr>
              <tr className="border-t border-t-[#dce0e5]">
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                  2023-09-20
                </td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                  Sore throat, cough
                </td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                  Common Cold
                </td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                  Cough syrup, Throat lozenges
                </td>
                <td className="h-[72px] px-4 py-2 w-[200px] text-sm font-normal leading-normal">
                  <a href="patient-visit.records.html" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#1980e6] text-white text-sm font-medium leading-normal w-full">
                    <span className="truncate">View</span>
                  </a>
                </td>
              </tr>
              <tr className="border-t border-t-[#dce0e5]">
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                  2023-11-05
                </td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                  Fever, body aches
                </td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                  Influenza
                </td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                  Antiviral medication, Rest
                </td>
                <td className="h-[72px] px-4 py-2 w-[200px] text-sm font-normal leading-normal">
                  <a href="patient-visit.records.html" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#1980e6] text-white text-sm font-medium leading-normal w-full">
                    <span className="truncate">View</span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
