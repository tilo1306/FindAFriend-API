# FindAFriend-API

## RFs (Requisitos funcionais)

- [] Deve ser possível cadastrar um pet;
- [] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade;
- [] Deve ser possível filtrar pets por suas características;
- [] Deve ser possível visualizar detalhes de um pet para adoção;
- [] Deve ser possível se cadastrar como uma ORG;
- [] Deve ser possível realizar login como uma ORG;

## RNs (Regras de negócio)

- [] Para listar os pets, obrigatoriamente precisamos informar a cidade;
- [] Uma ORG precisa ter um endereço e um número de WhatsApp;
- [] Um pet deve estar ligado a uma ORG;
- [] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp;
- [] Todos os filtros, além da cidade, são opcionais;
- [] Para uma ORG acessar a aplicação como admin, ela precisa estar logada;



## RFs (Requisitos funcionais)

- [] Deve ser possível cadastrar usuário;
- [] Deve ser possível se autenticar usuário;
- [] Deve ser possível se logar com o Google;
- [] Deve ser possível adicionar um projeto;
- [] Deve ser possível visualizar os proprios projetos;
- [] Deve ser possível visualizar detalhes do projeto;
- [] Deve ser possível editar detalhes do projeto;
- [] Deve ser possível deletar um projeto;
- [] Deve ser possível visualizar os projeto de outras pessoas;

## RNs (Regras de negócio)

- [] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [] A senha cadastrada deve conter no minimo 8 caracteres contendo letras,numeros e caracteres especiais;
- [] O usuário não deve poder cadastrar projeto com o mesmo Titulo;
- [] O usuário não deve poder cadastrar projeto sem imagem,link e titulo;
- [] O usuário não deve poder cadastrar projeto com pelo menos 1 tag;