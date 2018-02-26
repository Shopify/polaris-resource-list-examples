import React from 'react';
import {
  ResourceList,
  Avatar,
  Button,
  VisuallyHidden,
  ExceptionList,
  Truncate,
} from '@shopify/polaris';

import './CustomerListItem.css';

export default function CustomerListItem(props) {
  const {
    avatarSource,
    name,
    location,
    orderCount = 0,
    totalSpent = '$0.00',
    note,
    openOrderCount,
    openOrdersUrl,
    latestOrderUrl,
    ...rest,
  } = props;

  const media = (
    <Avatar customer size="medium" name={name} source={avatarSource} />
  );

  const profile = (
    <div className="CustomerListItem__Profile">
      <h3 className="CustomerListItem__Title">{name}</h3>
      <span className="CustomerListItem__Location">{location}</span>
    </div>
  );

  const orders = (
    <div className="CustomerListItem__Orders">
      <VisuallyHidden>&nbsp;</VisuallyHidden>
      <span className="CustomerListItem__OrderCount">
        {orderCount} {orderCount === 1 ? 'order' : 'orders'}
      </span>
      <VisuallyHidden>&nbsp;</VisuallyHidden>
      <span className="CustomerListItem__TotalSpent">
        <Truncate>{totalSpent} spent</Truncate>
      </span>
    </div>
  );

  let exceptions = [];
  let conditionalActions = null;

  if (note) {
    const noteMarkup = (
      <span>
        <VisuallyHidden>Customer note:</VisuallyHidden>
        {note}
      </span>
    );
    exceptions.push({ icon: 'notes', summary: noteMarkup });
  }

  if (openOrderCount) {
    const label = openOrderCount === 1 ? 'order' : 'orders';
    const summary = `${openOrderCount} open ${label}`;

    exceptions.push({ status: 'warning', icon: 'alert', summary });

    conditionalActions = (
      <div className="CustomerListItem__ConditionalActions">
        <Button plain url={openOrdersUrl}>
          View open orders
        </Button>
      </div>
    );
  }

  const exceptionList = exceptions.length
    ? (
      <div className="CustomerListItem__Exceptions">
        <ExceptionList items={exceptions} />
      </div>
    )
    : null;

  const shortcutActions = latestOrderUrl
    ? [{content: 'View latest order', url: latestOrderUrl}]
    : null;

  return (
    <ResourceList.Item
      {...rest}
      media={media}
      shortcutActions={shortcutActions}
    >
      <div className="CustomerListItem__Main">
        {profile}
        {orders}
      </div>
      {exceptionList}
      {conditionalActions}
    </ResourceList.Item>
  );
}
