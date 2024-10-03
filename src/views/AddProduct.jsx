import axios from "axios";
import { useEffect, useState } from "react";
import {
  Input,
  Textarea,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { InputIcon, CalendarIcon } from "../assets/Icons";
import { Toaster, toast } from "sonner";
import { API_URL } from "../lib";
import { NumericFormat } from "react-number-format";

function CreateAuction() {
  //states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState(null);
  const [userId, setUserId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("active");
  const [category, setCategory] = useState("others");
  const [condition, setCondition] = useState("New");

  // fungsi untuk input harga

  const logId = localStorage.getItem("logged");

  const getUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/users?email=${logId}`);
      if (response.data.length > 0) {
        setUserId(response.data[0].id);
        console.log("response.data", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Membuat objek data lelang
    const newAuction = {
      title,
      userId,
      description,
      startingPrice, // fungsi clean dimasukin sebagai nilai properti
      startDate,
      endDate,
      status,
      category,
      condition,
    };

    axios
      .post("http://localhost:5000/auctions", newAuction)
      .then((response) => {
        console.log("Auction created successfully!", response.data);

        // Menampilkan toast sukses
        toast.success("Successfully Created!!");

        setTitle("");
        setDescription("");
        setStartingPrice(0);
        setStartDate("");
        setEndDate("");
      })
      .catch((error) => {
        console.error("There was an error creating the auction!", error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log("userId", userId);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Toaster position="top-right" richColors /> {/* Menambahkan Toaster */}
      <div className="max-w-lg w-full p-10 shadow-lg rounded-lg shadow-blue-500">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create New Auction
        </h2>

        <form onSubmit={handleSubmit}>
          {/* User ID Dropdown */}
          <div className="mb-4">
            <input readOnly className="hidden" value={userId}></input>
          </div>

          {/* Title */}
          <div className="mb-4">
            <Input
              isRequired
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Auction Title"
              labelPlacement="outside"
              startContent={<InputIcon className="text-2xl text-default-400" />}
              size="lg"
              radius="lg"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <Textarea
              isRequired
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter your description"
              labelPlacement="outside"
              size="lg"
              radius="lg"
            />
          </div>

          {/* Starting Price */}
          <div className="mb-4">
            <Input
              isRequired
              label="Starting Price"
              value={startingPrice}
              type="number"
              //tipe data harus nummber!!!
              onChange={(e) => setStartingPrice(e.target.value)}
              labelPlacement="outside"
              startContent={<div className="text-default-400">Rp</div>}
              size="lg"
              radius="lg"
            />
          </div>
          <NumericFormat
            value={startingPrice}
            thousandSeparator=","
            decimalSeparator="."
            onValueChange={(values) => {
              setStartingPrice(values.value); // Mengatur nilai tanpa format ke dalam state
            }}
            placeholder="Enter price"
            allowNegative={false}
            isNumericString
          />
          {/* Start Date */}
          <div className="mb-4">
            <Input
              isRequired
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              labelPlacement="outside"
              startContent={
                <CalendarIcon className="text-2xl text-default-400" />
              }
              size="lg"
              radius="lg"
            />
          </div>

          {/* End Date */}
          <div className="mb-4">
            <Input
              isRequired
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              labelPlacement="outside"
              startContent={
                <CalendarIcon className="text-2xl text-default-400" />
              }
              size="lg"
              radius="lg"
            />
          </div>

          {/* Status Dropdown */}
          <div className="mb-4 hidden">
            <label>Status</label>
            <Dropdown backdrop="blur">
              <DropdownTrigger>
                <Button variant="bordered" className="w-full text-left">
                  {status}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                variant="faded"
                aria-label="Status Options"
                onAction={(key) => setStatus(key)}
              >
                <DropdownItem key="active">Active</DropdownItem>
                <DropdownItem key="inactive">Inactive</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Category Dropdown */}
          <div className="mb-4">
            <label>Category</label>
            <Dropdown backdrop="blur">
              <DropdownTrigger>
                <Button variant="bordered" className="w-full text-left">
                  {category}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                variant="faded"
                aria-label="Category Options"
                onAction={(key) => setCategory(key)}
              >
                <DropdownItem key="Electronics">Electronics</DropdownItem>
                <DropdownItem key="Fashion & Accessories">
                  Fashion & Accessories
                </DropdownItem>
                <DropdownItem key="Automotive">Automotive</DropdownItem>
                <DropdownItem key="Jewelry & Watches">
                  Jewelry & Watches
                </DropdownItem>
                <DropdownItem key="Real Estate">Real Estate</DropdownItem>
                <DropdownItem key="Home & Furniture">
                  Home & Furniture
                </DropdownItem>
                <DropdownItem key="Others">Others</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Condition Dropdown */}
          <div className="mb-4">
            <label>Condition</label>
            <Dropdown backdrop="blur">
              <DropdownTrigger>
                <Button variant="bordered" className="w-full text-left">
                  {condition}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                variant="faded"
                aria-label="Condition Options"
                onAction={(key) => setCondition(key)}
              >
                <DropdownItem key="New">New</DropdownItem>
                <DropdownItem key="Used">Used</DropdownItem>
                <DropdownItem key="Like New">Like New</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Checkbox Tidak diperlukan*/}
          {/* <div className="flex flex-col gap-2 mb-4">
            <Checkbox
              isSelected={isSelected}
              onChange={() => {
                setIsSelected(!isSelected);
                setIsCheckboxError(false); // reset error saat checkbox diubah
              }}
              // jika error, jadi border merah
              style={{
                borderColor: isCheckboxError ? "red" : "",
                color: isCheckboxError ? "red" : "",
              }}
            >
              Syarat dan Ketentuan
            </Checkbox>
            {isCheckboxError && ( // tambah argumen lagi
              <p className="text-red-500 text-sm">Setujui S&K!!</p>
            )}
          </div> */}

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            color="primary"
            variant="shadow"
          >
            Create Auction
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateAuction;
