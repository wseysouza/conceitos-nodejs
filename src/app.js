const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  // solicitação de CONSULTA (request.query) 
  const {title} = request.query;

  const results = title;

  //INCLUDES = VERIFICA SE É verdadeiro ou falso, aqui se o title esta incluido em project.title
  //? repositories.filter(repository => repository.title.includes(title))
  //: repositories;



  return response.json(results);




});

app.post("/repositories", (request, response) => {
  // cria objeto {} , que solicita do corpo, o titulo, URL e techs
  const {title, url, techs} = request.body;

  // variavel repository recebe o objeto 
  const repository = { id: uuid(), 
                        title, 
                        url, 
                        techs, 
                        likes: 0 
                      };
  

  // esta add um novo repository para repositories                    
  repositories.push(repository);

  //retornado em formato de json o novo repository
  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
    const {id} = request.params;

    const {title, url, techs} = request.body;

    const repositoryIndex = repositories.findIndex (repository => repository.id === id);

    if (repositoryIndex < 0){
      return response.status(400).json ({ error: 'repository not found'})
    }

    const repository = {
                        id,
                        title, 
                        url, 
                        techs, 
                        likes
    }

    repositories[repositoryIndex] = repository;

    return response.json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository=> repository.id === id);

  if (repositoryIndex < 0){
    return response.status(400).json ({error: 'repository not found'})
  }

  repositories.splice(repositoryIndex, 1);

    return response.status(204).send ();

});

app.post("/repositories/:id/like", (request, response) => {
  
  // solicitando dos parametros o ID
  const { id } = request.params;

  // vamos encontrar o repositorio (const repository =),
  // FIND= procurar por uma informação dentro do array repositories (repositories.find)
  // (repository=>)vou encontrar aquele que o ID(repository.id) for igual ao o id dos params 

  const repository = repositories.findIndex(repository => repository.id === id);

  if (repository < 0){
      return response.status(400).json ({error:'repository not found'});
  }

  //pegar os likes deste repositorio e somando +1
  repository.likes += 1;

  // retornando o repositorio 
  return response.json (repository)
});

module.exports = app;

