import { useEffect, useContext, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { addressfn, deleteAddress, getAddress, editAddress } from "@/lib/api";
import { toast } from "sonner";
import { Trash2, Pencil } from "lucide-react";
import UserContext from "./Context/ContextApi";

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [formState, setFormState] = useState(false);
  const [loader, setLoader] = useState(false);
  // const [selectedAddress, setSelectedAddress] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);

  // Form input states
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const { selectedAddress, setSelectedAddress } = useContext(UserContext);

  const fetchAddresses = async () => {
    try {
      const res = await getAddress();
      setAddresses(res.message);
    } catch (err) {
      toast.error("Failed to fetch addresses");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [formState, loader]);

  const addNewButton = () => {
    // Reset editing state and form when adding new
    setEditingAddress(null);
    setFormState(!formState);

    // Clear input states
    setAddressLine("");
    setCity("");
    setState("");
    setPostalCode("");
    setCountry("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addressData = {
      addressLine,
      city,
      state,
      postalCode,
      country,
    };

    try {
      if (editingAddress) {
        // Update existing address
        await editAddress(editingAddress, addressData);
        toast.success("Address Updated Successfully");
      } else {
        // Add new address
        await addressfn(addressData);
        toast.success("Address Added Successfully");
      }

      // Reset form state
      setFormState(false);
      setEditingAddress(null);
    } catch (error) {
      toast.error(error?.message || "Failed to save address");
    }
  };

  const deleteButtonHandler = async (id) => {
    try {
      await deleteAddress(id);
      toast.success("Address Deleted");
      setLoader(!loader);
    } catch (error) {
      toast.error("Failed to delete address");
    }
  };

  const selectedOne = (e) => {
    setSelectedAddress(addresses.find((addr) => addr._id === e.target.value));
  };

  const editHandler = (addr) => {
    // Set form state to true
    setFormState(true);

    // Set the editing address ID
    setEditingAddress(addr._id);

    // Populate input states with existing address data
    setAddressLine(addr.addressLine);
    setCity(addr.city);
    setState(addr.state);
    setPostalCode(addr.postalCode);
    setCountry(addr.country);
  };

  const cancelEdit = () => {
    // Reset form state and clear inputs
    setFormState(false);
    setEditingAddress(null);

    // Clear input states
    setAddressLine("");
    setCity("");
    setState("");
    setPostalCode("");
    setCountry("");
  };

  return (
    <div className="container mx-auto my-8  bg-black text-white">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-xl text-white">
            {editingAddress ? "Edit Address" : "My Addresses"}
          </CardTitle>
          <Button
            variant="outline"
            onClick={addNewButton}
            className="hover:bg-gray-800"
          >
            Add new Address
          </Button>
        </CardHeader>
        <Separator className="mb-2 bg-gray-700" />
        <CardContent>
          {formState ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="addressLine" className="text-gray-300">
                  Address Line
                </Label>
                <Input
                  id="addressLine"
                  name="addressLine"
                  type="text"
                  placeholder="Address Line"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  required
                  className="bg-gray-800 text-white border-gray-700"
                />
              </div>
              <div>
                <Label htmlFor="city" className="text-gray-300">
                  City
                </Label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="bg-gray-800 text-white border-gray-700"
                />
              </div>
              <div>
                <Label htmlFor="state" className="text-gray-300">
                  State
                </Label>
                <Input
                  id="state"
                  name="state"
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  className="bg-gray-800 text-white border-gray-700"
                />
              </div>
              <div>
                <Label htmlFor="postalCode" className="text-gray-300">
                  Postal Code
                </Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                  className="bg-gray-800 text-white border-gray-700"
                />
              </div>
              <div>
                <Label htmlFor="country" className="text-gray-300">
                  Country
                </Label>
                <Input
                  id="country"
                  name="country"
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  className="bg-gray-800 text-white border-gray-700"
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {editingAddress ? "Update Address" : "Submit Address"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={cancelEdit}
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div>
              {addresses.length > 0 ? (
                <RadioGroup>
                  {addresses.map((addr) => (
                    <div
                      key={addr._id}
                      className="flex relative items-center space-x-2 m-1 p-2 bg-gray-800 rounded-md"
                    >
                      <RadioGroupItem
                        onClick={selectedOne}
                        value={`${addr._id}`}
                        id={`${addr._id}`}
                        className="border-white"
                      />
                      <Label
                        htmlFor={`${addr._id}`}
                        className="text-gray-200 py-3"
                      >
                        {addr.addressLine}, {addr.city}, {addr.state},{" "}
                        {addr.postalCode}, {addr.country}
                      </Label>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-14"
                        onClick={() => editHandler(addr)}
                      >
                        <Pencil />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute right-2 bg-red-600 hover:bg-red-700"
                        onClick={() => deleteButtonHandler(addr._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="text-gray-400">No addresses</div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AddressPage;
