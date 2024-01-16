import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductAction } from '../../redux/product/productAction';
import { Link } from 'react-router-dom';

function ProductTable() {
  const dispatch = useDispatch();
  const { productList } = useSelector(state => state.product)
  return (
    <div className='mx-3 mt-3'>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((p, i) => {
            return <tr key={p.slug}>
              <td>{i + 1}</td>
              <td><img src={p.thumbnail} width={"100px"} /></td>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.quantity}</td>
              <td>
                <Link to={`/product/edit/${p.slug}`}>
                  <Button variant='warning'>Edit</Button>
                </Link>
                <Button onClick={() => {
                  if (window.confirm("Do you want to delete?")) {
                    dispatch(deleteProductAction(p))
                  }
                }} variant='danger'>Delete</Button>

              </td>
            </tr>
          })}


        </tbody>
      </Table>
    </div>
  )
}

export default ProductTable