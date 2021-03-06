/** @format */

import React from 'react';

import { Burger } from 'components/Burger';
import { Button } from 'components/UI';
import classes from 'components/Order/CheckoutSummary/CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it taste well</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>
                Cancel
            </Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>
                Continue
            </Button>
        </div>
    );
};

export default checkoutSummary;
