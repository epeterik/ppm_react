import React from 'react';
import '../ui-toolkit/css/nm-cx/main.css';
import { OldSchoolMenuLink } from './activeLinks';

export const NavigationBar = (props) => {
    return (
        <ul className="heading-nav padding-bottom-medium">
          <OldSchoolMenuLink activeOnlyWhenExact={true} to="/" label="Home"/>
          <OldSchoolMenuLink activeOnlyWhenExact={true} to="/products" label="Product List"/>
          <OldSchoolMenuLink to="/products/new" label="Product Creation"/>
      </ul>
    );
}
