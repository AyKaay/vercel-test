import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../lib";
import ItemCardSecond from "../components/ItemCardSecond";

const WatchList = () => {
  const [auctions, setAuctions] = useState([]);
  const userId = localStorage.getItem("userId");

  const imageMapping =
    "https://images.stockcake.com/public/0/7/1/0719c94d-4777-4030-9769-37f295ff3ff7/candlelight-serene-ambiance-stockcake.jpg";

  const getAuctions = async () => {
    try {
      const response = await axios.get(`${API_URL}/watchlist?userId=${userId}`);
      setAuctions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const navigate = useNavigate();

  useEffect(() => {
    getAuctions();
  }, []);

  // const handleCardClick = (auctionId) => {
  //   console.log("Card clicked with auctionId:", auctionId);
  //   // Anda bisa melakukan hal lain dengan auctionId di sini
  // };

  console.log("auctions", auctions);

  return (
    <div className="flex flex-col gap-3 items-center">
      <h2 className="text-2xl font-bold text-center mb-6">Watch List</h2>
      {/* <div className="grid grid-cols-3 gap-20"> */}
      <div className="gap-4 grid grid-cols-4 max-lg:grid-cols-2">
        {auctions.map((auction) => (
          <div
            className=""
            onClick={() => {
              localStorage.setItem("auctId", auction.id);
              localStorage.setItem("title", auction.title);
            }}
            key={auction.id}
          >
            <ItemCardSecond
              to={`/product`}
              name={auction.title}
              price={auction.startingPrice}
              src={
                imageMapping[auction.title] ||
                "https://images.stockcake.com/public/0/7/1/0719c94d-4777-4030-9769-37f295ff3ff7/candlelight-serene-ambiance-stockcake.jpg"
              }
            />
          </div>
        ))}
      </div>
    </div>
    // </div>
  );
};

WatchList.propTypes = {};

export default WatchList;
