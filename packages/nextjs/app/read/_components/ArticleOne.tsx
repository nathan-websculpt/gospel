import Link from "next/link";

export const ArticleOne = () => {
  return (
    <>
      <div className="flex self-center w-full">
        <article className="px-4 mx-auto mt-8 prose lg:prose-lg md:px-0">
          <h1 className="text-center">Gospel of John (KJV)</h1>
          <p>
            Should there be a full Bible on the blockchain?
            <span> </span>
            <Link href="/about" passHref className="link">
              Learn more
            </Link>{" "}
          </p>
        </article>
      </div>
    </>
  );
};
