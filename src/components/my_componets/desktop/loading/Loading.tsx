"use client";
import React from "react";
import style from "./Loading.module.scss";
import { useLoadingStore } from "@/store/loading.store";
import Image from "next/image";

type Props = {};

const Loading = (props: Props) => {
  const { isLoading } = useLoadingStore();

  return (
    <>
      {isLoading && (
        <div className={style.container}>
          <Image 
            src='/loading.png' 
            width={30}
            height={30}
            alt="Loading"
          />
        </div>
      )}
    </>
  );
};

export default Loading;
