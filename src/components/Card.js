import React from 'react';

const card = ( { title, children, count, updated } ) => {
  return(
    <div className="w-1/3 bg-gray-800 rounded-md shadow-md p-6 m-2 h-40">
      <div className="text-gray-300">
        <span className="font-black text-4xl mr-2">{ count }</span>

        { children }
        
        <p className="font-semibold">
          { title }
        </p>

        <p className="font-semibold">
          updated: { updated }
        </p>
      </div>
    </div>
  );
};

export default card;