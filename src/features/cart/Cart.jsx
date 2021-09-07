import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import useStyles from "./styles";
export default function Cart({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) {
  const isEmpty = !cart?.line_items.length === 0;
  const classes = useStyles();
  const EmptyCart = () => (
    <Typography>
      There are no items in the cart,{" "}
      <Link to="/" className={classes.link}>
        start adding some
      </Link>
    </Typography>
  );
  const FilledCart = () => (
    <React.Fragment>
      <Grid container spacing={3}>
        {cart?.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal: {cart?.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}>
            Empty cart
          </Button>
          <Link to="/checkout">
            <Button
              className={classes.checkoutButton}
              size="large"
              type="button"
              variant="contained"
              color="primary">
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography gutterBottom variant="h3" className={classes.title}>
        Your shopping cart
      </Typography>
      {isEmpty ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
}
