import React from 'react';

const PatientVisitRecords = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight">Patient Visit Record</p>
          <p className="text-[#637588] text-sm font-normal leading-normal">Record details of the patient's visit, including symptoms, diagnosis, and prescribed medicines.</p>
        </div>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#111418] text-base font-medium leading-normal pb-2">Symptoms</p>
          <textarea
            placeholder="Describe the patient's symptoms"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] min-h-36 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal"
          ></textarea>
        </label>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#111418] text-base font-medium leading-normal pb-2">Diagnosis</p>
          <textarea
            placeholder="Enter the diagnosis"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] min-h-36 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal"
          ></textarea>
        </label>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#111418] text-base font-medium leading-normal pb-2">Notes</p>
          <textarea
            placeholder="Add any additional notes about the visit"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] min-h-36 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal"
          ></textarea>
        </label>
      </div>
      <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Prescribed Medicines</h2>
      <div className="px-4 py-3 @container">
        <div className="flex overflow-hidden rounded-lg border border-[#dce0e5] bg-white">
          <table className="flex-1">
            <thead>
              <tr className="bg-white">
                <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                  Medicine Name
                </th>
                <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Dosage</th>
                <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-t-[#dce0e5]">
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">
                  <input type="text" placeholder="Enter medicine name" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-12 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal" />
                </td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                  <input type="text" placeholder="Enter dosage" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-12 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal" />
                </td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                  <input type="text" placeholder="Enter duration" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-12 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal" />
                </td>
                <td className="h-[72px] px-4 py-2 w-[200px] text-sm font-normal leading-normal">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                    <span className="truncate">Update</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientVisitRecords;
