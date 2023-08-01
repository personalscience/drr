import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { AppContext } from '../components/AppContext';
import { FormattedMessage } from 'react-intl';
import { useFormik } from 'formik';


function Input() {
  const router = useRouter();
  const { setSessionData } = useContext(AppContext);

  const [data, setData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: '',
    activity: '',
    bmi: '',
    Blood: '',
    message: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({
      // ...data,
      // [name]: value,
    });
  };


const formik = useFormik({
  initialValues: formValues,
  enableReinitialize: true,
  validationSchema: validationSchema,
  onSubmit: async (values, { setSubmitting }) => {
    // ...
  },
});


  const handleSubmit = async (event) => {
    event.preventDefault();

    // ... here comes the fetching and calculating data part ...

    const newData = {
      ...data,
      message: 'Your data has been submitted successfully!',
      // bmi, blood and other calculated or fetched values
      bmi: 'Your calculated or fetched BMI',
      Blood: 'Your calculated or fetched Blood data',
      recommendation: {
        'AI Response': 'Your calculated or fetched AI response',
      },
    };

    setData(newData);
    setSessionData(newData);

    router.push('/results');
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

}

export default Input;
