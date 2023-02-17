import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheSearchResults } from "../utils/searchSlice";
import { toggleMenu } from "../utils/appSlice";

const Head = () => {
  const [searchText, setSearchText] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dispatch = useDispatch();
  const cachedSearchResults = useSelector((state) => state.search);

  const handleOnSearchChange = (e) => {
    console.log(e.target.value);
    setSearchText(e.target.value);
  };
  const fetchSuggestions = async () => {
    const url = YOUTUBE_SEARCH_API + searchText;
    const response = await fetch(url);
    const json = await response.json();
    setSearchSuggestions(json[1]);
    dispatch(cacheSearchResults({ [searchText]: json[1] }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cachedSearchResults[searchText]) {
        setSearchSuggestions(cachedSearchResults[searchText]);
      } else {
        fetchSuggestions();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  return (
    <div className="grid grid-flow-col p-5 shadow-lg">
      <div className="flex col-span-1 items-center">
        <img
          onClick={toggleMenuHandler}
          className="h-8 cursor-pointer mr-5"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0OBQgMAAWlpKQpJSaenZ309PUAAAAIAAD8/Pz5+fna2tqop6dvbW1oZmevrq4tKivFxMQYExRiYGC+vr7Dc4WrAAABB0lEQVR4nO3cS3LCMBAFQGIIIBPbhN/9jxqSyiIsTUnlydB9g1eSNV5MvdUKAAAAAAAAAAAAAAAAXtEwvscwDk3yHabSb2Loy/TRIOHUv8XRH+sHHMrSqR6U+hd1jHSE90P8lHC2/Lc0/0vzMy3WMdynxaFBwu+Jv4uh0cQHAAAAAAAAAIB59jG0ijdcT9sYTtcmK0PncumiuJRz/YD7bbf0ut4f3br+GvQt2PblrXrC3WbpUA/6sXrC/GeY/zvM/5aGmofHZiu0S//M/GoVDwAAAAAAAAAAZsjeuRerN1HL7hPy95fm76DNnzD/Lc3/0rxAJ3v+Xn0AAAAAAAAAAAAAAAD4T74AYhs1O+vt3ioAAAAASUVORK5CYII="
          alt="menu"
        />
        <a href="/">
          <img
            className="h-7"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
            alt="logo"
          />
        </a>
      </div>
      <div className="col-span-10 flex items-center">
        <input
          value={searchText}
          type="text"
          placeholder="Search"
          className="w-1/2 border border-gray-400 p-2 rounded-l-full h-8"
          onChange={handleOnSearchChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
        />
        <button className="border border-gray-400 px-5 rounded-r-full bg-gray-100 h-8 ">
          🔍 {String(showSuggestions)}
        </button>
      </div>
      {showSuggestions && (
          <div className="fixed bg-white py-2 px-2 w-[37rem] shadow-lg rounded-lg border border-gray-100">
            <ul>
              {searchSuggestions.map((s) => (
                <li key={s} className="py-2 px-3 shadow-sm hover:bg-gray-100">
                  🔍 {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      <div className="col-span-1">
        <img
          className="h-8"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          alt="user"
        />
      </div>
    </div>
  );
};

export default Head;
