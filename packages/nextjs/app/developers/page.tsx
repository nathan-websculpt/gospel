"use client";

import { CardDisplay } from "./_components/CardDisplay";
import { NextPage } from "next";

const Developers: NextPage = () => {
  return (
    <>
      <div className="flex flex-col-reverse justify-between gap-6 xl:flex-row">
        <div className="flex flex-col gap-6 p-2 sm:p4 xl:p-10">
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            <CardDisplay
              isLocalOnlyFeature={false}
              localHref={"/add"}
              prodHref={"https://github.com/nathan-websculpt/gospel"}
              prodBadge={"View on GitHub"}
              imgSrc={"/img/mock_img/add_verses.png"}
              imgAlt={"add verses"}
              title={"Add Verses"}
              more={
                "Only users with special access can add new verses. Smart Contract will prevent you from adding more verses."
              }
            />

            <CardDisplay
              isLocalOnlyFeature={false}
              localHref={"/confirm"}
              prodHref={"https://github.com/nathan-websculpt/gospel"}
              prodBadge={"View on GitHub"}
              imgSrc={"/img/mock_img/confirm_verses.png"}
              imgAlt={"confirm verses"}
              title={"Confirm Verses"}
              more={"Looking at the source material? Pull up a verse, check it thoroughly, and confirm it onchain!"}
            />

            <CardDisplay
              isLocalOnlyFeature={false}
              localHref={"/debug"}
              prodHref={"https://github.com/nathan-websculpt/gospel"}
              prodBadge={"View on GitHub"}
              imgSrc={"/img/mock_img/debug_contract.png"}
              imgAlt={"debug contract"}
              title={"Debug Contract"}
              more={"Interact with all Smart Contract functionality in one place."}
            />

            <CardDisplay
              isLocalOnlyFeature={false}
              localHref={"/donate-dev"}
              prodHref={"https://github.com/nathan-websculpt/gospel"}
              prodBadge={"View on GitHub"}
              imgSrc={"/img/mock_img/donate_dev.png"}
              imgAlt={"donate"}
              title={"Donate"}
              more={"Test donating directly to Contract."}
            />

            <CardDisplay
              isLocalOnlyFeature={true}
              localHref={"/onchain-test"}
              prodHref={"https://github.com/nathan-websculpt/gospel"}
              prodBadge={"View on GitHub"}
              imgSrc={"/img/mock_img/test_contract.png"}
              imgAlt={"test contract"}
              title={"Test Contract"}
              more={"Bypass the subgraph to test the contract directly."}
            />

            <CardDisplay
              isLocalOnlyFeature={true}
              localHref={"/edit-mode"}
              prodHref={"https://github.com/nathan-websculpt/gospel"}
              prodBadge={"View on GitHub"}
              imgSrc={"/img/mock_img/edit_mode.png"}
              imgAlt={"contract management"}
              title={"Contract Management"}
              more={"Ahead of Production: To be used (by a council) to control stages of procedure."}
            />

            <CardDisplay
              isLocalOnlyFeature={true}
              localHref={"/fully-confirmed"}
              prodHref={"https://github.com/nathan-websculpt/gospel"}
              prodBadge={"View on GitHub"}
              imgSrc={"/img/mock_img/fully_confirmed.png"}
              imgAlt={"fully-confirmed verses"}
              title={"Fully Confirmed Verses"}
              more={"View verses that have already been confirmed by every member of the council."}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-6 p-2 sm:p4 xl:p-10">
        <p className="px-4 py-1 text-sm font-thin sm:text-md xl:text-xl bg-primary text-primary-content">
          CURRENT ENVIRONMENT:
          <span className="font-semibold text-md sm:text-xl xl:text-2xl"> {process.env.NEXT_PUBLIC_VERCEL_ENV}</span>
        </p>
      </div>
    </>
  );
};

export default Developers;
