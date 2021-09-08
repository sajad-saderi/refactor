import Link from "next/link";
import { FaqQuestions } from "./faqQuestions";
import { InsuranceGuide } from "./insuranceGuide";
import { AssuranceGuide } from "./assuranceGuide";
import { EvaluationGuide } from "./evaluationGuide";
import { GuestGuide } from "./guestGuide";
import { HostGuide } from "./hostGuide";
import { HowSeprisWorks } from "./howSeprisWorks";
import { GpsGuide } from "./gpsGuide";
import { PhotographyGuide } from "./photographyGuide";

const Site_map = () => {
  return (
    <div className="card_grid_contianer">
      <div className="guide_card first-card">
        <HowSeprisWorks />
      </div>
      <div className="guide_card">
        <GuestGuide />
      </div>
      <div className="guide_card">
        <HostGuide />
      </div>
      <div className="guide_card">
        <AssuranceGuide />
      </div>
      <div className="guide_card">
        <InsuranceGuide />
      </div>
      <div className="guide_card">
        <EvaluationGuide />
      </div>
      <div className="guide_card expand-card-3">
        <PhotographyGuide />
      </div>
      <div className="guide_card expand-card-4">
        <FaqQuestions />
      </div>
      <div className="guide_card ">
        <GpsGuide />
      </div>
    </div>
  );
};

export default Site_map;
