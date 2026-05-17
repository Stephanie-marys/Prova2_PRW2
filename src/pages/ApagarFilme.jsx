import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { filmesService } from '../services/api';

export default function ApagarFilme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await filmesService.getById(id);
        setFilme(res.data);
      } catch {
        setError('Filme não encontrado.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await filmesService.delete(id);
      navigate('/');
    } catch {
      setError('Erro ao apagar o filme.');
      setDeleting(false);
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
        <h1 className="page-title">APAGAR <span>FILME</span></h1>
      </div>

      {error ? (
        <div className="error-msg">{error}</div>
      ) : filme && (
        <div className="form-card">
          <div
            style={{
              border: '1px solid var(--accent2)',
              borderRadius: 'var(--radius)',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              background: 'rgba(201,48,58,0.06)'
            }}
          >
            <div style={{ fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent2)', marginBottom: '0.5rem' }}>
              ⚠ Atenção — esta ação é irreversível
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', letterSpacing: '1px', marginBottom: '0.25rem' }}>
              {filme.nome}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {filme.genero} · {filme.ano}
            </div>
          </div>

          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Deseja realmente apagar este filme do catálogo? Não será possível recuperar os dados após a exclusão.
          </p>

          <div className="form-actions">
            <button className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
              {deleting ? 'Apagando...' : 'Confirmar Exclusão'}
            </button>
            <Link to="/" className="btn btn-secondary">Cancelar</Link>
          </div>
        </div>
      )}
    </main>
  );
}
