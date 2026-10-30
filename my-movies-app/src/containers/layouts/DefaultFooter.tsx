function DefaultFooter() {
  return (
    <>
      <div className="bg-bg-primary text-primary-txt ">
        <div className="py-8" style={{ width: 950, margin: "0 auto" }}>
          <ul className="flex flex-row gap-4 pb-4">
            <li>About</li>
            <li>Pro</li>
            <li>News</li>
            <li>Apps</li>
            <li>Help</li>
            <li>Year in Review</li>
            <li>Gifts</li>
            <li>Terms</li>
            <li>API</li>
            <li>Contact</li>
          </ul>
          <span className="text-primary-txt/50 font-light">
            © MovieCenter Limited. Made by a cinephile in Hanoi, Vietnam. Film
            data from{" "}
            <a
              href="https://www.themoviedb.org/"
              className="underline hover:text-primary-txt"
              rel="noopener noreferrer"
              target="_blank"
            >
              TMDB
            </a>
            . Privacy. Mobile site.
          </span>
        </div>
      </div>
    </>
  );
}

export default DefaultFooter;
