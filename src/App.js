import React, { Component } from 'react';
import {
  Page,
  Card,
  ResourceList,
} from '@shopify/polaris';
import '@shopify/polaris/styles.css';

import CustomerListItem from './components/CustomerListItem';
import customers from './data/customers';

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
