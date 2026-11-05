import Hero from "../sections/Hero";
import Story from "../sections/Story";
import Facts from "../sections/Facts";
import Location from "../sections/Location";
import MasterPlan from "../sections/MasterPlan";
import FeaturedAmenities from "../sections/FeaturedAmenities";
import Residences from "../sections/Residences";
import SalesPolicy from "../sections/SalesPolicy";
import News from "../sections/News";
import Legal from "../sections/Legal";
import Faq from "../sections/Faq";
import Register from "../sections/Register";
import { stories } from "../data/project";

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
      <News />
      <Legal />
      <Faq />
      <Register />
    </>
  );
}
