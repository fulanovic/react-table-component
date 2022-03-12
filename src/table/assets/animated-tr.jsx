import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedTR = ({
   index,
   children,
   style,
   className = '',
   onRowClick,
   markRowOnClick,
   markedRowStyle,
   printingData
}) => {
   const [isHovered, setHovered] = useState(false);

   const variants = {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 }
   };

   const defaultClickedRowStyle = {
      backgroundColor: '#979eb1',
      color: 'white'
   };

   const cssClass = markRowOnClick ? `${className} clickedd` : className;

   const getRowStyles = () => {
      if (markRowOnClick && Object.keys(markedRowStyle).length > 0)
         return markedRowStyle;
      else if (markRowOnClick) return defaultClickedRowStyle;
      else return {};
   };

   return (
      <motion.tr
         className={className}
         style={getRowStyles()}
         variants={variants}
         initial='hidden'
         animate='visible'
         transition={{
            delay: printingData || isHovered ? 0 : index * 0.05
            //ease: [1, 0.01, 0.49, 1.05],
            //stiffness: 500
         }}
         onClick={onRowClick}
         onMouseEnter={() => setHovered(true)}
         whileHover={
            {
               //scaleX: 1.05,
               // x: -10,
               // transition: {
               //    duration: 0.1,
               //    delay: 0
               // }
               // textShadow: '.1rem .1rem .1rem #333'
            }
         }
      >
         {children}
      </motion.tr>
   );
};

export default AnimatedTR;
