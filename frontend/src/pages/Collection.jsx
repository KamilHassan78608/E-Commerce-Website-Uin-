import { ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../contents/ShopContext';
import Product_Card from '../components/Product_Card';

const Collection = () => {

    const { products } = useContext(ShopContext);

    const [filterProducts, setfilterProducts] = useState([]);
    const [isFilterOpen, setisFilterOpen] = useState(false);
    const [category, setcategory] = useState([]);
    const [subCategory, setsubCategory] = useState([]);
    const [SortType, setSortType] = useState("relevent");

    const toogleCategories = (event) => {
        if(category.includes(event.target.value)){
            setcategory(prev => prev.filter(item => item !== event.target.value));
        }else{
            setcategory(prev => [...prev, event.target.value]);
        }
    }

    const toogleSubCategories = (event) => {
        if(subCategory.includes(event.target.value)){
            setsubCategory(prev => prev.filter(item => item !== event.target.value));
        }else{
            setsubCategory(prev => [...prev, event.target.value]);
        }
    }

    const applyFilter = () => {
        let CopyProducts = products.slice();

        if(category.length > 0){
            CopyProducts = CopyProducts.filter(item => category.includes(item.category));
        }

        if(subCategory.length > 0){
            CopyProducts = CopyProducts.filter(item => subCategory.includes(item.subCategory) );
        }

        setfilterProducts(CopyProducts);
    }

    const applySort = () => {
        let CopyProducts = filterProducts.slice();

        switch(SortType){
            case('low-high'):
                setfilterProducts(CopyProducts.sort((a, b) => (a.price - b.price)));
                break;
            case('high-low'):
                setfilterProducts(CopyProducts.sort((a, b) => (b.price - a.price)));
                break;
            default:
                applyFilter();
                break;
        }
    }

    useEffect(() => {
        applyFilter();
    }, [category, subCategory]);

    useEffect(() => {
        applySort();
    }, [SortType]);
    
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
        
        {/* Sidebar - Category Bar */}
        <div className='min-w-60 mt-4'>

            {/* Filters */}
            <div className='mb-6'>
                <button className='flex items-center gap-2 py-2 px-4 border border-gray-400 text-gray-600 rounded-lg shadow-2xl'>
                    <SlidersHorizontal className='w-5 h-5'/>
                    <span>Filter</span>

                    {
                        isFilterOpen ? 
                        <ChevronUp className='w-5 h-5 cursor-pointer' onClick={() => setisFilterOpen(prev => !prev)}/>
                        : <ChevronDown className='w-5 h-5 cursor-pointer' onClick={() => setisFilterOpen(prev => !prev)}/>
                    }
                </button>
            </div>

            {/* Category Section */}
            <div className={`border border-gray-400 rounded-lg shadow-lg text-gray-600 p-4 mb-6
                ${isFilterOpen ? "" : "hidden"} 
                `}>
                <p className='font-medium text-2xs mb-3'>Category</p>
                <div className='flex gap-3'>
                    <input type="checkbox" id='men' value={"Men"} name='men' className='w-3' onChange={toogleCategories}/>
                    <label htmlFor="men">Men</label>
                </div>
                <div className='flex gap-3'>
                    <input type="checkbox" id='women' value={"Women"} name='women' className='w-3' onChange={toogleCategories}/>
                    <label htmlFor="women">Women</label>
                </div>
                <div className='flex gap-3'>
                    <input type="checkbox" id='unisex' value={"Unisex"} name='unisex' className='w-3' onChange={toogleCategories}/>
                    <label htmlFor="unisex">Unisex</label>
                </div>
                <div className='flex gap-3'>
                    <input type="checkbox" id='kids' value={"Kids"} name='kids' className='w-3' onChange={toogleCategories}/>
                    <label htmlFor="kids">Kids</label>
                </div>
            </div>

            {/* Sub Category */}
            <div className={`border border-gray-400 rounded-lg shadow-lg text-gray-600 p-4 mb-6
                ${isFilterOpen ? "" : "hidden"}
                `}>
                <p className='font-medium text-2xs mb-3'>Type</p>
                <div className='flex gap-2'>
                        <input type="checkbox" id=' outerwear' name=' outerwear'  className='w-3' value={'Outerwear'} onChange={toogleSubCategories} />
                        <label htmlFor=" outerwear">   Outerwear</label>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='topwear' name='topwear'  className='w-3' value={'Topwear'} onChange={toogleSubCategories} />
                        <label htmlFor="topwear">  Topwear</label>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='bottomwear' name='bottomwear'  className='w-3' value={'Bottomwear'} onChange={toogleSubCategories} />
                        <label htmlFor="bottomwear">  Bottomwear</label>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='dresses' name='dresses'  className='w-3' value={'Dresses'} onChange={toogleSubCategories} />
                        <label htmlFor="dresses">  Dresses</label>
                    </div>
            </div>
        </div>

        {/* Products */}
        <div>

            <div className='flex items-center justify-between'>
                <h1 className='gradient-text tracking-wide'>All Collection</h1>

                {/* Sorting Box */}
                <div>
                    <select className='px-4 py-2 rounded-lg shadow-2xl border border-gray-400 text-gray-700 outline-none' onChange={(e) => setSortType(e.target.value)}>
                        <option value="relevent">Sort by: Relevent</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>
            </div>
            

            <hr className='my-10 text-gray-300'/>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 my-10'>
                {
                    filterProducts.map((prod) => (
                        <Product_Card id={prod._id} name={prod.name} description={prod.description} price={prod.price} image={prod.image}/>
                    ))
                }
            </div>

        </div>
    </div>
  )
}

export default Collection