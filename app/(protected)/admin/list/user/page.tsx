import React, { Suspense } from 'react';
import { Tbheaduser } from '@/components/TbUser/head';
import TbodyUser from '@/components/TbUser/body';
import Ad from '@/components/TbUser/btn/ad';
import { PageProps } from '@/types/pagination';

const ENABLE_NEW_USER_LIST = process.env.NEXT_PUBLIC_FEATURE_USER_LIST !== 'off';

const TableFallback = () => (
  <tbody>
    {[...Array(3)].map((_, idx) => (
      <tr key={idx} className="animate-pulse">
        <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
          <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
          <div className="h-4 w-28 rounded bg-gray-200 dark:bg-gray-700" />
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
          <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
          <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
        </td>
      </tr>
    ))}
  </tbody>
);

const NewUserList = async (props: PageProps) => (
  <div>
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <Ad />
        <table className="w-full table-auto" data-testid="user-table">
          <Tbheaduser />
          <Suspense fallback={<TableFallback />}>
            <TbodyUser {...props} />
          </Suspense>
        </table>
      </div>
    </div>
  </div>
);

const LegacyUserList = async (props: PageProps) => (
  <div>
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <Ad />
        <table className="w-full table-auto">
          <Tbheaduser />
          <TbodyUser {...props} />
        </table>
      </div>
    </div>
  </div>
);

const UserList = async (props: PageProps) => {
  if (!ENABLE_NEW_USER_LIST) return <LegacyUserList {...props} />;
  return <NewUserList {...props} />;
};

export default UserList;
