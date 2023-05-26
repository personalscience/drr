import React, { useContext }  from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './AppContext';

const validationSchema = yup.object({
  age: yup.number().required("Age is required"),
  sex: yup.string().required("Sex is required"),
  height: yup.number().required("Height is required"),
  weight: yup.number().required("Weight is required"),
  bloodData: yup.string().required("Blood Data is required"),
  familyHistoryData: yup.string().required("Family History Data is required"),
  exerciseData: yup.string().required("Exercise is required"),
});

const Input = () => {
  const { formValues, setFormValues, setSessionData } = useContext(AppContext);
  
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: formValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

        const response = await axios.post(`${backendUrl}/api/calculate_bmi`, {
          height: Number(values.height),
          weight: Number(values.weight)
        });


        const recommendationResponse = await axios.post(`${backendUrl}/recommendation`, values);

        const recommendation = recommendationResponse.data;
        const message = `Received user information: Age: ${values.age}, Sex: ${values.sex}, Height: ${values.height}, Weight: ${values.weight}`;
        // Save the calculated BMI and recommendation to the context
        setFormValues(values);
        setSessionData({ message: message, recommendation: recommendation });

        navigate('/results', { state: { message: message, recommendation: recommendation } });
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container">
      <h1>Health Recommendations</h1>
      <form onSubmit={formik.handleSubmit}>
        {/* Rest of your form fields go here, using formik.getFieldProps to bind them */}
        {/* Here's an example for the "age" field: */}
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input type="number" className="form-control" id="age" {...formik.getFieldProps('age')} />
              {formik.touched.age && formik.errors.age ? <div>{formik.errors.age}</div> : null}
            </div>
          </div>
        </div>
        <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="sex">Sex:</label>
            <select
              className="form-control"
              id="sex"
              {...formik.getFieldProps('sex')}
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {formik.touched.sex && formik.errors.sex ? <div>{formik.errors.sex}</div> : null}
          </div>
        </div>
      </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="height">Height (cm):</label>
              <input type="number" className="form-control" id="height" {...formik.getFieldProps('height')} />
              {formik.touched.height && formik.errors.height ? <div>{formik.errors.height}</div> : null}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="weight">Weight (kg):</label>
              <input type="number" className="form-control" id="weight" {...formik.getFieldProps('weight')} />
              {formik.touched.weight && formik.errors.weight ? <div>{formik.errors.weight}</div> : null}
            </div>
          </div>
        </div>
        <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="bloodData">Enter Blood Test Results</label>
            <textarea 
              className="form-control" 
              id="bloodData" 
              rows="2" 
              {...formik.getFieldProps('bloodData')} 
            />
            {formik.touched.bloodData && formik.errors.bloodData ? <div>{formik.errors.bloodData}</div> : null}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="familyHistoryData">Enter Family History</label>
            <textarea 
              className="form-control" 
              id="familyHistoryData" 
              rows="2" 
              {...formik.getFieldProps('familyHistoryData')} 
            />
            {formik.touched.familyHistoryData && formik.errors.familyHistoryData ? <div>{formik.errors.familyHistoryData}</div> : null}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="exerciseData">Enter Exercise</label>
            <textarea 
              className="form-control" 
              id="exerciseData" 
              rows="2" 
              {...formik.getFieldProps('exerciseData')} 
            />
            {formik.touched.exerciseData && formik.errors.exerciseData ? <div>{formik.errors.exerciseData}</div> : null}
          </div>
        </div>
      </div>
        {/* You would repeat a similar structure for the rest of your fields */}
        <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>Submit</button>
      </form>
    </div>
  );
};

export default Input;
