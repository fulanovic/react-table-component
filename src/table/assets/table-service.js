export const getFormatedValue = (value) => {
   const options = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
   };
   return `${Number(value).toLocaleString('en', options)}`;
};

export const getHighlightedText = (text, highlight) => {
   // Split on highlight term and include term into parts, ignore case
   const parts = text.toString().split(new RegExp(`(${highlight})`, 'gi'));
   return (
      <span>
         {' '}
         {parts.map((part, i) => (
            <span
               key={i}
               style={
                  part.toLowerCase() === highlight.toLowerCase()
                     ? {
                          color: 'white',
                          backgroundColor: 'darkred'
                       }
                     : {}
               }
            >
               {part}
            </span>
         ))}{' '}
      </span>
   );
};

const exportObj = {
   getFormatedValue,
   getHighlightedText
};

export default exportObj;
