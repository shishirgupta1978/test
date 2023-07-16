import React from "react";
import { MDBCol,MDBContainer,MDBRow} from "mdb-react-ui-kit";
import { FaHeartBroken, FaSadTear } from "react-icons/fa";

export const NotFound = () => {
	return (
		<MDBContainer>
			<MDBRow>
				<MDBCol className="text-center">
					<h1 className="notfound">404 Not Found</h1>
					<FaHeartBroken className="broken-heart" />
					<FaSadTear className="sad-tear" />
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

