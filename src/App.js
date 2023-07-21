import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Card from './Card';



const supabase = createClient('https://rzjzkpgxxssrobczmvmd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6anprcGd4eHNzcm9iY3ptdm1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1NTUyMjUsImV4cCI6MjAwNTEzMTIyNX0.mq8sC20akniwVzY5deF4VT-Zs0RfTzIWI-2TuIQKhEw');
const current = new Date();
  const data3 = `${current.getFullYear()}/${current.getMonth()+1}/${current.getDate()}`;

console.log(data3)

function App() {
  const [materias, setMaterias] = useState([]);
  const [novaMateria, setNovaMateria] = useState({ titulo: '', conteudo: '', data3});
  

  const handleDeleteMateria = async (id) => {
    const { data, error } = await supabase
      .from('materias')
      .delete()
      .eq('id', id);
  
    if (error) {
      console.log('Erro ao excluir a matéria:', error.message);
      return;
    }
  
    console.log('Matéria excluída com sucesso:', data);
  }

  async function handleNovaMateriaSubmit(event) {
    event.preventDefault();
    const { data, error } = await supabase
      .from('materias')
      .insert(novaMateria);
    if (error) console.log('Erro ao criar nova matéria:', error);
    else {
      setNovaMateria({ titulo: '', conteudo: '' });
      setMaterias([...materias, data[0]]);
    }
  }

  function handleNovaMateriaChange(event) {
    setNovaMateria({
      ...novaMateria,
      [event.target.name]: event.target.value,
    });
  }

  useEffect(() => {
    async function fetchMaterias() {
      // faz a consulta à tabela "materias" do Supabase
      const { data, error } = await supabase.from('materias').select('*');

      if (error) {
        console.log('Erro ao buscar as matérias:', error.message);
      } else {
        setMaterias(data);
      }
    }

    fetchMaterias();
  }, []);
  
  console.log("A")

  return (
  
    <div className="card-container">
      {materias.map(materia => (
        <Card
        title={materia.titulo}
        content={materia.conteudo}
        key={materia.id}
        date={materia.data3}
        onDelete={() => handleDeleteMateria(materia.id)}
      />
      ))}
      <form onSubmit={handleNovaMateriaSubmit}>
        <input
          type="text"
          name="titulo"
          placeholder="matéria"
          value={novaMateria.titulo}
          onChange={handleNovaMateriaChange}
        />
        <textarea
          name="conteudo"
          placeholder="Conteúdo"
          value={novaMateria.conteudo}
          onChange={handleNovaMateriaChange}
        />
        <button type="submit">Adicionar matéria</button>
      </form>
    </div>
    
  );
}

export default App;