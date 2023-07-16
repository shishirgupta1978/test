import React, { useEffect, useState } from "react";
import {MDBInput,MDBBtn,MDBCol,MDBContainer, MDBRow} from "mdb-react-ui-kit";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {Spinner,Title} from "../components";
import {axiosApi} from "..";

export const ForgetPassword = () => {
	const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
	const [formData, setFormData] = useState({
		email: ''
	  });

	  const handleChange = (event) => {
		setFormData({
		  ...formData,
		  [event.target.name]: event.target.value,
		});
	  };

	const navigate = useNavigate();


	useEffect(() => {
		if(data.is_success)
		{
			toast.success("Password reset mail has been sent on your email id.")
			navigate("/login")
		}
		
	}, [data.is_success]);

	const submitHandler = (e) => {
		e.preventDefault();

		const config = { method: "post", headers: { "Content-Type": "application/json" }, data:formData }
		axiosApi(`/api/auth/users/reset_password/`, config, setData);

		
	};
	return (
		<>
			<Title title="Forget Password" />
			<br/>
			<MDBContainer className="bg-white p-4 "  style={{width:'320px',margin:"auto", borderRadius:"15px"}}>				
					
							<h3 className="text-center">
								<FaUser /> Forget Password
							</h3>
							<hr className="hr-text" />
	
				{data.is_loading && <Spinner />}
				<MDBRow className="mt-3">
					<MDBCol className="justify-content-center">
						<form onSubmit={submitHandler}>
						<MDBInput  label='Email' type='email' name='email' value={formData.email} onChange={handleChange} className="mb-3" required/>

							
							<MDBBtn
								type="submit"
								color="dark"
								className="mt-3 w-100"
							>
								Send Confirmation Email
							</MDBBtn>
						</form>
					</MDBCol>
				</MDBRow>
        <MDBRow className="py-3">
					<MDBCol>
						Back to Login Page? 
						<Link to="/login"> Click Here</Link>
					</MDBCol>
				</MDBRow>

				
			</MDBContainer>
		</>
	);
};

