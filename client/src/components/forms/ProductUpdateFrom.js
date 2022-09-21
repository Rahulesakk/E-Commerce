import React, { useState } from "react";
import { Select } from "antd";
const { Option } = Select;

function ProductUpdateFrom({
  handleSubmit,
  handleChange,
  values,
  setValues,
  categor,
  handlecategoryChange,
  subOptions,
  arrayOfSubs,
  setArrayOfSubs,
  // showSub,
}) {
  // destructure
  const {
    title,
    description,
    price,
    // categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;
  const [selectedvalue, setselectedvalue] = useState([]);

  const test = (value) => {
    setValues({ ...values, subs: value });
    // setselectedvalue([value]);
  };

  const test2 = (event) => {
    handlecategoryChange(event);
    console.log(event.target,"kkkkkkkkkkkkkkkkk")
    setValues({ ...values, subs: [] });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Shipping</label>
        <select
          name="shipping"
          className="form-control"
          onChange={handleChange}
          value={shipping === "Yes" ? "Yes" : "No"}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Color</label>
        <select
          value={color}
          name="color"
          className="form-control"
          onChange={handleChange}
        >
          <option>Please select</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Brand</label>
        <select
          value={brand}
          name="brand"
          className="form-control"
          onChange={handleChange}
        >
          <option>Please select</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      {/* {JSON.stringify(categor)} */}
      <div className="form-group">
        <label>Category</label>
        <select
          name="category"
          className="form-control"
          onChange={(e) => test2(e)}
          value={category}
        >
          {/* <option>{category ? category.name : "Please Select"}</option> */}
          {categor.length > 0 &&
            categor.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      {/* {showSub && (<div>
                <label>Sub Category</label>
                <Select mode="multiple" style={{width:'100%'}} placeholder="Please Select"  name="subs" onChange={value=> setValues({...values,subs:value})}>

                    {subOptions.length && subOptions.map((s)=>(<Option value={s._id} key = {s._id}>{s.name}</Option>))}
                    
                    
                </Select>
            </div> )  } */}

      {/* {showSub && ( */}
      {/* {JSON.stringify(arrayOfSubs)} */}
      <div>
        <label>Sub Category</label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please Select"
          name="subs"
          value={arrayOfSubs}
          onChange={(value) => setArrayOfSubs(value)}
          // value={subs}
        >
          {subOptions.length &&
            subOptions.map((s) => (
              <Option value={s._id} key={s._id}>
                {s.name}
              </Option>
            ))}
        </Select>
      </div>

      <br />
      <button className="btn btn-outline-info">Save</button>
    </form>
  );
}

export default ProductUpdateFrom;
