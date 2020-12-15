import React from 'react';
import Button from 'react-bootstrap/Button';
import './../../style/UButtonStyle.css';

/**
 * Buttons will fill the width of their container
 *
 * @required props:
 *    onClick: function of form: () => {...}
 *    variant:  'primary' ||            // purple fill
 *              'primary-outline' ||    // purple outline, transparent fill
 *              'secondary' ||          // grey fill
 *              'secondary-outline' ||  // grey outline, transparent fill
 *              'primary-alt' ||        // black fill
 *              'primary-alt-outline'   // black outline, transparent fill
 *
 * @optional props:
 *    pill // defaults to false
 *    disabled // defaults to false
 *    size: 'lg' || 'sm' // alters button height (width is always 100% of container), defaults to medium
 *    children // JSX or text elements inside UButton tag
 *
 */
export default (props) => {
    const extraClasses = `${props.pill ? 'btn-pill ' : ''}`;
    return (
        <Button
            block
            className={extraClasses}
            disabled={props.disabled}
            onClick={() => props.onClick()}
            size={props.size}
            variant={props.variant}>
            {props.children}
        </Button>
    );
};
