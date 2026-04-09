import Link from 'next/link';

export default function Home() {
  return (
    <main> 
      <h1>Sistema de Inventario IT</h1>
      <p>Bienvenido 👋</p>

      <Link href="/productos">Ir a Productos</Link>
      
    </main>
  );
}