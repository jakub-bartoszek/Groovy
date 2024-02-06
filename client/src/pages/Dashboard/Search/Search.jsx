import { useEffect, useRef, useState } from "react";
import Loader from "../../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
 fetchSearchResults,
 selectSearchQuery,
 selectSearchResults,
 selectStatus
} from "../../../utils/redux/searchSlice";
import { setBgColor } from "../../../utils/redux/colorsSlice";
import ArtistResults from "../../../components/ArtistResults/ArtistResults";
import CategoryButton from "../../../components/CategoryButton/CategoryButton";
import TrackResults from "../../../components/TrackResults/TrackResults";

const Search = ({ accessToken }) => {
 const searchQuery = useSelector(selectSearchQuery);
 const searchResults = useSelector(selectSearchResults);
 const status = useSelector(selectStatus);
 const [category, setCategory] = useState("track");
 const contentWrapper = useRef(null);
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(setBgColor({ R: 18, G: 18, B: 18 }));
 });

 useEffect(() => {
  if (accessToken && searchQuery && category) {
   dispatch(
    fetchSearchResults({
     accessToken: accessToken,
     searchQuery: searchQuery,
     category: category
    })
   );
  }
 }, [dispatch, searchQuery, accessToken, category]);

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
   {
    {
     loading: (
      <div className="h-full flex items-center justify-center">
       <Loader />
      </div>
     ),
     error: <>Error</>,
     success: (
      <>
       {
        {
         track:
          searchResults.tracks?.items.length > 0 ? (
           <TrackResults searchResults={searchResults} />
          ) : searchQuery ? (
           <span className="text-muted mt-[72px] px-4">No tracks found...</span>
          ) : (
           <></>
          ),
         artist:
          searchResults.artists?.items.length > 0 ? (
           <ArtistResults searchResults={searchResults} />
          ) : searchQuery ? (
           <span className="text-muted mt-[72px] px-4">No artists found...</span>
          ) : (
           <></>
          )
        }[category]
       }
      </>
     )
    }[status]
   }
  </div>
 );
};

export default Search;
