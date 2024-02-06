import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { selectTopTracks } from "../../../../utils/redux/librarySlice";
import TopTrackItem from "./TopTrackItem";

const TopTracks = ({ width }) => {
 const topTracks = useSelector(selectTopTracks);

 return topTracks.map((track) => (
  <TopTrackItem
   key={track.id || nanoid()}
   item={track}
   width={width}
  />
 ));
};

export default TopTracks;
