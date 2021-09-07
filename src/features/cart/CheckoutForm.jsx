import React, { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import useStyles from "./checkoutFormStyles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Confirmation from "./Confirmation";
import { commerce } from "../../lib/commerce";
export default function CheckoutForm({
  cart,
  order,
  handleCaptureCheckout,
  error,
}) {
  let history = useHistory();
  const classes = useStyles();
  const [steps] = useState(["Shipping address", "Payment details"]);
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(undefined);
  const [shippingData, setShippingData] = useState({});

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  //next button for shipping info
  const next = (data) => {
    setShippingData(data);
    nextStep();
  };
  const paymentTimeout = () => {
    setTimeout(() => {}, 3000);
  };
  let Confirmation = () =>
    order.customer ? (
      <React.Fragment>
        <div>
          <Typography variant="h5">
            Thank you for your purchase, {order.customer.firstname}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">
            Order ref:&nbsp;{order.customer_reference}
          </Typography>
          <br />
          <Link to="/">
            <Button variant="outlined" type="button">
              Home
            </Button>
          </Link>
        </div>
      </React.Fragment>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );

  if (error) {
    <React.Fragment>
      <Typography variant="h5">Error:&nbsp;{error}</Typography>
      <br />
      <Link to="/">
        <Button variant="outlined" type="button">
          Home
        </Button>
      </Link>
    </React.Fragment>;
  }
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        handleCaptureCheckout={handleCaptureCheckout}
        nextStep={nextStep}
      />
    );
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (error) {
        history.push("/");
        console.log(error);
      }
    };
    generateToken();
  }, [cart]);

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main>
        <Paper className={classes.paper}>
          <Typography>Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps?.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </React.Fragment>
  );
}
