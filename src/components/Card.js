import React from 'react';

const card = ( { title, children, count, updated } ) => {
  return(
    <div className="w-full lg:w-1/3 p-1">
      <div className=" bg-gray-800 rounded-md shadow-md p-5 h-40">
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
    </div>
  );
};

export default card;