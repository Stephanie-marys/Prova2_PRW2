import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { filmesService } from '../services/api';

export default function LerFilme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState(null);
  const [loading, setLoading] = useState(true);
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

  if (loading) return (
    <main className="main-content">
      <div className="loading"><div className="loading-spinner" /><span>Carregando...</span></div>
    </main>
  );

  return (
    <main className="main-content">
      <Link to="/" className="back-link">← Voltar ao catálogo</Link>

      <div className="page-header">
        <h1 className="page-title">DETALHES <span>DO FILME</span></h1>
      </div>

      {error ? (
        <div className="error-msg">{error}</div>
      ) : filme && (
        <div className="detail-card">
          <div className="detail-name">{filme.nome}</div>

          <div className="detail-label">Gênero</div>
          <div className="detail-value">{filme.genero}</div>

          <div className="detail-label">Ano</div>
          <div className="detail-value">{filme.ano}</div>

          <div className="detail-label">ID</div>
          <div className="detail-value" style={{ fontSize: '0.85rem', opacity: 0.6 }}>{filme.id}</div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <Link to={`/editar/${filme.id}`} className="btn btn-primary">Editar</Link>
            <Link to="/" className="btn btn-secondary">Voltar</Link>
          </div>
        </div>
      )}
    </main>
  );
}
