// import React from "react";

// function Tabs({ tabs, activeTab, setActiveTab }) {
//   return (
//     <div className="w-full">
//       <div className="relative border-b-2 border-slate-100 overflow-x-auto scrollbar-none [::-webkit-scrollbar]:hidden ">
//         <nav className="flex gap-2">
//           {tabs.map((tab) => (
//             <button
//               key={tab.name}
//               onClick={() => setActiveTab(tab.name)}
//               className={`relative pb-4 px-2 md:px-6 text-sm font-semibold transition-all duration-200 ${
//                 activeTab === tab.name
//                   ? "text-emerald-600 "
//                   : "text-slate-600 hover:text-slate-900"
//               }`}
//             >
//               <span className="relative z-10 whitespace-nowrap">
//                 {tab.label}
//               </span>
//               {activeTab === tab.name && (
//                 <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg shadow-emerald-500/25 animate" />
//               )}
//               {activeTab === tab.name && (
//                 <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent rounded-t-xl -z-10" />
//               )}
//             </button>
//           ))}
//         </nav>
//       </div>
//       <div className="py-6">
//         {tabs.map((tab) => {
//           if (tab.name === activeTab) {
//             return (
//               <div key={tab.name} className="animate-in fade-in duration-300">
//                 {tab.content}
//               </div>
//             );
//           }
//           return null;
//         })}
//       </div>
//     </div>
//   );
// }

// export default Tabs;

import React, { useState, useRef, useEffect } from "react";

function Tabs({ tabs, activeTab, setActiveTab }) {
  // 1. Create a dictionary/ref object to hold references to each tab button
  const tabsRef = useRef({});
  // 2. State to track the dynamic styles of the sliding components
  const [indicatorStyles, setIndicatorStyles] = useState({ width: 0, left: 0 });

  // 3. Update the sliding elements' coordinates whenever the active tab changes
  useEffect(() => {
    const currentTabEl = tabsRef.current[activeTab];
    if (currentTabEl) {
      setIndicatorStyles({
        width: currentTabEl.offsetWidth,
        left: currentTabEl.offsetLeft,
      });
    }
  }, [activeTab, tabs]);

  return (
    <div className="w-full">
      <div className="relative border-b-2 border-slate-100 overflow-x-auto scrollbar-none [::-webkit-scrollbar]:hidden ">
        {/* Make sure the nav is relative so absolute positioning coordinates read from here */}
        <nav className="relative flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              // 4. Bind each button element to our ref tracker using its unique name
              ref={(el) => (tabsRef.current[tab.name] = el)}
              onClick={() => setActiveTab(tab.name)}
              className={`relative pb-4 px-2 md:px-6 text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.name
                  ? "text-emerald-600 "
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="relative z-10 whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          ))}

          {/* 5. SLIDING UNDERLINE (Moved outside the loop) */}
          <div
            className="absolute bottom-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg shadow-emerald-500/25 transition-all duration-300 ease-in-out"
            style={{
              width: `${indicatorStyles.width}px`,
              transform: `translateX(${indicatorStyles.left}px)`,
            }}
          />

          {/* 6. SLIDING BACKGROUND GLOW (Moved outside the loop) */}
          <div
            className="absolute top-0 bottom-0 bg-gradient-to-b from-emerald-50/50 to-transparent rounded-t-xl -z-0 transition-all duration-300 ease-in-out"
            style={{
              width: `${indicatorStyles.width}px`,
              transform: `translateX(${indicatorStyles.left}px)`,
            }}
          />
        </nav>
      </div>

      <div className="py-6">
        {tabs.map((tab) => {
          if (tab.name === activeTab) {
            return (
              <div key={tab.name} className="animate-in fade-in duration-300">
                {tab.content}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default Tabs;
