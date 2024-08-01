"use client";

import { useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import style from "./carousel.module.scss";

export default function Carousel() {
  const [currIdx, setCurrIdx] = useState<number>(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null
  );

  const clickNavigationButton = (type: "prev" | "next") => {
    if (type === "prev") {
      swiperInstance?.navigation?.prevEl.click();
      const prevIdx = swiperInstance?.realIndex!;
      setCurrIdx(prevIdx);
    } else {
      swiperInstance?.navigation?.nextEl.click();
      const nextIdx = swiperInstance?.realIndex!;
      setCurrIdx(nextIdx);
    }
  };

  return (
    <div className={style["carousel"]}>
      <Swiper
        className={style["swiper"]}
        modules={[Navigation, Pagination, Autoplay, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={true}
        pagination={{ clickable: true }}
        onAutoplay={(e: SwiperClass) => {
          setCurrIdx(e.realIndex);
        }}
        onSlideChange={(e: SwiperClass) => {
          setCurrIdx(e.realIndex);
        }}
        onSwiper={(swiper) => setSwiperInstance(swiper)}>
        <SwiperSlide className={style["swiper-slide"]}>
          <div className={style["red"]}></div>
        </SwiperSlide>
        <SwiperSlide className={style["swiper-slide"]}>
          <div className={style["green"]}></div>
        </SwiperSlide>
        <SwiperSlide className={style["swiper-slide"]}>
          <div className={style["blue"]}></div>
        </SwiperSlide>
        <NavigationButtonsWrap
          currIdx={currIdx}
          total={3}
          onClickNavigationButton={clickNavigationButton}
        />
      </Swiper>
    </div>
  );
}

interface NavigationButtonsWrapProps {
  currIdx: number;
  total: number;
  onClickNavigationButton: (type: "prev" | "next") => void;
}

const NavigationButtonsWrap = ({
  currIdx,
  total,
  onClickNavigationButton,
}: NavigationButtonsWrapProps) => {
  return (
    <div className={style["navigation-buttons-container"]}>
      <NavigationButton
        type="prev"
        onClick={() => onClickNavigationButton("prev")}
      />
      {`${currIdx + 1}/${total}`}
      <NavigationButton
        type="next"
        onClick={() => onClickNavigationButton("next")}
      />
    </div>
  );
};

type NavigationType = "prev" | "next";

interface NavigationButtonProps {
  type: NavigationType;
  disabled?: boolean;
  onClick: () => void;
}

const NavigationButton = ({
  type,
  disabled,
  onClick,
}: NavigationButtonProps) => {
  return (
    <div
      className={style["navigation-button"]}
      style={{
        pointerEvents: disabled ? "none" : "auto",
      }}
      onClick={onClick}>
      {type === "prev" ? <span>이전</span> : <span>다음</span>}
    </div>
  );
};
