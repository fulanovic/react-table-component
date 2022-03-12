import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';

class Print extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { header, body, footer, children, onClose } = this.props;
        return (
            <>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <ReactToPrint
                        documentTitle='Nirvana report'
                        onAfterPrint={() => {
                            if (onClose) onClose();
                        }}
                        trigger={() => (
                            <button
                                type='button'
                                className='btn btn-sm btn-danger btn-print'
                            >
                                Print
                            </button>
                        )}
                        content={() => this.ref}
                    />
                    <div style={{ display: 'none' }}>
                        <div ref={(el) => (this.ref = el)} className='print'>
                            {header && (
                                <div className='print-header'>{header}</div>
                            )}
                            {body || (
                                <div className='print-body'>{children}</div>
                            )}
                            {footer && (
                                <div className='print-footer'>{footer}</div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default Print;
