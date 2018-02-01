import React from 'react';
import classnames from 'classnames';
import {
  Icon,
} from '@shopify/polaris';

import Truncate from '../Truncate';

import './ExceptionList.css';

export default function ExceptionList(props) {
  const items = props.items.map((item, index) => {
    const { status, icon, summary, description } = item;

    const itemClasses = classnames(
      'ExceptionList__Item',
      status && `ExceptionList__Item--${status}`,
    );

    const iconMarkup = icon
      ? <Icon source={icon} />
      : <span className="ExceptionList__Bullet"></span>;

    const summaryMarkup = summary && (
      <span className="ExceptionList__Summary">{summary}</span>
    );

    const descriptionMarkup = description && (
      <span className="ExceptionList__Description">{description}</span>
    );

    return (
      <li className={itemClasses} key={index}>
        <span className="ExceptionList__Icon">
          {iconMarkup}
        </span>
        <Truncate>
          {summaryMarkup}
          {descriptionMarkup}
        </Truncate>
      </li>
    );
  });

  return <ul className="ExceptionList">{items}</ul>;
}
