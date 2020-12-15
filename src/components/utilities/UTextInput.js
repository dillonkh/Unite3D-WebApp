import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

/**
 * Text Inputs will fill the width of their container
 *
 * @required props:
 *    onClick
 *    onChange
 *
 * @optional props:
 *    prepend // defaults to none
 *    append // defaults to none
 *    placeholder // defaults to none
 *    label // defaults to placeholder
 *    number // if set, only allows numbers. defaults to false
 *
 */

export default (props) => {
    function prepend() {
        if (props.prepend) {
            return (
                <InputGroup.Prepend>
                    <InputGroup.Text id='basic-addon1'>{props.prepend}</InputGroup.Text>
                </InputGroup.Prepend>
            );
        } else {
            return;
        }
    }
    function append() {
        if (props.append) {
            return (
                <InputGroup.Append>
                    <InputGroup.Text id='basic-addon1'>{props.append}</InputGroup.Text>
                </InputGroup.Append>
            );
        } else {
            return;
        }
    }

    const label = `${props.label ? props.label : props.placeholder}`;
    const number = `${props.number ? 'number' : ''}`;
    const password = `${props.password ? 'password' : ''}`;

    return (
        <InputGroup>
            {prepend()}
            <FormControl
                type={password || number}
                value={props.value}
                placeholder={props.placeholder}
                aria-label={label}
                aria-describedby='basic-addon1'
                onChange={(e) => props.onChange(e)}
                onClick={() => props.onClick()}
                onFocus={props.onFocus ? () => props.onFocus() : () => {}}
            />
            {append()}
        </InputGroup>
    );
};
