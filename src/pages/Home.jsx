import { deferredSection } from "../components/DeferredSection";
import Hero from "../sections/Hero";
import Story from "../sections/Story";
import Facts from "../sections/Facts";
const Location = deferredSection("vi-tri", () => import("../sections/Location"));
const MasterPlan = deferredSection("tien-ich", () => import("../sections/MasterPlan"));
const FeaturedAmenities = deferredSection("tien-ich-noi-bat", () => import("../sections/FeaturedAmenities"));
const Residences = deferredSection("mat-bang", () => import("../sections/Residences"));
import SalesPolicy from "../sections/SalesPolicy";
const News = deferredSection("tin-tuc", () => import("../sections/News"));
import Legal from "../sections/Legal";
import Faq from "../sections/Faq";
import Register from "../sections/Register";
import { stories } from "../data/project";
import { hasRealNews } from "../data/news";

// Trang chủ = landing page tổng quan. Thứ tự: giới thiệu → vị trí → tiện ích → sản phẩm → khám phá → pháp lý → FAQ → đăng ký.
export default function Home() {
  return (
    <>
      <Hero />
      <Story data={stories[0]} />
      <Facts />
      <Story data={stories[1]} />
      <Location />
      <MasterPlan />
      <FeaturedAmenities />
      <Residences />
      <SalesPolicy />
      {/* Chưa có bài thật (còn bài mẫu) → ẩn section Tin tức trên trang chủ */}
      {hasRealNews() ? <News /> : null}
      <Legal />
      <Faq />
      <Register />
    </>
  );
}
