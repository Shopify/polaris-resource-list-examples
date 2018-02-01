import React, { Component } from 'react';
import {
  ResourceList,
  Avatar,
  Button,
} from '@shopify/polaris';
import { noop } from '@shopify/javascript-utilities/other';

import Truncate from '../Truncate';
import ExceptionList from '../ExceptionList';

import './CustomerListItem.css';

function widescreen() {
  if (typeof window === 'undefined') {
    return {
      media: '',
      addListener: noop,
      removeListener: noop,
      matches: false,
    };
  }

  return window.matchMedia(`(min-width: 800px)`);
}

export default class CustomerListItem extends Component {
  constructor(props) {
    super(props);

    this.state = { avatarSize: 'medium' };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.handleResize();
    widescreen().addListener(this.handleResize);
  }

  componentWillUnmount() {
    widescreen().removeListener(this.handleResize);
  }

  render() {
    const {
      avatarSource,
      name,
      location,
      orderCount = 0,
      totalSpent = '$0.00',
      note,
      openOrderCount,
      openOrdersUrl,
      ...rest,
    } = this.props;

    const media = (
      <div class="CustomerListItem__Media">
        <Avatar
          customer
          name={name}
          source={avatarSource}
          size={this.state.avatarSize}
        />
      </div>
    );

    const profile = (
      <div className="CustomerListItem__Profile">
        <h3 className="CustomerListItem__Title">{name}</h3>
        <p className="CustomerListItem__Location">{location}</p>
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
    let conditionalActions = null;

    if (note) {
      exceptions.push({ icon: 'notes', summary: note });
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

    return (
      <ResourceList.Item {...rest} media={media}>
        <div className="CustomerListItem__Main">
          {profile}
          {orders}
        </div>
        {exceptionList}
        {conditionalActions}
      </ResourceList.Item>
    );
  }

  handleResize() {
    this.setState({
      avatarSize: widescreen().matches ? 'small' : 'medium',
    });
  }
}
