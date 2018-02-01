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
  constructor(props) {
    super(props);

    this.state = {
      selectedItems: [],
    }

    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.handleBulkEdit = this.handleBulkEdit.bind(this);
    this.handleBulkAddTags = this.handleBulkAddTags.bind(this);
    this.handleBulkRemoveTags = this.handleBulkRemoveTags.bind(this);
    this.handleBulkDelete = this.handleBulkDelete.bind(this);
  }

  render() {
    return (
      <Page title="Polaris resource list examples">
        <Card title="Customer list item showcase">
          <ResourceList
            resourceName={resourceName}
            items={customers}
            renderItem={CustomerListItem}
            selectedItems={this.state.selectedItems}
            onSelectionChange={this.handleSelectionChange}
            promotedBulkActions={[
              { content: 'Edit customers', onAction: this.handleBulkEdit },
            ]}
            bulkActions={[
              { content: 'Add tags', onAction: this.handleBulkAddTags },
              { content: 'Remove tags', onAction: this.handleBulkRemoveTags },
              { content: 'Delete customers', onAction: this.handleBulkDelete },
            ]}
          />
        </Card>
      </Page>
    );
  }

  handleSelectionChange(selectedItems: string[]) {
    this.setState({ selectedItems });
  }

  handleBulkEdit() {
    console.log('Opening bulk editor…');
  }

  handleBulkAddTags() {
    console.log('Asynchronously adding tags to customers…');
    // - A Flash message should be displayed to confirm that async process
    //   has started.
    // - Check to see if the items will change (if a filter for certain tags
    //   is applied)
  }

  handleBulkRemoveTags() {
    console.log('Removing tags from customers…');
    // - A Flash message should be displayed to confirm that async process
    //   has started.
    // - Check to see if the items will change (if a filter for certain tags
    //   is applied)
  }

  handleBulkDelete() {
    console.log('Handling bulk customer deletion…');
    // - Since this action destroys resources in bulk, show a
    //   confirmation modal (“Are you sure you want to delete {n}
    //   customers”) before completing the action.
  }
}

export default App;
