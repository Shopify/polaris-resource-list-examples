import React, { Component } from 'react';
import {
  Page,
  Card,
  ResourceList,
  FilterType,
  Pagination,
} from '@shopify/polaris';
import '@shopify/polaris/styles.css';

import CustomerListItem from './components/CustomerListItem';
import BasicListItem from './components/BasicListItem';
import IndexPagination from './components/IndexPagination';

const resourceName = {
  singular: 'customer',
  plural: 'customers',
};

// This would normally come from an API request
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
    openOrderCount: 2,
    openOrdersUrl: 'http://google.com',
  },
  {
    id: 256,
    url: 'customers/256',
    avatarSource: 'https://avatars.io/twitter/Astro_Ellen',
    name: 'Ellen Ochoa',
    location: 'Los Angeles, USA',
    orderCount: 1,
    totalSpent: '$48.28',
  },
  {
    id: 145,
    url: 'customers/145',
    avatarSource: 'https://avatars.io/twitter/Astro_Soyeon',
    name: 'Yi So-Yeon',
    location: 'Gwangju, South Korea',
    orderCount: 2,
    totalSpent: '$73.98',
  },
];

const sortOptions = [
  { label: 'Newest update', value: 'DATE_MODIFIED_DESC' },
  { label: 'Oldest update', value: 'DATE_MODIFIED_ASC' },
  { label: 'Most spent', value: 'TOTAL_SPENT_DESC' },
  { label: 'Most orders', value: 'ORDER_COUNT_DESC' },
  { label: 'Last name A–Z', value: 'ALPHABETICAL_ASC' },
  { label: 'Last name Z–A', value: 'ALPHABETICAL_DESC' },
];

const availableFilters = [
  {
    key: 'spentFilter',
    label: 'Money spent',
    operatorText: 'is greater than',
    type: FilterType.TextField,
  },
  {
    key: 'orderCountFilter',
    label: 'Number of orders',
    operatorText: 'is greater than',
    type: FilterType.TextField,
  },
  {
    key: 'orderDateFilter',
    label: 'Order date',
    operatorText: 'is',
    type: FilterType.Select,
    options: [
      'In the last week',
      'In the last month',
      'In the last three months',
      'In the last year',
    ],
  },
  {
    key: 'emailSubscriberFilter',
    label: 'Is an email subscriber',
    type: FilterType.Select,
    options: [
      'Yes',
      'No',
    ],
  },
  {
    key: 'tagsFilter',
    label: 'Tagged with',
    type: FilterType.TextField,
  },
  {
    key: 'locationFilter',
    label: 'Located in',
    operatorText: 'country',
    type: FilterType.Select,
  },
];

// Not implemented
function fetchCustomers(options) {
  return customers;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: customers,
      selectedItems: [],
      sortValue: 'DATE_MODIFIED_DESC',
      appliedFilters: [],
      searchValue: '',
      isFirstPage: true,
      isLastPage: false,
    }

    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.handleBulkEdit = this.handleBulkEdit.bind(this);
    this.handleBulkAddTags = this.handleBulkAddTags.bind(this);
    this.handleBulkRemoveTags = this.handleBulkRemoveTags.bind(this);
    this.handleBulkDelete = this.handleBulkDelete.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleFiltersChange = this.handleFiltersChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handlePreviousPage = this.handlePreviousPage.bind(this);
    this.handleSaveFilters = this.handleSaveFilters.bind(this);
    this.handlePreviousPage = this.handlePreviousPage.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
  }

  render() {
    const {
      items,
      selectedItems,
      sortValue,
      appliedFilters,
      searchValue,
      isFirstPage,
      isLastPage,
    } = this.state;

    const paginationMarkup = items.length > 0
      ? (
        <IndexPagination>
          <Pagination
            hasPrevious={!isFirstPage}
            hasNext={!isLastPage}
            onPrevious={this.handlePreviousPage}
            onNext={this.handleNextPage}
          />
        </IndexPagination>
      )
      : null;

    return (
      <Page title="Customers">
        <Card>
          <ResourceList
            resourceName={resourceName}
            items={items}
            renderItem={(customer) => <CustomerListItem {...customer} />}
            selectedItems={selectedItems}
            onSelectionChange={this.handleSelectionChange}
            promotedBulkActions={[
              { content: 'Edit customers', onAction: this.handleBulkEdit },
            ]}
            bulkActions={[
              { content: 'Add tags', onAction: this.handleBulkAddTags },
              { content: 'Remove tags', onAction: this.handleBulkRemoveTags },
              { content: 'Delete customers', onAction: this.handleBulkDelete },
            ]}
            sortOptions={sortOptions}
            sortValue={sortValue}
            onSortChange={this.handleSortChange}
            filterControl={
              <ResourceList.FilterControl
                resourceName={resourceName}
                filters={availableFilters}
                appliedFilters={appliedFilters}
                onFiltersChange={this.handleFiltersChange}
                searchValue={searchValue}
                onSearchChange={this.handleSearchChange}
                additionalAction={{
                  content: 'Save',
                  onAction: this.handleSaveFilters,
                }}
              />
            }
            hasMoreItems
          />

          {paginationMarkup}
        </Card>

        <Card>
          <ResourceList
            items={[
              {
                title: 'How to Get Value from Wireframes',
                secondaryContent: 'by Jonathan Mangrove',
                tertiaryContent: 'Today, 7:14pm',
              },
              {
                title: 'The Best Design Systems of 2017',
                secondaryContent: 'by Stephanie Xie',
                tertiaryContent: 'Dec 28, 2017, 4:21pm',
              }
            ]}
            renderItem={(item) => <BasicListItem {...item} />}
          />
        </Card>
      </Page>
    );
  }

  handlePreviousPage() {
    const items = fetchCustomers();
    // Todo: figure out how to determine if items represent
    // first or last page.
    this.setState({ items, isFirstPage: true, isLastPage: false });
  }

  handleNextPage() {
    const items = fetchCustomers();
    // Todo: figure out how to determine if items represent
    // first or last page.
    this.setState({ items, isFirstPage: false, isLastPage: true });
  }

  handleFiltersChange(appliedFilters) {
    const items = fetchCustomers();
    this.setState({ items, appliedFilters });
  }

  handleSearchChange(searchValue) {
    const items = fetchCustomers();
    this.setState({ items, searchValue });
  }

  handleSortChange(sortValue) {
    const items = fetchCustomers();
    this.setState({ items, sortValue });
  }

  handleSelectionChange(selectedItems) {
    this.setState({ selectedItems });
  }

  handleBulkEdit() {
    console.log('Opening bulk editor…');
  }

  handleBulkAddTags() {
    console.log('Asynchronously adding tags to customers…');
    // A Flash message should be displayed to confirm that async process
    // has started.
  }

  handleBulkRemoveTags() {
    console.log('Removing tags from customers…');
  }

  handleBulkDelete() {
    console.log('Handling bulk customer deletion…');
    // Since this action destroys resources in bulk, show a
    // confirmation modal (“Are you sure you want to delete {n}
    // customers”) before completing the action.
  }

  handleSaveFilters() {
    console.log('Saving current filters…');
  }
}

export default App;
