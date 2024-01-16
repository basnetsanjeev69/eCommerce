import React, { useEffect, useRef, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Form, ProgressBar } from 'react-bootstrap';
import CustomInput from '../../components/customInput/CustomInput';
import slugify from 'slugify';
import { addOrUpdateProductAction } from '../../redux/product/productAction';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify';
import { handleFileUpload } from '../../utils';

function EditProduct() {
    const { slug } = useParams();
    const { productList } = useSelector(state => state.product);
    const { categoryList } = useSelector(state => state.category)
    const imageElemRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    })
    const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState(0)


    useEffect(() => {
        const selectedProduct = productList.find(p => p.slug === slug);
        if (selectedProduct) {
            setFormData(selectedProduct)
        } else {
            navigate("/product")
        }
    }, [slug, productList, navigate])

    const inputFields = [
        {
            label: "Product Name *",
            name: "name",
            type: "text",
            placeholder: "iPhone 6",
            required: true,
            value: formData?.name
        },
        {
            label: "SKU *",
            name: "sku",
            type: "text",
            placeholder: "45363ds",
            required: true,
            value: formData?.sku
        },
        {
            label: "Price *",
            name: "price",
            type: "number",
            placeholder: "123",
            required: true,
            value: formData?.price
        },
        {
            label: "Quantity",
            name: "quantity",
            type: "number",
            placeholder: "422",
            value: formData?.quantity
        },
        {
            label: "Product Description",
            name: "description",
            type: "text",
            as: "textarea",
            row: 5,
            placeholder: "Description",
            value: formData?.description
        },
    ]

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        // If user has uploaded new photos, upload it to Firebase, grab the url then modify the finalData
        let newFileUrl = [];
        if (files.length > 0) {
            const filePromise = files.map(file => handleFileUpload(file, setProgress))
            newFileUrl = await Promise.all(filePromise);
        }
        const finalListOfImages = [...formData?.images, ...newFileUrl];
        const finalData = { ...formData, slug, images: finalListOfImages }
        dispatch(addOrUpdateProductAction(finalData))
        imageElemRef.current.value = '';
    }
    const handleThumbnailChange = (url) => {
        setFormData({ ...formData, thumbnail: url })
    }
    const handleImageAttachment = (e) => {
        const { files } = e.target;
        setFiles([...files])
    }
    const handleImageRemove = (url) => {
        if (url === formData.thumbnail) {
            return toast.error("Thumbnail can't be removed")
        }
        const remainingImages = formData?.images?.filter(img => img !== url);
        setFormData({
            ...formData,
            images: remainingImages
        })
    }
    return (
        <AdminLayout title="Edit Product">
            <Link className='mx-3' to={"/product"}>
                <Button>Go Back</Button>
            </Link>
            <div className='mx-3'>
                <Form onSubmit={handleOnSubmit} className='mt-3 mb-3 border p-4 rounded shadow-lg'>
                    <Form.Group className="mb-3">
                        <Form.Label>Category *</Form.Label>
                        <Form.Select name='categorySlug' required onChange={handleOnChange}>
                            <option>Select Category</option>
                            {categoryList.map(cat => {
                                return <option selected={cat.slug === formData?.categorySlug} key={cat.slug} value={cat.slug}>{cat.name}</option>
                            })}
                        </Form.Select>
                    </Form.Group>
                    {inputFields.map(field => {
                        return <CustomInput key={field.label} {...field} onChange={handleOnChange} />
                    })}
                    <div className='d-flex gap-2 p-1 rounded flex-wrap'>
                        {formData?.images?.map(img => {
                            return <div key={img}>
                                <IoMdClose onClick={() => handleImageRemove(img)} />
                                <div onClick={() => handleThumbnailChange(img)} className={img === formData?.thumbnail ? "bg-info p-1" : ''}> <img src={img} width={"150px"} /></div>

                            </div>
                        })}
                    </div>
                    <Form.Group className="mb-3">
                        <Form.Control ref={imageElemRef} onChange={handleImageAttachment} multiple type="file" accept='image/png, image/jpeg' />
                        {progress !== 100 ? <ProgressBar animated now={progress} label={`${progress.toFixed(2)}%`} /> : <ProgressBar variant='success' now={100} visuallyHidden />}

                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update
                    </Button>

                </Form>


            </div >
        </AdminLayout >
    )
}

export default EditProduct