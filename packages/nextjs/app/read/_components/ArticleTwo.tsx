import Link from "next/link";

export const ArticleTwo = () => {
  return (
    <>
      <article className="px-4 mx-auto mt-8 mb-12 prose lg:prose-lg md:px-0">
        <p>
          Can not currently confirm that this proof-of-concept properly represents The Gospel of John (KJV) [neither
          in-part, nor in-full].
        </p>
        <blockquote>
          But, that is the point of this project. You can
          <span> </span>
          <Link href="/confirm" passHref className="link">
            confirm verses onchain,
          </Link>{" "}
          and if that isn't enough &mdash; let's discuss
          <span> </span>
          <Link href="/about" passHref className="link">
            what projects like this will look like in the future.
          </Link>{" "}
        </blockquote>
      </article>
    </>
  );
};
