import React, { Component } from 'react';

class Input extends Component {
    state = {};
    inputElement = React.createRef();
    render() {
        const {
            allowNegativeValues,
            name,
            label,
            error,
            placeholder,
            isNumber,
            lblSufix,
            ...rest
        } = this.props;

        return (
            <div className='input'>
                <div className='form-group'>
                    {label && (
                        <label
                            style={{
                                display: 'block',
                                textAlign: 'left',
                                fontWeight: 700
                            }}
                            htmlFor={name}
                        >
                            {label}
                        </label>
                    )}
                    {lblSufix && (
                        <span className='ml-2 lbl-sufix'>{lblSufix}</span>
                    )}
                    <input
                        ref={this.inputElement}
                        name={name}
                        id={name}
                        className='form-control form-control-sm'
                        placeholder={placeholder}
                        type={isNumber ? 'number' : 'text'}
                        onKeyDown={(e) => {
                            if (
                                isNumber &&
                                ['e', 'E', '+', '-'].includes(e.key)
                            )
                                e.preventDefault();
                        }}
                        min={allowNegativeValues ? Number.MIN_SAFE_INTEGER : 0}
                        {...rest}
                    />
                    {error && <div className='alert alert-info'>{error}</div>}
                </div>
            </div>
        );
    }

    componentDidMount() {
        const { autoFocus } = this.props;
        if (autoFocus) this.inputElement.current.focus();
    }
}

Input.defaultProps = {
    autoComplete: 'off',
    autoFocus: false
};
export default Input;
