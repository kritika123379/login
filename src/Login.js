import React from "react";
import {Formik} from 'formik';
import * as Yup from 'yup';


const Login = () => (
    <Formik
    initialValues={{email:"",password:""}}
    onSubmit={(values,{setSubmitting})=>{
        setTimeout(()=>{
            console.log("Logging in values",values)
        },500);
        localStorage.setItem('email',JSON.stringify(values.email));
        localStorage.setItem('password',JSON.stringify(values.password));
        localStorage.setItem('values',JSON.stringify(values));
    }} 

    //here we will define our validations
    validationSchema={Yup.object().shape({
        email:Yup.string().email().required("Required"),
        password:Yup.string().required("No Password Provided")
        .min(8,"Password should be minimum 8 characters")
        .matches(/(?=.*[0-9])/,"Password should contain a number")
    })}
    >
    {props=>{
        const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit
        }=props;
       
        return(
            <form autoComplete="off" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input 
            type="text" 
            value={values.email} 
            name="email" 
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email && "error"}
            placeholder="Enter your Email"/>
            {errors.email && touched.email && (
                <div>
                <div className="input-feedback">{errors.email}</div>
                </div>
            )}
            <label htmlFor="password">Password</label>
            <input 
            type="password" 
            values={values.password} 
            name="password" 
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password && "error"}
            placeholder="Enter your Password"/>
            {errors.password && touched.password &&(
                <div>
                <div className="input-feedback">{errors.password}</div>
                </div>
            )}
            <button type="submit" disabled={isSubmitting}>Login</button>
            <br/>
            Values stored in local storage<br/>
           values: {localStorage.getItem('values')}<br/>
            email:{localStorage.getItem('email')}<br/>
            password:{localStorage.getItem('password')}<br/>
            </form>
        )
    }

    }
    </Formik>
)
export default Login