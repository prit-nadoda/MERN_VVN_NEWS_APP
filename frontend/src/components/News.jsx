import React, { useEffect, useState } from "react";
import { useCountries } from "use-react-countries";
import { Select, Option, SelectChangeEvent } from "@material-tailwind/react";

const News = () => {
  const { countries } = useCountries();
  const [country, setCountry] = useState("India");
  const [flag, setFlag] = useState("https://flagcdn.com/in.svg");

  return (
    <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
      <div className="w-full shadow-xl p-5 rounded-md flex justify-center align-center bg-[#f9f9f9]">
        <div className="flex gap-2 w-72 p-3 shadow-xl">
          <img
            className="h-[50px] w-[50px] rounded-full"
            src={flag}
            alt="Country Flag"
          />
          <select
            className="w-full p-3 bg-transparent outline-none flex align-center"
            onChange={(e) => {
              const conInfo = countries.find(
                (country) => country.name === e.target.value
              );
              setCountry(conInfo.name);
              setFlag(conInfo.flags.svg);
            }}
            value={country}
          >
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default News;
