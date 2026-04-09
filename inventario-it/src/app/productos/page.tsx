"use client";

import { useState } from "react";

export default function Productos() {
    const [productos, setProductos] = useState([
        { id: 1, nombre: "Laptop Dell", marca:"Dell", estado: "Disponible" },
        { id: 2, nombre: "Mouse Logitech", marca: "Logitech", estado:"Asignado"},
    ]);

    const [nombre, setNombre] = useState("");
    const [marca, setMarca] = useState("");
    const [estado, setEstado] = useState("");

    const agregarProducto = () => {
        if (!nombre || !marca || !estado) {
            alert("Completa todos los campos");
            return;
        }
    
    const nuevoProducto = {
        id: productos.length +1,
        nombre,
        marca,
        estado,
    };

    const eliminarProducto = (id: number) => {
        const nuevosProductos = productos.filter(p=> p.id !== id )
    }
    
    setProductos([...productos, nuevoProducto])

    //Limpiarinputs
    setNombre("");
    setMarca ("");
    setEstado("");
    };



    return (
    <main>
        <h1>Inventario de Productos</h1>
        <h2>Agregar producto</h2>

        <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
        />
        <input
            type="text"
            placeholder="Marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            />
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="">Selecciona estado</option>
            <option value="Disponible">Disponible</option>
            <option value="Asignado">Asignado</option>
            <option value="En reparación">En reparación</option>
        </select>
        <input
            type="text"
            placeholder="Estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
        />
        


        <br />  <br />
        <button onClick ={agregarProducto}>Guardar</button>

        <hr />

        <table border={1} cellPadding={10}>
            <thead>  
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Marca</th>
                    <th>Estado</th>
                </tr>
            </thead>

            <tbody>

                {productos.map((producto) => (
                <tr key={producto.id}>

                    <td>{producto.id}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.marca}</td>
                    <td>{producto.estado}</td>

                </tr>
                ))}

            </tbody>
            
        </table>
        
    </main>
    );
} 