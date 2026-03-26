import React from "react";
import Image1 from "/Users/kamilhassan/Downloads/willian-justen de vasconcellos-2Ka0oKSMxVE.jpg"

const SubCategories = ({ data, onMouseLeave }) => {
  if (!data) return null;

  return (
    <div className="absolute left-0 w-full z-50 shadow-2xl rounded-b-2xl" onMouseLeave={onMouseLeave}>
        <div className="max-w-7xl mx-auto grid grid-cols-5 gap-8 p-10">
            {
                data.map((section, idx) => (
                    section.title ? (
                        <div>
                            <h1 className="font-bold text-gray-800 text-sm mb-1">{section.title}</h1>
                            <div className="text-gray-600 text-xs space-y-0.7">
                                {
                                    section.items.map((item, i) => (
                                        <p className="transition-all duration-300 hover:text-indigo-500 hover:font-bold cursor-pointer">{item}</p>
                                    ))
                                }
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <h1 className="font-bold text-gray-800 text-sm mb-1">{section.promo.title}</h1>
                            <p className="text-gray-500 text-xs">{section.promo.desc}</p>
                            <img src={Image1} alt={section.promo.title} className="w-full object-cover"/>
                            <button className="text-xs font-black border-b py-1 transition-all duration-300 hover:-translate-y-0.5">Shop Now</button>
                        </div>
                    )
                ))
            }
        </div>
    </div>
  );
};

export default SubCategories;
