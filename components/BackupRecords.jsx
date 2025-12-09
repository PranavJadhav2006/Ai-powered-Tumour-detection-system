import React from 'react';

const BackupRecords = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight">Backup & Restore</p>
          <p className="text-[#637588] text-sm font-normal leading-normal">Safeguard your patient data with easy backup and restore options.</p>
        </div>
      </div>
      <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Export Data</h3>
      <p className="text-[#111418] text-base font-normal leading-normal pb-3 pt-1 px-4">
        Create a backup of all patient records and clinic data. This file can be used to restore your data in case of system issues or when moving to a new computer.
      </p>
      <div className="flex px-4 py-3 justify-start">
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]"
        >
          <span className="truncate">Export Data</span>
        </button>
      </div>
      <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Restore Data</h3>
      <p className="text-[#111418] text-base font-normal leading-normal pb-3 pt-1 px-4">
        Restore your clinic data from a previously saved backup file. Please ensure the file is from this application to avoid compatibility issues.
      </p>
      <div className="flex px-4 py-3 justify-start">
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f2f4] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]"
        >
          <span className="truncate">Restore Data</span>
        </button>
      </div>
    </div>
  );
};

export default BackupRecords;
