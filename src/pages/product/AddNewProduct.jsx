import React, { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Link } from 'react-router-dom'
import { Button, Form, ProgressBar } from 'react-bootstrap'
import CustomInput from '../../components/customInput/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import slugify from 'slugify'
import { addOrUpdateProductAction } from '../../redux/product/productAction'
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../firebase-config/config'
import { toast } from 'react-toastify'
import { handleFileUpload } from '../../utils'

function AddNewProduct() {
    const inputFields = [
        {
            label: "Product Name *",
            name: "name",
            type: "text",
            placeholder: "iPhone 6",
            required: true
        },
        {
            label: "SKU *",
            name: "sku",
            type: "text",
            placeholder: "45363ds",
            required: true
        },
        {
            label: "Price *",
            name: "price",
            type: "number",
            placeholder: "123",
            required: true
        },
        {
            label: "Quantity",
            name: "quantity",
            type: "number",
            placeholder: "422"
        },
        {
            label: "Product Description",
            name: "description",
            type: "text",
            as: "textarea",
            row: 5,
            placeholder: "Description"
        },
    ]

    const { categoryList } = useSelector(state => state.category)

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
    })
    const [progress, setProgress] = useState(0)
    const [files, setFiles] = useState([]);
    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleImageAttachment = (e) => {
        const { files } = e.target;
        setFiles([...files])
    }

    const uploadFiles = async (file) => {
        const storageRef = ref(storage, `image/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        return await getDownloadURL(snapshot.ref)
    }

    // One way to handle on submit with promise and all / NO Progress Bar
    const handleOnSubmit2 = async (e) => {
        e.preventDefault();
        try {
            const slug = slugify(formData.name, {
                lower: true,
                trim: true
            });
            // Before actually updating DB
            // Upload the file to storage , grab the URL
            let fileUrl = [];
            // if (files) {
            //     files.forEach(async file => {
            //         const tempUrl = await uploadFiles(file)
            //         fileUrl.push(tempUrl)
            //     })
            // }
            if (files) {
                const filePromise = files.map(file => uploadFiles(file))
                fileUrl = await Promise.all(filePromise);
            }
            let finalData = { ...formData, slug, images: fileUrl }
            // Then update finalData and push to DB
            dispatch(addOrUpdateProductAction(finalData))
        } catch (e) {
            toast.error(`Something went wrong ${e.message}`)
            console.log(e)
        }

    }


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const slug = slugify(formData.name, {
                lower: true,
                trim: true
            });
            // Before actually updating DB
            // Upload the file to storage , grab the URL
            let fileUrls = [];
            if (files.length > 0) {
                const filePromise = files.map(file => handleFileUpload(file, setProgress))
                // const filePromise = []
                // files.forEach(file => {
                //     const uploadPromise = handleFileUpload(file, setProgress);
                //     filePromise.push(uploadPromise)
                // })
                fileUrls = await Promise.all(filePromise);
            }

            let finalData = { ...formData, slug, images: fileUrls, thumbnail: fileUrls[0] }
            dispatch(addOrUpdateProductAction(finalData))
        } catch (e) {
            toast.error(`Something went wrong ${e.message}`)
            console.log(e)
        }

    }
    return (
        <AdminLayout title="Add New Product">
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
                                return <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                            })}
                        </Form.Select>
                    </Form.Group>
                    {inputFields.map(field => {
                        return <CustomInput key={field.label} {...field} onChange={handleOnChange} />
                    })}

                    <Form.Group className="mb-3">
                        <Form.Control required multiple type="file" accept='image/png, image/jpeg' onChange={handleImageAttachment} />
                        {progress !== 100 ? <ProgressBar animated now={progress} label={`${progress.toFixed(2)}%`} /> : <ProgressBar variant='success' now={100} visuallyHidden />}
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add
                    </Button>

                </Form>


            </div>
        </AdminLayout>
    )
}

export default AddNewProduct