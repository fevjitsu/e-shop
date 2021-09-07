import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
export default function Review({ checkoutToken }) {
  return (
    <React.Fragment>
      <Typography gutterBottom variant="h6">
        Order summary
      </Typography>
      <List disablePadding>
        {checkoutToken?.live?.line_items?.map((product) => (
          <ListItem key={product.name} className="p-3">
            <ListItemText
              primary={product.name}
              secondary={`Quantity: ${product.quantity}`}
            />
            <Typography variant="body2">
              {product.line_total.formatted_with_symbol}
            </Typography>
          </ListItem>
        ))}
        <ListItem className="p-3">
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className="font-weight-bold">
            {checkoutToken.live.subtotal.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}
