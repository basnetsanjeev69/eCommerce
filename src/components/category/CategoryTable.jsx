import React, { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addOrUpdateCategoryAction, deleteCategoryAction, getAllCategoriesAction } from '../../redux/category/categoryAction';
import slugify from 'slugify';

function CategoryTable() {
    const dispatch = useDispatch();

    const { categoryList } = useSelector(state => state.category)
    const [selectedCat, setSelectedCat] = useState({});

    const handleOnEdit = (catInfo) => {
        setSelectedCat(catInfo)
    }

    const handleOnUpdate = () => {
        dispatch(addOrUpdateCategoryAction(selectedCat));
        setSelectedCat({})
    }
    const handleOnDelete = () => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteCategoryAction(selectedCat));

        }
    }
    const handleOnChange = (e) => {
        let { name, value, checked } = e.target;
        console.log(name, value, checked)
        if (name === 'status') {
            // setFormData({
            //     ...formData,
            //     [name]: checked
            // })
            value = checked ? 'active' : 'inactive'
        }
        setSelectedCat({
            ...selectedCat,
            [name]: value
        })
    }
    return (
        <div className='mt-2 mx-3'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Status</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categoryList.map((cat, i) => {
                        return (<tr key={cat.slug}>
                            <td>{i + 1}</td>
                            <td>{selectedCat?.slug === cat.slug ?
                                <Form.Check
                                    type="switch"
                                    label="Status"
                                    name="status"
                                    onChange={handleOnChange}
                                    checked={selectedCat?.status === 'active' ? true : false}
                                /> :
                                <span className={`status-${cat.status}`}>{cat.status}</span>}</td>
                            <td>{selectedCat?.slug === cat.slug ?
                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" name="name" placeholder="Category name"
                                        value={selectedCat?.name}
                                        onChange={handleOnChange}
                                    />

                                </Form.Group>
                                : cat.name}</td>
                            <td>{cat.slug}</td>
                            <td>{selectedCat?.slug === cat.slug ?
                                <>
                                    <Button variant='danger' onClick={handleOnDelete}>Delete</Button>
                                    <Button variant='success' onClick={handleOnUpdate}>Save</Button>

                                </>
                                : <Button variant='warning' onClick={() => handleOnEdit(cat)}>Edit</Button>}</td>
                        </tr>)
                    })}

                </tbody>
            </Table>
        </div >
    )
}

export default CategoryTable