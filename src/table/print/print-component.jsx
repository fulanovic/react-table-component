import React, { Component } from 'react';

class PrintPage extends Component {
   state = {};

   render() {
      const { ref } = this.props;

      return (
         <div ref={ref} className='print'>
            <div className='header'>HEADER</div>
            <div className='body'>{this.props.body}</div>
            <div className='footer'>FOOTER</div>
         </div>
      );
   }
}

export default React.forwardRef((props, ref) => (
   <PrintPage ref={ref} {...props} />
));
