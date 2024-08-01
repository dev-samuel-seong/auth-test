"use client";

import { useEffect, useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import style from "./address.module.scss";

export type AddressDataType = {
  address: string;
  bname: string;
  jibunAddress: string;
  roadAddress: string;
  userSelectedType: string;
  zonecode: string;
};

export const defaultAddressData = {
  address: "",
  bname: "",
  jibunAddress: "",
  roadAddress: "",
  userSelectedType: "",
  zonecode: "",
};

// interface AddressProps {
//   mainAddress: string;
//   setMainAddress: (value: string) => void;
//   subAddress: string;
//   setSubAddress: (value: string) => void;
//   zonecode: string;
//   setZonecode: (value: string) => void;
// }

export default function Address() {
  //   const {
  //     mainAddress,
  //     setMainAddress,
  //     subAddress,
  //     setSubAddress,
  //     zonecode,
  //     setZonecode,
  //   } = props;
  const [addressData, setAddressData] =
    useState<AddressDataType>(defaultAddressData);

  const [mainAddress, setMainAddress] = useState<string>("");
  const [subAddress, setSubAddress] = useState<string>("");
  const [zonecode, setZonecode] = useState<string>("");

  const [isOpen, setIsOpen] = useState(false);
  const daumPostcodeStyle = {
    width: "400px",
    height: "600px",
    border: "1.4px solid #333333",
  };

  const completeHandler = (data: any) => {
    console.log(data);
    setAddressData(data);
  };

  const closeHandler = (state: any) => {
    if (state === "FORCE_CLOSE") {
      setIsOpen(false);
    } else if (state === "COMPLETE_CLOSE") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (addressData.userSelectedType === "R") {
      setMainAddress(addressData.roadAddress);
    } else {
      setMainAddress(addressData.jibunAddress);
    }
    setZonecode(addressData.zonecode);
  }, [addressData]);

  return (
    <div className={style["address-container"]}>
      <div className={style["zonecode-wrap"]}>
        <input className={style["zone"]} value={zonecode} readOnly />
        <button
          className={style["search-button"]}
          onClick={() => setIsOpen(true)}>
          우편번호 찾기
        </button>
      </div>
      <input className={style["address"]} value={mainAddress} readOnly />
      <input
        className={style["address"]}
        value={subAddress}
        onChange={(e) => setSubAddress(e.target.value)}
      />
      {isOpen ? (
        <div className={style["modal-background"]}>
          <div className={style["modal"]}>
            <span onClick={() => setIsOpen(false)}>닫기</span>
            <DaumPostcodeEmbed
              style={daumPostcodeStyle}
              onComplete={completeHandler}
              onClose={closeHandler}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
