import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { selectTopArtists } from "../../../../utils/redux/librarySlice";
import ArtistItem from "./ArtistItem";

const TopArtists = ({ width }) => {
 const topArtists = useSelector(selectTopArtists);

 return (
  <>
   {topArtists.map((artist) => (
    <ArtistItem
     key={artist.id || nanoid()}
     item={artist}
     width={width}
     path={`/artists/${artist.id}`}
    />
   ))}
  </>
 );
};
export default TopArtists;
