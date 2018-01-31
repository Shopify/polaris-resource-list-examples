import React from 'react';
import {
  ResourceList,
  Avatar,
  Button,
} from '@shopify/polaris';

import Truncate from '../Truncate';
import ExceptionList from '../ExceptionList';

import './CustomerListItem.css';

export default function CustomerListItem(props) {
  const {
    avatarSource,
    name,
    location,
    orderCount = 0,
    totalSpent = 0,
    note,
    openOrderCount,
    openOrdersUrl,
    ...rest,
  } = props;

  const media = (
    <Avatar customer size="medium" name={name} source={avatarSource} />
  );

  const profile = (
    <div className="CustomerListItem__Profile">
      <h3 className="CustomerListItem__Title">
        {name}
      </h3>
      <p className="CustomerListItem__Location">
        {location}
      </p>
    </div>
  );

  const orders = (
    <div className="CustomerListItem__Orders">
      <p className="CustomerListItem__OrderCount">
        {orderCount} {orderCount === 1 ? 'order' : 'orders'}
      </p>
      <p className="CustomerListItem__TotalSpent">
        <Truncate>{totalSpent} spent</Truncate>
      </p>
    </div>
  );

  let exceptions = [];
  let conditionalAction = null;

  if (note) {
    exceptions.push({ icon: 'notes', summary: note });
  }

  if (openOrderCount !== undefined) {
    const label = openOrderCount === 1 ? 'order' : 'orders';
    const summary = `${openOrderCount} open ${label}`;
    exceptions.push({ status: 'warning', icon: 'alert', summary });
    conditionalAction = (
      <Button plain url={openOrdersUrl}>
        View open orders
      </Button>
    );
  }

  const exceptionList = exceptions.length
    ? (
      <div className="CustomerListItem__Exceptions">
        <ExceptionList items={exceptions} />
      </div>
    )
    : null;

  const conditionalActions = conditionalAction
  ? (
    <div className="CustomerListItem__ConditionalActions">
      {conditionalAction}
    </div>
  )
  : null;

  return (
    <ResourceList.Item
      {...rest}
      media={media}
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
