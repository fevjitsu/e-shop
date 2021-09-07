import React from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import useStyles from "./cartItemStyles";
export default function CartItem({
  item,
  handleRemoveFromCart,
  handleUpdateCartQty,
}) {
  const classes = useStyles();
  return (
    <Card>
      <CardMedia
        image={item.media.source}
        title={item.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions>
        <div className={classes.buttons}>
          <Button
            type={"button"}
            size="small"
            onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button
            type={"button"}
            size="small"
            onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>
            +
          </Button>
        </div>
        <Button
          variant="contained"
          color="secondary"
          type="button"
          onClick={() => handleRemoveFromCart(item.id)}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}
