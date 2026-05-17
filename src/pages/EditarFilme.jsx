import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { filmesService } from '../services/api';

export default function EditarFilme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: '', genero: '', ano: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await filmesService.getById(id);
        const { nome, genero, ano } = res.data;
        setForm({ nome, genero, ano });
      } catch {
        setError('Filme não encontrado.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nome || !form.genero || !form.ano) {
      setError('Preencha todos os campos.');
      return;
    }
    try {
      setSaving(true);
      setError('');
      await filmesService.update(id, form);
      setSuccess('Filme atualizado com sucesso!');
      setTimeout(() => navigate('/'), 1200);
    } catch {
      setError('Erro ao atualizar o filme.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <main className="main-content">
      <div className="loading"><div className="loading-spinner" /><span>Carregando...</span></div>
    </main>
  );

  return (
    <main className="main-content">
      <Link to="/" className="back-link">← Voltar ao catálogo</Link>

      <div className="page-header">
        <h1 className="page-title">EDITAR <span>FILME</span></h1>
        <p className="page-subtitle">Altere os dados do filme</p>
      </div>

      <div className="form-card">
        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">✓ {success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="nome">Nome</label>
            <input
              id="nome"
              name="nome"
              className="form-input"
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
              value={form.ano}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
            <Link to={`/filme/${id}`} className="btn btn-secondary">Cancelar</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
