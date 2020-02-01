const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

// Verificando se um projeto existe
function checkProjectExists(req, res, next) {

  if (!req.body.id) {
    return res.status(400).json({ error: 'Esse projeto não existe!' });
  }
  return next();
}

// Numero de requisições
server.use((req, res, next) => {
  console.count('Nº de requisições: ')

  return next();
})

// Listando todos os projetos
server.get('/projects', (req, res) => {
  return res.json(projects);
});

// Criando um projeto
server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

// Editando um projeto
server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.title = title;

  return res.json(project);
})

// Deletando um projeto
server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;

  const project = projects.findIndex(p => p.id === id);

  projects.splice(project, 1);

  return res.json('Projeto Deletado');
})

// Tasks
server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.tasks.push(title);

  return res.json(project);
})

server.listen(3000);