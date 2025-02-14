import Image from "next/image";
import React from "react";

function Card({ data }: any) {
  return (
    <div>
      <div className="text-[red]">
        <div className="h-[200px] w-[200px] flex justify-center overflow-hidden">
          <Image
            alt="fds"
            height={150}
            width={150}
            src={data.imageUrl}
            placeholder="blur"
            blurDataURL="blur"
            className="object-contain rounded-lg"
          />
        </div>
        <div className="truncate w-[200px]">{data.title}</div>
      </div>
      <br />
    </div>
  );
}

export default Card;
