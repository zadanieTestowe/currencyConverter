import axios from "axios";

const CONVERT_URL =
  "https://api.currencybeacon.com/v1/convert?api_key=wOaB3DNGN9CleUy4OgtCIgsGbR0xeIQK";

type TConvertCurrencies = {
  from: string;
  to: string;
  amountToConvert: number;
};

export const convertCurrencies = ({
  from,
  to,
  amountToConvert,
}: TConvertCurrencies) => {
  return axios
    .get(`${CONVERT_URL}&from=${from}&to=${to}&amount=${amountToConvert}`)
    .then((res) => res.data.response.value);
};
