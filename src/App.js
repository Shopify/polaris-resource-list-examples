import React, { Component } from 'react';
import {
  Page,
  Card,
  ResourceList,
} from '@shopify/polaris';
import '@shopify/polaris/styles.css';

import CustomerListItem from './components/CustomerListItem';

// In a real app this data would be dynamic and come from the server,
// either as a separate fetch or inlined in the intial payload.
const customers = [
  {
    id: 341,
    url: 'customers/341',
    avatarSource: 'https://avatars.io/twitter/maejemison',
    name: 'Mae Jemison',
    location: 'Decatur, USA',
    orderCount: 5,
    totalSpent: '$497.76',
    note: 'This customer is awesome! Make sure to treat them right',
    latestOrderUrl: 'orders/2345',
    openOrderCount: 1,
    openOrderUrl: 'orders/2345',
  },
  {
    id: 256,
    url: 'customers/256',
    avatarSource: 'https://avatars.io/twitter/Astro_Ellen',
    name: 'Ellen Ochoa',
    location: 'Los Angeles, USA',
    orderCount: 1,
    totalSpent: '$48.28',
    latestOrderUrl: 'orders/1867',
  },
  {
    id: 145,
    url: 'customers/145',
    avatarSource: 'https://avatars.io/twitter/Astro_Soyeon',
    name: 'Yi So-Yeon',
    location: 'Gwangju, South Korea',
    orderCount: 2,
    totalSpent: '$73.98',
    latestOrderUrl: 'orders/2342',
  },
];

const resourceName = {
  singular: 'customer',
  plural: 'customers',
};

class App extends Component {
  render() {
    return (
      <Page title="Polaris resource list examples">
        <Card title="Customer list item showcase">
          <ResourceList
            resourceName={resourceName}
            items={customers}
            renderItem={CustomerListItem}
          />
        </Card>
      </Page>
    );
  }
}

export default App;
