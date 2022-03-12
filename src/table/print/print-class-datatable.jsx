import React, { Component } from 'react';
import { aktivnostTerminalaService } from './../../services/a09-terminal-service';

class PrintTableData extends Component {
   state = {
      terminali: []
   };
   async componentDidMount() {
      const { data: response } = await aktivnostTerminalaService.list();
      const { terminali } = response;
      this.setState({ terminali });
   }
   render() {
      const { terminali } = this.state;

      return (
         <>
            <h1 style={{ textAlign: 'center' }}>Pregled terminala</h1>
            <table className='table table-sm'>
               <thead>
                  <tr>
                     <th>Broj terminala</th>
                     <th>Datum upisa</th>
                     <th>Operater upisa</th>
                     <th>Vrijeme upisa</th>
                  </tr>
               </thead>
               <tbody>
                  {terminali.map((t, i) => (
                     <tr className={i % 50 === 0 ? 'page-break' : ''}>
                        <td>{t.brojTerminala}</td>
                        <td>{t.datumUpisa}</td>
                        <td>{t.operaterUpisa}</td>
                        <td>{t.vrijemeUpisa}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </>
      );
   }
}

export default PrintTableData;
