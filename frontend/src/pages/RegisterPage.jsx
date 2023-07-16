import React, { useEffect, useState } from "react";
import {MDBInput,MDBBtn,MDBCol,MDBContainer, MDBRow} from "mdb-react-ui-kit";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {Spinner,Title} from "../components";
import {axiosApi} from "..";


export const RegisterPage = () => {
	const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
	const [formData, setFormData] = useState({
		username:'',
		email: '',
		password: '',
		re_password: ''
	  });

	  const handleChange = (event) => {
		setFormData({
		  ...formData,
		  [event.target.name]: event.target.value,
		});
	  };

	const navigate = useNavigate();


	useEffect(() => {
		if (data.is_success) {
					toast.success("An activation email has been sent your email address. Please check your email");
			navigate("/login");
		}

	}, [data.is_success]);

	const submitHandler = (e) => {
		e.preventDefault();

		if (formData.password !== formData.re_password) {
			toast.error("Passwords do not match");
		} else {
			
			const config = { method: "post", headers: { "Content-Type": "application/json" }, data:formData }
			axiosApi(`/api/auth/users/`, config, setData);
	
		}
	};
	return (
		<>
			<Title title="Register" />
			<br/>
			<MDBContainer className="bg-white p-4 "  style={{width:'320px',margin:"auto", borderRadius:"15px"}}>				
					
							<h3 className="text-center">
								<FaUser /> Register
							</h3>
							<hr className="hr-text" />
	
				{data.is_loading && <Spinner />}
				<MDBRow className="mt-3">
					<MDBCol className="justify-content-center">
						<form onSubmit={submitHandler}>
						<MDBInput  label='Username' type='text' name='username' value={formData.username} onChange={handleChange} className="mb-3" required/>

						<MDBInput  label='Email Address' type='email' name='email' value={formData.email} onChange={handleChange} className="mb-3" required/>
							<MDBInput  label='Password' type='password' name='password' value={formData.password} onChange={handleChange}  className="mb-3" required/>
							<MDBInput  label='Confirm Password' type='password' name='re_password' value={formData.re_password} onChange={handleChange}  className="mb-3" required/>

							
							<MDBBtn
								type="submit"
								color="dark"
								className="mt-3 w-100"
							>
								Sign Up
							</MDBBtn>
						</form>
					</MDBCol>
				</MDBRow>

				<MDBRow className="py-3">
					<MDBCol>
						Have an account already? 
						<Link to="/login"> Login</Link>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		</>
	);
};

