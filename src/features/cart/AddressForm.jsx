import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./FormInput";
import { commerce } from "../../lib/commerce";
import { Link } from "react-router-dom";
import _ from "lodash";
export default function AddressForm({ checkoutToken, next }) {
  const methods = useForm();
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const options = shippingOptions?.map((shippingOption) => ({
    id: shippingOption.id,
    label: `${shippingOption.description}-${shippingOption.price.formatted_with_symbol}`,
  }));

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setShippingCountry(countries[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, [checkoutToken]);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision, shippingCountry, checkoutToken]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={
            // () => {}
            methods.handleSubmit((dataFromFields) =>
              next({
                ...dataFromFields,
                shippingCountry,
                shippingSubdivision,
                shippingOption,
              })
            )
          }>
          <Grid container spacing={3}>
            <FormInput required name={"firstName"} label={"first name"} />
            <FormInput required name={"lastName"} label={"last name"} />
            <FormInput required name={"address1"} label={"address"} />
            <FormInput required name={"email"} label={"email"} />
            <FormInput required name={"city"} label={"city"} />
            <FormInput required name={"postalCode"} label={"postal code"} />

            {/*      
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping country</InputLabel>
              <Select
                value={shippingCountry ?? ""}
                fullWidth
                onChange={(e) => {
                  setShippingCountry(e.target.value);
                }}>
                {_.map(shippingCountries, (country, key) => (
                  <MenuItem key={key} value={key}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping subdivision</InputLabel>
              <Select
                value={shippingSubdivision ?? ""}
                fullWidth
                onChange={(e) => {
                  setShippingSubdivision(e.target.value);
                }}>
                {_.map(shippingSubdivisions, (subdivision, key) => (
                  <MenuItem key={subdivision} value={key}>
                    {subdivision}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping options</InputLabel>
              <Select
                value={shippingOption ?? ""}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}>
                {options?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
       */}
          </Grid>

          <br />
          <div className="d-flex justify-content-between">
            <Link to="/cart">
              <Button variant="outlined" color="secondary">
                Back to cart
              </Button>
            </Link>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </React.Fragment>
  );
}
