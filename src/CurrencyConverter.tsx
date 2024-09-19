import React, { useEffect, useState } from "react";
import { CurrencyDropdown } from "./CurrencyDropdown";

import { useFetchData } from "./useFetchData";
import { convertCurrencies } from "./actions";

import "./CurrencyConverter.scss";

export const CurrencyConverter = () => {
  const {
    data: currencyList,
    error: currencyFetchError,
    isLoading,
  } = useFetchData(
    "https://api.currencybeacon.com/v1/currencies?api_key=wOaB3DNGN9CleUy4OgtCIgsGbR0xeIQK&type=fiat"
  );

  const [amountToConvert, setAmountToConvert] = useState<number | undefined>(
    undefined
  );

  const [convertedAmount, setConvertedAmount] = useState<number | undefined>(
    undefined
  );
  const [hasConvertError, setConvertError] = useState(false);

  const [currency, setCurrency] = useState({
    from: null,
    to: null,
  });

  useEffect(() => {
    if (currency.from && currency.to) handleCurrencyConvert();
  }, [currency.from, currency.to, amountToConvert]);

  if (isLoading) return null;

  const handleConvert = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setAmountToConvert(parseInt(ev.target.value));
  };

  const handleCurrencySelection = (currency: string, type: "from" | "to") => {
    setCurrency((s) => ({ ...s, [type]: currency }));
  };

  const handleCurrencyConvert = async () => {
    const { from, to } = currency;
    if (!from || !to || !amountToConvert) return;

    convertCurrencies({ from, to, amountToConvert })
      .then(setConvertedAmount)
      .catch(() => setConvertError(true));
  };

  const shouldDisplayError = hasConvertError || currencyFetchError;

  return (
    <div className="converter__wrapper">
      <input
        type="number"
        value={amountToConvert ?? ""}
        className="converter__input"
        placeholder="type in amount to convert"
        onChange={handleConvert}
      />
      <CurrencyDropdown
        value={currency.from}
        options={currencyList}
        placeholder="Select currency to convert from"
        onChange={(currency) => handleCurrencySelection(currency, "from")}
      />
      <span className="converter__label">convert to:</span>
      <CurrencyDropdown
        value={currency.to}
        options={currencyList}
        placeholder="Select currency to convert to"
        onChange={(currency) => handleCurrencySelection(currency, "to")}
      />
      {convertedAmount && (
        <span className="converter__result">
          {amountToConvert} {currency.from} is equal to{" "}
          {(convertedAmount ?? 0).toFixed(2)} {currency.to}
        </span>
      )}
      {shouldDisplayError && (
        <span className="converter__errorMsg">Something went wrong..</span>
      )}
    </div>
  );
};
