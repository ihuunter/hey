import { STATIC_IMAGES_URL } from "@hey/data/constants";
import type { IGif } from "@hey/types/giphy";
import { useDebounce } from "@uidotdev/usehooks";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { Input } from "@/components/Shared/UI";
import Categories from "./Categories";
import Gifs from "./Gifs";

interface GifSelectorProps {
  setGifAttachment: (gif: IGif) => void;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const GifSelector = ({ setGifAttachment, setShowModal }: GifSelectorProps) => {
  const [searchText, setSearchText] = useState("");
  const debouncedGifInput = useDebounce<string>(searchText, 500);

  return (
    <>
      <div className="m-3">
        <Input
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search for GIFs"
          type="text"
          value={searchText}
        />
      </div>
      <div className="max-h-[45vh] overflow-y-auto">
        {debouncedGifInput ? (
          <Gifs
            debouncedGifInput={debouncedGifInput}
            setGifAttachment={setGifAttachment}
            setSearchText={setSearchText}
            setShowModal={setShowModal}
          />
        ) : (
          <Categories setSearchText={setSearchText} />
        )}
      </div>
      <div className="flex items-center space-x-2 p-3 text-sm">
        <b>Powered by</b>
        <img
          alt="Giphy"
          className="h-3"
          src={`${STATIC_IMAGES_URL}/brands/giphy.png`}
        />
      </div>
    </>
  );
};

export default GifSelector;
