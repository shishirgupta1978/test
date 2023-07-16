import React, { useEffect,useState } from "react";
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {Spinner,Title} from "../components";
import {axiosApi} from "..";

export const ActivatePage = () => {
	const { uid, token } = useParams();
	const navigate = useNavigate();
	const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })


	useEffect(() => {

		if (data.is_success) {
			toast.success("Your account has been activated! You can login now");
			navigate("/login");
		}


	}, [data.is_success]);

	const submitHandler = () => {
		const userData = {
			uid,
			token,
		};

		const config = { method: "post", headers: { "Content-Type": "application/json" }, data:userData }
			axiosApi(`/api/auth/users/activation/`, config, setData);
	
		
	};

	return (
		<>
			<Title title="Activate User" />
			<MDBContainer>
				<MDBRow>
					<MDBCol className="mg-top text-center">
						<section>
							<h1>
								<FaCheckCircle /> Activate your account
							</h1>
							<hr className="hr-text" />
						</section>
					</MDBCol>
				</MDBRow>
				{data.is_loading && <Spinner />}
				<MDBRow className="mt-3">
					<MDBCol className="text-center">
						<MDBBtn
							type="submit"
							variant="outline-success"
							size="lg"
							className="mt-3 large-btn"
							onClick={submitHandler}
						>
							Activate
						</MDBBtn>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		</>
	);
};


