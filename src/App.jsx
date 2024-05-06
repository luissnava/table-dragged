import { useEffect, useState } from 'react'
import { DndContext, closestCenter, closestCorners } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import ColumnTable from './components/Columnas'
import { data } from 'autoprefixer'
function App() {

  const [dataTables, setDataTables] = useState(null)

  const [people, setPeople] = useState([
    {
      id: 1,
      column: "Product",
      data: ["Laptop Gamer", "Pc Gamer", "Telefono", "Monitor 32´", "Fuente de poder"]
    },
    {
      id: 2,
      column: "Description",
      data: ["Laptop gamer ryzen 7 G", "Huawei p30 con 250gb", "Pc Gamer con tarjeta Grafica", "Monitor Yeyian de 32 pulgadas", "Fuente corel Master de 700 whats"]
    },
    {
      id: 3,
      column: "Price",
      data: ["10,000", "50,000", "24,000", "5,000", "1,000"]
    },
    {
      id: 4,
      column: "Stock",
      data: ["2", "8", "33", "11", "4"]
    }

  ])

  const loadData = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer ',
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data) {
        // Creamos un objeto para almacenar los datos por categoría de manera temporal
        const categorias = {};

        // Identificar todas las claves únicas en los objetos de datos
        data.forEach((item) => {
          Object.keys(item).forEach(key => {
            if (!categorias[key]) { // Si aún no existe un objeto para esta clave, crearlo
              categorias[key] = {
                id: Object.keys(categorias).length + 1, // asignar un id incremental
                column: key.charAt(0).toUpperCase() + key.slice(1), // Nombre de la columna con mayúscula inicial
                data: []
              };
            }
            categorias[key].data.push(item[key]); // Añadir el dato a la categoría correspondiente
          });
        });

        // Convertimos el objeto categorias en un arreglo de objetos
        const filas = Object.values(categorias);

        const filasFiltradas = filas.filter(fila =>
          !fila.data.some(item => typeof item === 'object')
        );

        // console.log("Filas sin filtro de objetos ->", filas);
        console.log("Filas con filtro de objetos ->", filasFiltradas);

        setDataTables(filasFiltradas)
      }


    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  useEffect(() => {
    loadData();
  }, [])

  // Función para mover las filas

  const handleDragEnd = (event) => {
    const { active, over } = event;
    // console.log("Active", active.id);
    // console.log("Over", over.id);

    const oldIndex = dataTables.findIndex((item) => item.id === active.id)
    const newIndex = dataTables.findIndex(item => item.id == over.id)

    // console.log("Old Index", oldIndex);
    // console.log("New Index", newIndex);
    const newOrderData = arrayMove(dataTables, oldIndex, newIndex)

    setDataTables(newOrderData)

  }


  return (
    <>
      <h1 className='text-2xl font-bold'>Tables and Lists</h1>
      <div className="flex overflow-auto p-4">
        {
          dataTables && dataTables.length > 0 &&
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={dataTables} strategy={horizontalListSortingStrategy}>
              {
                dataTables?.map((item) => (
                  <ColumnTable key={item.id} datos={item} />
                ))
              }
            </SortableContext>
          </DndContext>
        }

      </div>

    </>
  )
}

export default App
