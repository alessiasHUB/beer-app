interface PageButtonProps {
  page: number;
  numBeersPerPage: number;
  filteredBeersRenderLen: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}

export default function PageButtons(props: PageButtonProps): JSX.Element {
  const {
    page,
    numBeersPerPage,
    filteredBeersRenderLen,
    handleNextPage,
    handlePreviousPage,
  } = props;

  if (page === 1) {
    if (filteredBeersRenderLen < numBeersPerPage) {
      return (
        <>
          <button disabled>{"<"}</button>
          <button className="page-btn">{page}</button>
          <button disabled>{">"}</button>
        </>
      );
    } else {
      return (
        <>
          <button disabled>{"<"}</button>
          <button className="page-btn">{page}</button>
          <button onClick={handleNextPage}>{">"}</button>
        </>
      );
    }
  } else {
    if (filteredBeersRenderLen === numBeersPerPage) {
      return (
        <>
          <button onClick={handlePreviousPage}>{"<"}</button>
          <button className="page-btn">{page}</button>
          <button onClick={handleNextPage}>{">"}</button>
        </>
      );
    } else {
      return (
        <>
          <button onClick={handlePreviousPage}>{"<"}</button>
          <button className="page-btn">{page}</button>
          <button disabled>{">"}</button>
        </>
      );
    }
  }
}
