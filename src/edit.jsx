 async function EditProducts(product) {
    setId(product.id);
    setName(product.name);
    setBrand(product.brand);
    setCatagory(product.catagory);
    setShape(product.shape);
    setProductImage(product.productImage);
    setSealImage(product.sealImage);
    setDimension1(product.dimension.slice(0,2));
    setDimension2(product.dimension.slice(7,9));
    setPrice(product.price);
    
  }
  async function deleteProducts(id) {
    try{
        await axios.delete(API+"/"+id);
        setMsg(" Product Deleted Successfully");
    }
    catch(err)
    {
      console.log(err);
    }
        getProducts();
  }

  