import React from 'react';

const Patients = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">Patients</p>
        <a href="add-patient.html" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#1980e6] text-white text-sm font-medium leading-normal">
          <span className="truncate">Add Patient</span>
        </a>
      </div>
      <div className="px-4 py-3">
        <label className="flex flex-col min-w-40 h-12 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div
              className="text-[#637588] flex border-none bg-[#f0f2f4] items-center justify-center pl-4 rounded-l-lg border-r-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                ></path>
              </svg>
            </div>
            <input
              placeholder="Search patients"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f4] focus:border-none h-full placeholder:text-[#637588] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              value=""
            />
          </div>
        </label>
      </div>
      <div className="px-4 py-3 @container">
        <div className="flex overflow-hidden rounded-lg border border-[#dce0e5] bg-white">
          <table className="flex-1">
            <thead>
              <tr className="bg-white">
                <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Name</th>
                <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Age</th>
                <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Gender</th>
                <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Contact</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-t-[#dce0e5]">
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">
                  Liam Harper
                </td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">35</td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">Male</td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                  555-123-4567
                </td>
                <td className="h-[72px] px-4 py-2 w-[200px] text-sm font-normal leading-normal">
                  <a href="patient-details.html" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#1980e6] text-white text-sm font-medium leading-normal w-full">
                    <span className="truncate">View Details</span>
                  </a>
                </td>
              </tr>
              <tr className="border-t border-t-[#dce0e5]">
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">
                  Olivia Bennett
                </td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">28</td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">Female</td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                  555-987-6543
                </td>
                <td className="h-[72px] px-4 py-2 w-[200px] text-sm font-normal leading-normal">
                  <a href="patient-details.html" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#1980e6] text-white text-sm font-medium leading-normal w-full">
                    <span className="truncate">View Details</span>
                  </a>
                </td>
              </tr>
              <tr className="border-t border-t-[#dce0e5]">
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">
                  Noah Carter
                </td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">42</td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">Male</td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                  555-246-8013
                </td>
                <td className="h-[72px] px-4 py-2 w-[200px] text-sm font-normal leading-normal">
                  <a href="patient-details.html" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#1980e6] text-white text-sm font-medium leading-normal w-full">
                    <span className="truncate">View Details</span>
                  </a>
                </td>
              </tr>
              <tr className="border-t border-t-[#dce0e5]">
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">
                  Ava Thompson
                </td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">31</td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">Female</td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                  555-369-1470
                </td>
                <td className="h-[72px] px-4 py-2 w-[200px] text-sm font-normal leading-normal">
                  <a href="patient-details.html" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#1980e6] text-white text-sm font-medium leading-normal w-full">
                    <span className="truncate">View Details</span>
                  </a>
                </td>
              </tr>
              <tr className="border-t border-t-[#dce0e5]">
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">
                  Ethan Parker
                </td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">50</td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">Male</td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                  555-789-0123
                </td>
                <td className="h-[72px] px-4 py-2 w-[200px] text-sm font-normal leading-normal">
                  <a href="patient-details.html" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#1980e6] text-white text-sm font-medium leading-normal w-full">
                    <span className="truncate">View Details</span>
                  </a>
                </td>
              </tr>
              <tr className="border-t border-t-[#dce0e5]">
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">
                  Sophia Mitchell
                </td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">25</td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">Female</td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                  555-456-7890
                </td>
                <td className="h-[72px] px-4 py-2 w-[200px] text-sm font-normal leading-normal">
                  <a href="patient-details.html" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#1980e6] text-white text-sm font-medium leading-normal w-full">
                    <span className="truncate">View Details</span>
                  </a>
                </td>
              </tr>
              <tr className="border-t border-t-[#dce0e5]">
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">
                  Jackson Reed
                </td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">38</td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">Male</td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                  555-654-3210
                </td>
                <td className="h-[72px] px-4 py-2 w-[200px] text-sm font-normal leading-normal">
                  <a href="patient-details.html" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#1980e6] text-white text-sm font-medium leading-normal w-full">
                    <span className="truncate">View Details</span>
                  </a>
                </td>
              </tr>
              <tr className="border-t border-t-[#dce0e5]">
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">
                  Isabella Coleman
                </td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">45</td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">Female</td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                  555-111-2222
                </td>
                <td className="h-[72px] px-4 py-2 w-[200px] text-sm font-normal leading-normal">
                  <a href="patient-details.html" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#1980e6] text-white text-sm font-medium leading-normal w-full">
                    <span className="truncate">View Details</span>
                  </a>
                </td>
              </tr>
              <tr className="border-t border-t-[#dce0e5]">
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">
                  Aiden Foster
                </td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">29</td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">Male</td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                  555-333-4444
                </td>
                <td className="h-[72px] px-4 py-2 w-[200px] text-sm font-normal leading-normal">
                  <a href="patient-details.html" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#1980e6] text-white text-sm font-medium leading-normal w-full">
                    <span className="truncate">View Details</span>
                  </a>
                </td>
              </tr>
              <tr className="border-t border-t-[#dce0e5]">
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">
                  Mia Brooks
                </td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">33</td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">Female</td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">
                  555-555-6666
                </td>
                <td className="h-[72px] px-4 py-2 w-[200px] text-sm font-normal leading-normal">
                  <a href="patient-details.html" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#1980e6] text-white text-sm font-medium leading-normal w-full">
                    <span className="truncate">View Details</span>
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

export default Patients;
