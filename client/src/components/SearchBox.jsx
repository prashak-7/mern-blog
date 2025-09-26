import { useState } from "react";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { RouteSearch } from "@/helpers/RouteName";

const SearchBox = () => {
  const [query, setQuery] = useState();
  const navigate = useNavigate();

  const getInput = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(RouteSearch(query));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="query"
        onInput={getInput}
        placeholder="Search here..."
        className="h-9 rounded-full bg-gray-50"
      />
    </form>
  );
};

export default SearchBox;
