import React from 'react';
import Form from 'react-bootstrap/Form';

/**
 * Select Dropdowns will fill the width of their container
 *
 * @required props:
 *    options // the list the dropdown will contain
 *    onChange
 *
 * @optional props:
 *    placeholder // defaults to 'Choose...'
 *
 */

export default (props) => {
    function options() {
        let items = [];
        items.push(
            <option key='top' value='0'>
                {props.placeholder ? props.placeholder : 'Choose...'}
            </option>,
        );
        if (props.options) {
            for (let i = 0; i < props.options.length; i++) {
                items.push(
                    <option key={i} value={i + 1}>
                        {props.options[i]}
                    </option>,
                );
            }
        }
        return items;
    }

    return (
        <Form.Control onChange={(e) => props.onChange(e)} className='mb-3' as='select' custom>
            {options()}
        </Form.Control>
    );
};
