import React, { useState, useEffect, useRef } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import "./style.css"
const ColumnTable = ({ datos }) => {
    const [width, setWidth] = useState(250);

    const { attributes, listeners, setNodeRef, transition, transform } = useSortable({
        id: datos.id
    })
    const styleColumn = {
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor: '#fff', // Blanco
        // borderWidth: '1px',
        // borderStyle: 'solid',
        // borderColor: '#dc2626',
        textAlign: 'center',
        borderRadius: '0.4rem',
        boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)', // Sombra
        color: '#000', // Negro
        width: `${width}px`,
        resize: 'horizontal', // Permitir redimensionamiento en ambos sentidos
        overflow: 'auto',
        position: "relative",

    }


    return (
        <div style={styleColumn} className={`bg-white text-center rounded-md shadow-md text-black z-10`}>


            <div>
                <div className={`py-4 ${datos.column ? "bg-white" : ""}`}
                    ref={setNodeRef}
                    {...attributes}
                    {...listeners}>
                    {
                        datos.column
                    }
                </div>
                {
                    datos.data.map((item, index) => (
                        datos.column == "Image" ? <div key={index} className='w-full border' style={index % 2 === 0 ? { background: "#F6F8F9" } : { background: "#F0F0F0" }}>
                            <img key={index} width={40} src={item} alt={item} className='mx-auto' />
                        </div> :
                            <div key={index} className='w-full py-4 px-4 divTruncado' style={index % 2 === 0 ? { background: "#F6F8F9" } : { background: "#F0F0F0" }}>
                                {item}
                            </div>
                    ))
                }
            </div>


        </div>
    )
}

export default ColumnTable
