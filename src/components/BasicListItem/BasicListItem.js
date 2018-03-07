import React from 'react';
import {
  ResourceList,
  VisuallyHidden,
} from '@shopify/polaris';

import './BasicListItem.css';

export default function BasicListItem(props) {
  const { title, secondaryContent, tertiaryContent, ...rest } = props;

  return (
    <div className="BasicListItem">
      <ResourceList.Item {...rest}>
        <div className="BasicListItem__Content">
          <div className="BasicListItem__Start">
            <h3 className="BasicListItem__Title">
              {title}
            </h3>
            <span className="BasicListItem__Secondary">
              {secondaryContent}
            </span>
          </div>
          <VisuallyHidden>&nbsp;</VisuallyHidden>
          <div className="BasicListItem__End">
            <span className="BasicListItem__Tertiary">
              {tertiaryContent}
            </span>
          </div>
        </div>
      </ResourceList.Item>
    </div>
  );
}
