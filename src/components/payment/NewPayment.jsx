import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import slugify from "slugify";
import { handleFileUpload } from "../../utils";
import { addOrUpdatePaymentAction } from "../../redux/payment/paymentAction";

function NewPayment() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState([]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const slug = slugify(formData.name, {
        lower: true,
        trim: true,
      });
      // Before actually updating DB
      // Upload the file to storage , grab the URL
      let fileUrls = [];
      if (files.length > 0) {
        const filePromise = files.map((file) =>
          handleFileUpload(file, setProgress)
        );
        // const filePromise = []
        // files.forEach(file => {
        //     const uploadPromise = handleFileUpload(file, setProgress);
        //     filePromise.push(uploadPromise)
        // })
        fileUrls = await Promise.all(filePromise);
      }

      let finalData = {
        ...formData,
        slug,
        images: fileUrls,
        thumbnail: fileUrls[0],
      };

      console.log(finalData);
      dispatch(addOrUpdatePaymentAction(finalData));
    } catch (e) {
      toast.error(`Something went wrong ${e.message}`);
      console.log(e);
    }
  };
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };
  const handleImageAttachment = (e) => {
    const { files } = e.target;
    setFiles([...files]);
  };
  return (
    <div className="border py-3 px-2 rounded-1 mx-3 shadow-lg">
      <Form onSubmit={handleOnSubmit}>
        <Row>
          <Col md="3">
            <Form.Group className="mb-3">
              <Form.Control
                required
                type="text"
                name="name"
                placeholder="Payment Option"
                onChange={handleOnChange}
              />
            </Form.Group>
          </Col>
          <Col md="5">
            <Form.Group className="mb-3">
              <Form.Control
                required
                multiple
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageAttachment}
              />
              {/* {progress !== 100 ? (
                <ProgressBar
                  animated
                  now={progress}
                  label={`${progress.toFixed(2)}%`}
                />
              ) : (
                <ProgressBar variant="success" now={100} visuallyHidden />
              )} */}
            </Form.Group>
          </Col>
          <Col md="4">
            <Button type="submit">Add</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default NewPayment;
