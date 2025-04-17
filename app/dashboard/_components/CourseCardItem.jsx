import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import Link from 'next/link';

function CourseCardItem({ course }) {
  return (
    <div className="border rounded-lg shadow-md p-5 bg-white">
      <div>
        <div className="flex justify-between items-center">
          <Image src={'/download5.png'} alt="Course Thumbnail" width={50} height={50} />
          <h2 className="text-[10px] p-1 px-2 rounded-full bg-blue-600 text-white">
            {course?.creationDate || '20 Dec 2024'}
          </h2>
        </div>
        <h2 className="mt-3 font-medium text-lg">{course?.courseLayout?.courseTitle}</h2>
        <p className="text-sm line-clamp-2 text-gray-500 mt-2">{course?.courseLayout?.courseSummary}</p>

        <div className="mt-3 flex justify-end">
          {course?.status === 'NULL' ? (
            <h2 className="text-[12px] p-1 px-2 flex gap-2 items-center rounded-full bg-gray-500 text-white">
              <RefreshCcw className="h-5 w-5 animate-spin" />
              Generating...
            </h2>
          ) : (
            <Link href={`/course/${course?.courseId}`}>
              <Button>View</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCardItem;
