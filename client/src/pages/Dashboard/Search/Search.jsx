import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults } from "../../../utils/redux/searchSlice";
import { setBgColor } from "../../../utils/redux/colorsSlice";
import ArtistResults from "../../../components/ArtistResults/ArtistResults";
import CategoryButton from "../../../components/CategoryButton/CategoryButton";
import TrackResults from "../../../components/TrackResults/TrackResults";
import Error from "../../../components/Error/Error";
import Loader from "../../../components/Loader/Loader";

const Search = ({ accessToken }) => {
 const { searchQuery, searchResults, status } = useSelector((state) => state.search);
 const [category, setCategory] = useState("track");
 const contentWrapper = useRef(null);
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(setBgColor({ R: 18, G: 18, B: 18 }));
 });

 useEffect(() => {
  if (accessToken && searchQuery && category) {
   dispatch(fetchSearchResults({ accessToken, searchQuery, category }));
  }
 }, [dispatch, accessToken, searchQuery, category]);

 const renderCategory = () => {
  const hasResults = (items) => items?.length > 0;

  switch (category) {
   case "track":
    return hasResults(searchResults.tracks?.items) ? (
     <TrackResults searchResults={searchResults} />
    ) : (
     <span className="text-muted mt-[72px] px-4">{searchQuery ? "No tracks found..." : ""}</span>
    );
   case "artist":
    return hasResults(searchResults.artists?.items) ? (
     <ArtistResults searchResults={searchResults} />
    ) : (
     <span className="text-muted mt-[72px] px-4">{searchQuery ? "No artists found..." : ""}</span>
    );
   default:
    return null;
  }
 };

 const renderContent = () => {
  switch (status) {
   case "loading":
    return <Loader />;
   case "error":
    return <Error />;
   case "success":
    return <>{renderCategory()}</>;
   default:
    return null;
  }
 };

 return (
  <div className="h-full overflow-hidden relative rounded-[10px] text-white flex flex-col bg-[#121212]">
   <div
    className="flex gap-2 p-2 sticky top-[72px]"
    ref={contentWrapper}
   >
    <CategoryButton
     category={category}
     setCategory={setCategory}
     name={"Artist"}
    />
    <CategoryButton
     category={category}
     setCategory={setCategory}
     name={"Track"}
    />
   </div>
   {renderContent()}
  </div>
 );
};

export default Search;
