import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { filmesService } from '../services/api';

function ModalConfirm({ nome, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-title">Apagar Filme?</div>
        <p className="modal-body">
          Tem certeza que deseja apagar <strong>"{nome}"</strong>? Essa ação não pode ser desfeita.
        </p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
          <button className="btn btn-danger" onClick={onConfirm}>Apagar</button>
        </div>
      </div>
    </div>
  );
}

export default function Inicio() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();

  const fetchFilmes = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await filmesService.getAll();
      setFilmes(res.data);
    } catch (err) {
      setError('Não foi possível carregar os filmes. Verifique a URL da API em src/services/api.js');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFilmes(); }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await filmesService.delete(deleteTarget.id);
      setFilmes(prev => prev.filter(f => f.id !== deleteTarget.id));
    } catch {
      setError('Erro ao apagar o filme.');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <main className="main-content">
      <div className="config-notice">
        <strong>⚙️ Configuração:</strong> Edite a URL da API em{' '}
        <code>src/services/api.js</code> ou defina a variável de ambiente{' '}
        <code>REACT_APP_API_URL</code> com a URL do seu MockAPI.
      </div>

      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="page-title">CATÁLOGO <span>DE FILMES</span></h1>
          <p className="page-subtitle">{filmes.length} filme{filmes.length !== 1 ? 's' : ''} cadastrado{filmes.length !== 1 ? 's' : ''}</p>
        </div>
        <Link to="/criar" className="btn btn-primary btn-lg">+ Novo Filme</Link>
      </div>

      {error && <div className="error-msg">{error}</div>}

      {loading ? (
        <div className="loading">
          <div className="loading-spinner" />
          <span>Carregando filmes...</span>
        </div>
      ) : filmes.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: '3rem' }}>🎬</div>
          <p>Nenhum filme cadastrado ainda.</p>
          <Link to="/criar" className="btn btn-primary">Adicionar primeiro filme</Link>
        </div>
      ) : (
        <div className="filmes-grid">
          {filmes.map(filme => (
            <div key={filme.id} className="filme-card">
              <div className="filme-card-genero">{filme.genero}</div>
              <div className="filme-card-nome">{filme.nome}</div>
              <div className="filme-card-ano">📅 {filme.ano}</div>
              <div className="filme-card-actions">
                <Link to={`/filme/${filme.id}`} className="btn btn-secondary btn-sm">Ver</Link>
                <Link to={`/editar/${filme.id}`} className="btn btn-secondary btn-sm">Editar</Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => setDeleteTarget(filme)}
                >
                  Apagar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteTarget && (
        <ModalConfirm
          nome={deleteTarget.nome}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </main>
  );
}
