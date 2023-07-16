import React,{useState} from 'react'
import { axiosApi } from '../MyContext';
import { toast } from 'react-toastify';
import {MDBInput,MDBBtn,MDBCol,MDBContainer,  MDBRow} from "mdb-react-ui-kit";
import { ViewDocument } from '../components';
import { Spinner } from '../components';

export const ViewPage = () => {

	const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
	const [source1, setSource1] = useState(null);
  const [source2, setSource2] = useState(null);

    const handleSource1Change = (event) => {
      setSource1(event.target.files[0]);
      };
  
     const handleSource2Change = (event) => {
        setSource2(event.target.files[0]);
        };
  
	const submitHandler1 = (e) => {
		e.preventDefault();
    const mformData = new FormData();
    if(source1 )
    {
    mformData.append("source", source1);
    mformData.append("type", "Docx");
    const token=localStorage.getItem("Tokens") ? JSON.parse(localStorage.getItem("Tokens"))?.access :''
			const config = { method: "post", headers: { 'Content-Type': 'multipart/form-data', "Authorization": "Bearer " + token  }, data:mformData }
			axiosApi(`/api/alt-text-generator/upload-document/`, config, setData);
    }
    else{
      toast.error("Error!, Please submit Again.")
    }
	
	};


	const submitHandler2 = (e) => {
		e.preventDefault();
    const mformData = new FormData();
    if(source2 )
    {
    mformData.append("source", source2);
    mformData.append("type", "Image");
    const token=localStorage.getItem("Tokens") ? JSON.parse(localStorage.getItem("Tokens"))?.access :''
			const config = { method: "post", headers: { 'Content-Type': 'multipart/form-data', "Authorization": "Bearer " + token  }, data:mformData }
			axiosApi(`/api/alt-text-generator/upload-document/`, config, setData);
    }
    else{
      toast.error("Error!, Please submit Again.")
    }
	
	};


  



  return (
    <MDBContainer fluid>
      <h3 className="text-center">
								 Alt Text Generator
							</h3>
							<hr className="hr-text" />
              {data.is_loading && <Spinner />}
              <MDBRow className="mt-3">
                <MDBCol size="4">            <form onSubmit={submitHandler1}>
                <h5>Select Docx file</h5>        
                <MDBRow><MDBCol size="8">
      
  <MDBInput name='source1' type="file"  accept=".docx" onChange={handleSource1Change} required /></MDBCol>
  <MDBCol size="4">
  <MDBBtn type="submit">Upload</MDBBtn></MDBCol>
  </MDBRow>
</form>
<form style={{marginTop:'150px'}} onSubmit={submitHandler2}>
<h5>Select Image file</h5>
  <MDBRow><MDBCol size="8">
          
  <MDBInput name='source2' type="file" accept=".gif,.jpg,.jpeg,.png" onChange={handleSource2Change} required/></MDBCol>
  <MDBCol size="4"><MDBBtn type="submit">Upload</MDBBtn></MDBCol>
  </MDBRow>
</form>
</MDBCol><MDBCol size="8">{data.is_success  && <ViewDocument result={data.result} />}</MDBCol>
				</MDBRow>
    </MDBContainer>
  )
}

