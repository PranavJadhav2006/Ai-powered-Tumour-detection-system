import React from 'react';

const AddPatient = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight">Add Patient</p>
          <p className="text-[#637588] text-sm font-normal leading-normal">Add a new patient to the clinic's records.</p>
        </div>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#111418] text-base font-medium leading-normal pb-2">Name</p>
          <input type="text" placeholder="Enter patient's name" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-12 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal" />
        </label>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#111418] text-base font-medium leading-normal pb-2">Age</p>
          <input type="number" placeholder="Enter patient's age" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-12 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal" />
        </label>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#111418] text-base font-medium leading-normal pb-2">Gender</p>
          <input type="text" placeholder="Enter patient's gender" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-12 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal" />
        </label>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#111418] text-base font-medium leading-normal pb-2">Contact</p>
          <input type="text" placeholder="Enter patient's contact number" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-12 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal" />
        </label>
      </div>
      <div className="flex justify-stretch">
        <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-start">
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Save</span>
          </button>
          <a href="patients.html" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f2f4] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Cancel</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
