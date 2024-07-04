import { hardhat } from "viem/chains";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

interface CardProps {
  isLocalOnlyFeature: boolean;
  localHref: string;
  prodHref: string;
  prodBadge: string;
  imgSrc: string;
  imgAlt: string;
  title: string;
  more: string;
}

export const CardDisplay = ({
  isLocalOnlyFeature, //currently means it is a feature that is not in PROD
  localHref,
  prodHref,
  prodBadge,
  imgSrc,
  imgAlt,
  title,
  more,
}: CardProps) => {
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;
  return (
    <>
      <a
        className={`${
          isLocalOnlyFeature && isLocalNetwork
            ? "bg-primary bg-opacity-40"
            : "transition-all duration-200 hover:bg-primary hover:-translate-y-1"
        } card card-compact`}
        href={`${(isLocalOnlyFeature && isLocalNetwork) || !isLocalOnlyFeature ? localHref : prodHref}`}
        target={`${(isLocalOnlyFeature && isLocalNetwork) || !isLocalOnlyFeature ? "_self" : "_blank"}`}
      >
        <figure className="px-4 pt-4">
          <img
            loading="lazy"
            className="border rounded-lg border-base-content bg-base-300 border-opacity-5"
            alt={imgAlt}
            src={imgSrc}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {title}
            {isLocalOnlyFeature && !isLocalNetwork && (
              <span className="badge badge-xs md:badge-sm xl:badge-md badge-warning">in dev</span>
            )}
          </h2>
          <p className="text-sm sm:text-md xl:text-lg opacity-80">{more}</p>
          {isLocalOnlyFeature && !isLocalNetwork && (
            <div className="flex flex-col-reverse gap-3 lg:justify-between xl:flex-row xl:gap-5 xl:items-center">
              <progress className="w-full xl:w-56 progress"></progress>
              <span className="badge badge-sm xl:badge-lg badge-warning">{prodBadge}</span>
            </div>
          )}
        </div>
      </a>
    </>
  );
};
