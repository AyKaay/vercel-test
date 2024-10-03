import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL, formatNumberWithDots } from "../lib";
import ItemCardSecond from "../components/ItemCardSecond";

const TheCategory = () => {
  const [auctions, setAuctions] = useState([]);
  const id = localStorage.getItem("category");
  const getAuctions = async () => {
    try {
      const response = await axios.get(`${API_URL}/auctions?category=${id}`);
      setAuctions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAuctions();
  }, []);

  console.log("auctions", auctions);

  return (
    <div className=" flex flex-col gap-3 items-center">
      {auctions.length < 1 ? (
        <p>The Category</p>
      ) : (
        <p className="text-2xl font-bold mb-7">{auctions[0].category}</p>
      )}
      <div className="grid grid-cols-3 gap-4">
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
  );
};

TheCategory.propTypes = {};

export default TheCategory;
