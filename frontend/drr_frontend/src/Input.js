import React, { useContext }  from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './AppContext';
import { FormattedMessage } from 'react-intl';

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
  const { unitSystem, formValues, setFormValues, setSessionData } = useContext(AppContext);
  
  const navigate = useNavigate();

  const heightLabel = unitSystem === 'metric' ? 'Height (cm):' : 'Height (in):';
  const weightLabel = unitSystem === 'metric' ? 'Weight (kg):' : 'Weight (lbs):';



  const formik = useFormik({
    initialValues: formValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {

      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

        let height = Number(values.height);
        let weight = Number(values.weight);

        let bloodData = String(values.bloodData)

        // Define the unit system and its corresponding units
        const unitSystemConfig = {
          metric: { height: 'centimeters', weight: 'kilograms' },
          imperial: { height: 'inches', weight: 'pounds' }
        };
        const { height: heightUnit, weight: weightUnit } = unitSystemConfig[unitSystem];

        // Convert height and weight to metric if the unit system is set to imperial
        if (unitSystem === 'imperial') {
          if (heightUnit === 'inches') {
            height = height * 2.54; // Convert inches to centimeters
          }

          if (weightUnit === 'pounds') {
            weight = weight * 0.453592; // Convert pounds to kilograms
          }
        }


        const recommendationResponse = await axios.post(`${backendUrl}/recommendation`, values);

        const recommendation = recommendationResponse.data;
        const message = `Received user information: Age: ${values.age}, Sex: ${values.sex},\n Height: ${values.height}, Weight: ${values.weight}`;
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
  // The new handleSiphoxFill function:
  const handleSiphoxFill = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
      const response = await fetch(`${backendUrl}/api/siphox_blood_data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // any required body content
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const bloodData = await response.text();

      formik.setFieldValue('bloodData', bloodData);
    } catch (error) {
      formik.setFieldError('bloodData', error.message);
    }
  };

  return (
    <div className="container">
      <h1><FormattedMessage id="input.enterdata" /></h1>
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
        {/* // Height input field */}
          <div className="form-group">
            <label htmlFor="height">{heightLabel}</label>
            <div className="input-group">
              <input type="number" className="form-control" id="height" {...formik.getFieldProps('height')} />
              <div className="input-group-append">
                <span className="input-group-text">{formik.values.heightUnit}</span>
              </div>
            </div>
            {formik.touched.height && formik.errors.height ? <div>{formik.errors.height}</div> : null}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
          {/* // Weight input field */}
            <div className="form-group">
              <label htmlFor="weight">{weightLabel}</label>
              <div className="input-group">
                <input type="number" className="form-control" id="weight" {...formik.getFieldProps('weight')} />
                <div className="input-group-append">
                  <span className="input-group-text">{formik.values.weightUnit}</span>
                </div>
              </div>
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
              <button type="button" onClick={handleSiphoxFill}>Siphox Fill</button>
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
