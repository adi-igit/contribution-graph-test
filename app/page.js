import ContributionGraph from "@/components/ContributionGraph";
import React from "react";

const Home = () => {
  return (
    <>
      <main className="p-32">
        <ul className="flex justify-between text-sm gap-14 lg:gap-0 lg:w-[90%] mb-1 text-gray-500">
          <li>Авг.</li>
          <li>Сент.</li>
          <li>Окт.</li>
          <li>Нояб.</li>
          <li>Дек.</li>
          <li>Янв.</li>
          <li>Март.</li>
          <li>Апр.</li>
          <li>Мая.</li>
          <li>Июнь.</li>
          <li>Июль.</li>
          <li>Авг.</li>
        </ul>
        <ul className="absolute left-[100px] text-sm text-gray-500">
          <li className="mt-[18px]">Пн</li>
          <li className="mt-[22px]">Ср</li>
          <li className="mt-[20px]">Пт</li>
        </ul>
        <ContributionGraph />
        <div className="mt-5 flex items-center text-[12px]">
          <span className="text-[#959494] mr-2">Меньше</span>
          <div className="flex">
            <div className="w-4 h-4 m-0.5 bg-[#EDEDED]" />
            <div className="w-4 h-4 m-0.5 bg-[#ACD5F2]" />
            <div className="w-4 h-4 m-0.5 bg-[#7FA8C9]" />
            <div className="w-4 h-4 m-0.5 bg-[#527BA0]" />
            <div className="w-4 h-4 m-0.5 bg-[#254E77]" />
          </div>
          <span className="text-[#959494] ml-2">Больше</span>
        </div>
      </main>
    </>
  );
};

export default Home;
