import React, { Suspense } from 'react';
import TbodyTeacher from '@/components/TbTeacher/body';
import { Tbheadteacher } from '@/components/TbTeacher/head';
import { PageProps } from '@/types/pagination';

const ENABLE_NEW_TEACHER_LIST = process.env.NEXT_PUBLIC_FEATURE_TEACHER_LIST !== 'off';

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
          <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
        </td>
      </tr>
    ))}
  </tbody>
);

const NewTeacherList = async (props: PageProps) => (
  <div>
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto" data-testid="teacher-table">
          <Tbheadteacher />
          <Suspense fallback={<TableFallback />}>
            <TbodyTeacher {...props} />
          </Suspense>
        </table>
      </div>
    </div>
  </div>
);

// Legacy fallback mirrors the prior implementation without Suspense
const LegacyTeacherList = async (props: PageProps) => (
  <div>
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <Tbheadteacher />
          <TbodyTeacher {...props} />
        </table>
      </div>
    </div>
  </div>
);

const TeacherList = async (props: PageProps) => {
  if (!ENABLE_NEW_TEACHER_LIST) return <LegacyTeacherList {...props} />;
  return <NewTeacherList {...props} />;
};

export default TeacherList;
