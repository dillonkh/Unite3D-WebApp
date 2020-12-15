import React from 'react';
import './../../style/UTextAreaStyle.css';

/**
 * Text Inputs will fill the width of their container
 *
 * @required props:
 *
 * @optional props:
 *    placeholder // defaults to none
 *    rows // defaults to 3
 *    label // defaults to placeholder
 *
 */

export default (props) => {
    const rows = `${props.rows ? props.rows : 3}`;

    return (
        <div className='wrapper mb-3'>
            <textarea
                className='text-area'
                value={props.value}
                placeholder={props.placeholder}
                aria-label={props.label}
                onChange={(e) => props.onChange(e)}
                rows={rows}
            />
        </div>
    );
};
