"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function ListCard({ data, paramsRouter }: any) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handlePage = (page: number) => {
    setLoading(true)
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    setLoading(false);
  }, [paramsRouter]);
  return (
    <>
      {loading ? (
        <div>loading...........</div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-y-2">
            {data.data.map((e: any, i: number) => {
              return (
                <motion.div
                  initial={{ y: 20, x: 0, opacity: 0 }}
                  animate={{ y: 0, x: 0, opacity: 1 }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.5,
                    delay: i / 20,
                  }}
                  key={i}
                >
                  <Card data={e} />
                </motion.div>
              );
            })}
          </div>
          <div className="flex justify-center space-x-4 cursor-pointer">
            {[1, 2, 3, 4].map((e: number) => {
              return (
                <div
                  onClick={() => handlePage(e)}
                  className="border-[1px] border-[red] w-10 h-10 flex justify-center items-center rounded-md"
                  key={e}
                >
                  {e}
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default ListCard;
