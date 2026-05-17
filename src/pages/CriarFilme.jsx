import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { filmesService } from '../services/api';

export default function CriarFilme() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: '', genero: '', ano: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nome || !form.genero || !form.ano) {
      setError('Preencha todos os campos.');
      return;
    }
    try {
      setLoading(true);
      setError('');
      await filmesService.create(form);
      navigate('/');
    } catch {
      setError('Erro ao criar o filme. Verifique a URL da API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main-content">
      <Link to="/" className="back-link">← Voltar ao catálogo</Link>

      <div className="page-header">
        <h1 className="page-title">NOVO <span>FILME</span></h1>
        <p className="page-subtitle">Adicione um filme ao catálogo</p>
      </div>

      <div className="form-card">
        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="nome">Nome</label>
            <input
              id="nome"
              name="nome"
              className="form-input"
              placeholder="Ex: O Senhor dos Anéis"
              value={form.nome}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="genero">Gênero</label>
            <input
              id="genero"
              name="genero"
              className="form-input"
              placeholder="Ex: Fantasia, Ação, Drama..."
              value={form.genero}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="ano">Ano</label>
            <input
              id="ano"
              name="ano"
              className="form-input"
              placeholder="Ex: 2001"
              value={form.ano}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Salvando...' : 'Criar Filme'}
            </button>
            <Link to="/" className="btn btn-secondary">Cancelar</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
