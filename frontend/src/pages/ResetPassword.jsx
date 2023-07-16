import React, { useEffect, useState } from "react";
import {MDBInput,MDBBtn,MDBCol,MDBContainer, MDBRow} from "mdb-react-ui-kit";
import { FaUser } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {Spinner,Title} from "../components";
import { axiosApi } from "..";

export const ResetPassword = () => {
	const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
    const { uid, token } = useParams();
	const [formData, setFormData] = useState({
		uid:uid,
        token:token,
		new_password: '',
		re_new_password: ''
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
			toast.success("Your password has been successfully changed.")
			navigate("/login")
		}

		
	}, [data.is_success]);

	const submitHandler = (e) => {
		e.preventDefault();

		if (formData.new_password !== formData.re_new_password) {
			toast.error("Passwords do not match");
		} else {
		
			const config = { method: "post", headers: { "Content-Type": "application/json" }, data:formData }
			axiosApi(`api/auth/users/reset_password_confirm/`, config, setData);

		}


	};
	return (
		<>
			<Title title="Change Password" />
			<br/>
			<MDBContainer className="bg-white p-4 "  style={{width:'320px',margin:"auto", borderRadius:"15px"}}>				
					
							<h3 className="text-center">
								<FaUser /> Change Password
							</h3>
							<hr className="hr-text" />
	
				{data.is_loading && <Spinner />}
				<MDBRow className="mt-3">
					<MDBCol className="justify-content-center">
						<form onSubmit={submitHandler}>
			

						<MDBInput  label='New Password' type='password' name='new_password' value={formData.new_password} onChange={handleChange} className="mb-3" required/>
							<MDBInput  label='Confirm New Password' type='password' name='re_new_password' value={formData.re_new_password} onChange={handleChange}  className="mb-3" required/>

							
							<MDBBtn
								type="submit"
								color="dark"
								className="mt-3 w-100"
							>
								Update
							</MDBBtn>
						</form>
					</MDBCol>
				</MDBRow>

				
			</MDBContainer>
		</>
	);
};

