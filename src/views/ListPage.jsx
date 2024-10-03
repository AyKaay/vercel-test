import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL, formatNumberWithDots } from "../lib";
import ItemCardSecond from "../components/ItemCardSecond";
// import { ItemCard } from "./homepage";

const ListPage = () => {
  const [auctions, setAuctions] = useState([]);

  const getAuctions = async () => {
    try {
      const response = await axios.get(`${API_URL}/auctions`);
      setAuctions(response.data.reverse());
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
      <h2 className="text-2xl font-bold text-center mb-6">Product List</h2>
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
              price={formatNumberWithDots(auction.startingPrice)}
              src={auction.image}
              status={auction.status}
            />
          </div>
        ))}
      </div>
    </div>
    // </div>
  );
};

ListPage.propTypes = {};

export default ListPage;
