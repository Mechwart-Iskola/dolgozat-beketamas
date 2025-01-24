import React, { useEffect, useState } from 'react'

type Product = {
    id: number,
    name: string,
    price: number,
    category: string,
    image: string
}


const ProductCard = () => {

    const [productArray, setProductArray] = useState<Product[]>([])
    const [product, setProduct] = useState<Product | null>()
    const [searchProduct, setSearchProduct] = useState<string>()
    const [error, setError] = useState<string | null>()

    const productNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchProduct(e.target.value)
    }


    const searchProductButton = () => {

        if (searchProduct) {
            const foundCity = productArray.find(u => u.name.toLowerCase().includes(searchProduct?.toLowerCase()))
            if (foundCity) {
                setProduct(foundCity)
                setError(null)
            }
            else
            {
                setError("No product found with the given name")
                setProduct(null)
            }
        }
    
    }

    const fetchProduct = async() => {
        try {
            let url = 'public/products.json'
            const res = await fetch(url)
            const data = await res.json();
            setProductArray(data.products);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchProduct()
    },[])

  return (
    <div className='product-card'>
        <div className='search-section'>
            <input type="text" value={searchProduct}  onChange={productNameChange}/>
            <button type="button" onClick={searchProductButton}>Search</button>
        </div>
        <div className='resultSection'>
            {error && <p className='error'>{error}</p>}
            {
                product&&
                <div className='product-info'>
                    <div className='product-details'>
                        <img className='product-image' src={product?.image} />
                        <p>Name: <label htmlFor="">{product?.name}</label> </p>
                        <p>Category: <label>{product?.category}</label> </p>
                        <p>Price: <label>{product?.price}</label> </p>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default ProductCard