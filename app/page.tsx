import FormBuilder from "@/components/Form/FormBuilder";
import { formConfig } from "@/config/formConfig";
import Calendar from "@/components/Calendar";
import Image from "next/image";
import HeroImage1 from "@/assets/images/DSC02204.jpg";
import HeroImage2 from "@/assets/images/DSC02215.jpg";
import HeroImage3 from "@/assets/images/DSC02873.jpg";
import SectionImage1 from "@/assets/images/DSC02653.jpg";
import SectionImage2 from "@/assets/images/DSC02676.jpg";
import SectionImage3 from "@/assets/images/DSC01896.jpg";
import SectionImage4 from "@/assets/images/DSC01872.jpg";
import SectionImage5 from "@/assets/images/DSC02323.jpg";
import SectionImage6 from "@/assets/images/DSC02862.jpg";

import SmallSmimleFace from "@/assets/icons/small_smile_face.svg";
import HeartBeat from "@/assets/icons/heart_beat.svg";
import Sparkle from "@/assets/icons/sparkle.webp";
import Sparkles from "@/assets/icons/sparkles.svg";
import Heart from "@/assets/icons/heart.svg";
import Hands from "@/assets/icons/hands.svg";
import Rings from "@/assets/icons/rings.svg";

export default function HomePage() {
  return (
    <main>
      <section className="flex items-center justify-center px-4 py-15 bg-wedding-hero">
        <div className="w-full grid grid-cols-12 gap-6">
          <div className="lg:col-span-7 gap-12 flex items-center flex-col col-span-12 p-5">
            <h1 className="text-8xl whitespace-nowrap -rotate-8 mb-12 text-black text-shadow-[6px_6px_0px_rgba(0,0,0,0.2)]">
              鎧瑋＆司婷
            </h1>
            <h2 className="text-5xl text-white text-shadow-[0px_0px_12px_yellow]">
              We're Saying " I DO "
            </h2>
            <div className="flex w-full max-lg:flex-wrap items-center justify-center gap-8 p-5">
              <div className="w-62 h-50 shrink-0 rounded-xl overflow-hidden relative">
                <Image
                  src={HeroImage1}
                  alt="Hero Image 1"
                  width={2000}
                  height={1333}
                  className="size-full scale-180 object-cover -translate-y-8 rotate-[1.1deg] translate-x-2"
                />
                <Image
                  src={Sparkle}
                  alt="Sparkle"
                  width={182}
                  height={140}
                  className="absolute w-6 top-2 right-2 object-cover"
                />
              </div>

              <div className="w-62 h-50 shrink-0 rounded-xl overflow-hidden relative">
                <Image
                  src={HeroImage2}
                  alt="Hero Image 2"
                  width={2000}
                  height={1333}
                  className="size-full scale-162 object-cover -translate-y-11 -translate-x-6 -rotate-[1.5deg]"
                />
                <Image
                  src={HeartBeat}
                  alt="Heart Beat"
                  width={182}
                  height={140}
                  className="absolute w-16 bottom-1/2 mb-4 left-1/2 -translate-x-1/2 object-cover"
                />
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 col-span-12 flex items-center justify-center p-5">
            <div className="relative">
              <div className=" max-w-125 max-h-140 w-80/100 rounded-full border border-solid border-yellow-900 overflow-hidden outline-offset-8 outline-1 outline-yellow-900">
                <Image
                  src={HeroImage3}
                  alt="Hero Image 3"
                  width={1333}
                  height={2000}
                  className="size-full object-cover"
                />
              </div>
              <Image
                src={Sparkles}
                alt="Sparkles"
                width={182}
                height={140}
                className="absolute w-16 -top-8 right-8 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex items-center flex-col gap-12 w-full justify-center px-4 py-15 bg-wedding-bg">
        <h2 className="text-6xl text-black italic tracking-wider">
          Welcome to the Wedding
        </h2>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="col-span-1 flex flex-col justify-center gap-12">
            <p className="text-black text-2xl/12 tracking-wider">
              兩個人選擇彼此，也選擇一起成長
              <br />
              婚姻是一段新的旅程
              <br />
              我們願意在歲月裡互相扶持
              <br />
              在歡笑與挑戰中並肩前行
            </p>
            <p className="text-black text-2xl/12 tracking-wider relative">
              願今天的祝福
              <br />
              成為未來每一天的力量
              <Image
                src={SmallSmimleFace}
                alt="Small Smile Face"
                width={182}
                height={140}
                className="absolute w-24 -top-10 right-0 object-cover"
              />
            </p>
          </div>
          <div className="col-span-1 flex flex-col gap-8">
            <div className="h-45 aspect-auto overflow-hidden lg:pr-10">
              <Image
                src={SectionImage1}
                alt="Section Image 1"
                width={2000}
                height={1333}
                className="size-full object-cover"
              />
            </div>
            <div className="h-45 aspect-auto overflow-hidden lg:pl-10">
              <Image
                src={SectionImage2}
                alt="Section Image 2"
                width={2000}
                height={1333}
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex items-center lg:flex-row flex-col justify-center px-4 py-15 bg-wedding-bg">
        <div className="w-70 h-105 overflow-hidden">
          <Image
            src={SectionImage3}
            alt="Section Image 3"
            width={1333}
            height={2000}
            className="size-full object-cover"
          />
        </div>

        <div className="col-span-1 flex flex-col items-center justify-center p-5">
          <p className="text-black text-2xl/12 tracking-wider text-center">
            感謝父母的養育與成全
            <br />
            感謝朋友一路相伴與祝福
            <br />
            因為有你們，我們更懂得珍惜彼此
            <br />
          </p>
          <div className="flex items-center">
            <Image
              src={Hands}
              alt="Hands Icon"
              width={70}
              height={80}
              className="w-15 object-cover"
            />
            <Image
              src={Rings}
              alt="Rings Icon"
              width={80}
              height={60}
              className="w-15 object-cover"
            />
          </div>
          <p className="text-black text-2xl/12 tracking-wider text-center">
            以愛為名，以承諾為約
            <br />
            攜手走進人生的新階段
            <br />
            <span className="relative">
              誠摯邀請您來見證
              <Image
                src={Heart}
                alt="Heart Icon"
                width={24}
                height={24}
                className="absolute w-6 top-3 -right-8 object-cover"
              />
            </span>
          </p>
        </div>
        <div className="w-70 h-105 overflow-hidden">
          <Image
            src={SectionImage4}
            alt="Section Image 4"
            width={1333}
            height={2000}
            className="size-full object-cover"
          />
        </div>
      </section>

      <section className="flex items-center justify-center px-4 py-15 bg-wedding-bg">
        <div className="w-full grid grid-cols-12 gap-6">
          <div className="lg:col-span-7 gap-12 flex flex-col col-span-12 p-10">
            <h2 className="text-8xl text-black font-bold">05/30</h2>
            <Calendar year={2026} month={5} date={30} />
          </div>
          <div className="lg:col-span-5 col-span-12 flex items-center justify-center p-5">
            <div className="w-75 overflow-hidden">
              <Image
                src={SectionImage5}
                alt="Section Image 5"
                width={2000}
                height={1333}
                className="size-full object-cover"
              />
            </div>
            <div className="w-75 overflow-hidden">
              <Image
                src={SectionImage6}
                alt="Section Image 6"
                width={1333}
                height={2000}
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center px-4 py-15 bg-wedding-bg">
        <div className="grid lg:grid-cols-2 cols-span-1 gap-12 p-5">
          <div className="col-span-1 flex flex-col text-black">
            <h2 className="text-6xl font-bold tracking-wider mb-6">
              駿崗日式創意料理
            </h2>
            <p className="text-2xl tracking-wider leading-16">
              時間：2026年05月30日（六）12:00準時開席
            </p>
            <p className="text-2xl tracking-wider leading-16">
              地點：521彰化縣北斗鎮光中路155號
            </p>
            <p className="text-2xl tracking-wider leading-16 mt-6">交通方式</p>
            <p className="text-2xl tracking-wider leading-16">
              高鐵：搭乘至彰化高鐵站後再搭乘計程車前往
            </p>
            <p className="text-2xl tracking-wider leading-16">
              開車：餐廳備有停車場，可開車前來停放
            </p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <iframe
              src="https://maps.google.com/maps?q=521%E5%BD%B0%E5%8C%96%E7%B8%A3%E5%8C%97%E6%96%97%E9%8E%AE%E5%85%89%E4%B8%AD%E8%B7%AF155%E8%99%9F&hl=zh-TW&output=embed&z=16"
              className="w-full h-96 rounded-2xl border-0 shadow-lg"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="駿崗日式創意料理位置地圖"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Section 6 – 出席確認表單 */}
      <section className="px-4 py-15 bg-wedding-bg">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-8 text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-800">
              {formConfig.title}
            </h1>
            {formConfig.description && (
              <p className="text-lg text-gray-500">{formConfig.description}</p>
            )}
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <FormBuilder />
          </div>
        </div>
      </section>
    </main>
  );
}
