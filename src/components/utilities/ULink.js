import React from 'react';
import {Link} from 'react-router-dom';
import './../../style/ULinkStyle.css';

/**
 * Wrapper for React Router Link
 * All hyperlinks in our app need to be a React Router Link Component
 *      for the Router to work correctly
 *
 * Applies our default styling to React Router Link
 *
 * @required props:
 *      see https://reactrouter.com/web/api/Link
 *
 * @optional props:
 *      see https://reactrouter.com/web/api/Link
 *      isNavLink: boolean // defaults to false
 */
export default ({isNavLink, ...props}) => {
    return <Link {...props} className={isNavLink ? 'nav-link' : 'link'} />;
};
