import logo from '@/app/(assets)/logo.svg'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function Loading() {
  return (
    <section className="grid grid-cols-12 gap-4 flex-1">
      <aside className=" hidden lg:col-span-4 xl:col-span-3 lg:flex bg-secondary p-6 flex-col gap-8 h-screen">
        <Skeleton className="h-10 w-10 ml-auto" />
        <div className="grid gap-6">
          <Skeleton className="h-10 w-full mt-4" />
          <Skeleton className="h-10 w-full mt-4" />
          <Skeleton className="h-10 w-full mt-4" />
        </div>
        <Image src={logo} alt="Logo" className="mt-auto mx-auto" />
      </aside>

      <div className="col-span-12 lg:col-span-8 xl:col-span-9 p-6 pb-16 flex flex-col overflow-hidden max-h-screen">
        <div className="flex gap-4 items-center font-semibold justify-end">
          Sort by
          <Skeleton className="h-12 w-[100px]" />
        </div>

        <div className="flex gap-4 items-center font-semibold">
          # trips found
          <Skeleton className="h-6 w-[100px]" />
        </div>

        <div className="overflow-auto grid gap-8 mt-4">
          {new Array(10).fill(0).map((_, index) => (
            <div
              className="flex border flex-wrap rounded-lg shadow-lg overflow-hidden w-full h-64"
              key={index}
            >
              <Skeleton className="h-full w-72" />
              <div className="flex-1 flex flex-col">
                <div className="p-4 flex-1">
                  <Skeleton className="h-12 w-full" />

                  <div className="mt-4 flex gap-4">
                    <Skeleton className="h-6 w-[200px]" />
                    <Skeleton className="h-6 w-[200px]" />
                    <Skeleton className="h-6 w-[200px]" />
                  </div>

                  <div className="mt-4 flex gap-4">
                    <Skeleton className="h-6 w-[100px]" />
                    <ArrowRight className="text-primary" />
                    <Skeleton className="h-6 w-[100px]" />
                    <ArrowRight className="text-primary" />
                    <Skeleton className="h-6 w-[100px]" />
                  </div>
                </div>

                <div className="mt-auto flex gap-4 justify-end h-16 bg-neutral-400 items-center p-4">
                  <Skeleton className="h-10 w-[120px]" />
                  <Skeleton className="h-8 w-[100px]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Skeleton className="h-20 w-[400px] mt-4" />
      </div>
    </section>
  )
}
