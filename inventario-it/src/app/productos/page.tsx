"use client";
const API_URL = "https://script.google.com/macros/s/AKfycbxX4iXp6RFIiSYvvfC8z5Ql_8K3CHCkv6KBdbg3UN-dFX9_V1YGTeujLhP4icmyfUNoOA/exec";


import { useState, useEffect } from "react";

type Producto = {
  id: number;
  nombre: string;
  marca: string;
  estado: string;
};

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [estado, setEstado] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [cargado, setCargado] = useState(false);

  // Cargar desde localStorage SOLO en cliente
  useEffect(() => {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      setProductos(data);
      setCargado(true);
    });
}, []);

  // 💾 Guardar cambios
  useEffect(() => {
    if (cargado) {
      localStorage.setItem("productos", JSON.stringify(productos));
    }
  }, [productos, cargado]);

  // ➕ Crear / ✏️ Editar
  const agregarProducto = async () => {
  if (!nombre || !marca || !estado) return;

  const nuevo = {
    id: Date.now(),
    nombre,
    marca,
    estado,
  };

  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(nuevo),
  });

  setProductos([...productos, nuevo]);

  setNombre("");
  setMarca("");
  setEstado("");
};

  // Eliminar
  const eliminarProducto = (id: number) => {
    setProductos(productos.filter((p) => p.id !== id));
  };

  // Editar
  const iniciarEdicion = (producto: Producto) => {
    setNombre(producto.nombre);
    setMarca(producto.marca);
    setEstado(producto.estado);
    setEditandoId(producto.id);
  };

  // Evita hydration error
  if (!cargado) return null;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Inventario IT</h1>

      {/* FORMULARIO */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          placeholder="Marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
        />

        <select
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        style={{ marginLeft: "10px" }}
      >
        <option value="">Selecciona estado</option>
        <option value="Disponible">Disponible</option>
        <option value="Asignado">Asignado</option>
        <option value="En reparación">En reparación</option>
      </select>

        <button onClick={agregarProducto}>
          {editandoId ? "Actualizar" : "Guardar"}
        </button>
      </div>

      {/* TABLA */}
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.marca}</td>
              <td>{producto.estado}</td>
              <td>
                <button onClick={() => iniciarEdicion(producto)}>
                  Editar
                </button>

                <button onClick={() => eliminarProducto(producto.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
