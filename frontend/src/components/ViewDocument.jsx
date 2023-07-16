import React from 'react'

export const ViewDocument = (props) => {
    if(props.result.type==="Docx")
    {
        return (
            <div>
            {props.result.type}
            </div>

        )

    }
    else if(props.result.type==="Image")
    {
        return (
            <div>
                <img height="400px" width="100%" src={import.meta.env.VITE_BASE_URL+props.result.source}/>
                {import.meta.env.VITE_BASE_URL+props.result.source}
            </div>

        )

    }
    else{
        return (
            <div>
            {props.result.type}
            </div>

        )

    }

}

