import React, { Suspense } from 'react';
import TbodyStudent from '@/components/TbStudent/body';
import { Tbheadstudent } from '@/components/TbStudent/head';
import { PageProps } from '@/types/pagination';
const TableFallback = () => (
  <tbody>
    {[...Array(3)].map((_, idx) => (
      <tr key={idx} className="animate-pulse">
        <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
          <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
          <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-700" />
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
          <div className="h-4 w-48 rounded bg-gray-200 dark:bg-gray-700" />
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
          <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
        </td>
      </tr>
    ))}
  </tbody>
);
const UserList = async (props: PageProps) => {
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto" data-testid="student-table">
            <Tbheadstudent />
            <Suspense fallback={<TableFallback />}>
              <TbodyStudent {...props} />
            </Suspense>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
