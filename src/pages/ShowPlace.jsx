import { useSelector } from "react-redux";

const ShowPlace = () => {
  const selectedPlace = useSelector((state) => state.place.selectedPlace);

  return (
    <div>
      <h1>{selectedPlace}</h1>
    </div>
  );
};

export default ShowPlace;
