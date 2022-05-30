## Projeto Integrador: Digital Booking
> Construímos uma aplicação para aluguel de carros como objeto de avaliação do
> PI (conclusão do primeiro ano do Certified Tech Developer da Digital House).
> Você pode visualizar a aplicação Front-end [_aqui_](https://view.pidigitalbooking.ml)
> | Caso deseje consultar o endpoint da nossa API, clique [_aqui_](https://api.pidigitalbooking.ml/produto)

## Conteúdo
* [Informações](#Informações)
* [Equipe](#equipe)
* [Tecnologias utilizadas](#tecnologias-utilizadas)
* [Funcionalidades](#funcionalidades)
* [Captura de tela](#captura-de-tela)
* [O que podemos melhorar?](#o-que-podemos-melhorar?)

## Informações
> Originalmente a hospedagem deste repositório foi feita utilizando o Gitlab.

## Equipe
> Abaixo você confere a equipe do nosso PI, bem como pelo que ficou responsável cada um de nós.
- [Alan Alves](https://www.linkedin.com/in/alanalvess/) / Testing / Back-end
- [Henrique Tebet](https://www.linkedin.com/in/henrique-tebet-31bb5315b/) / Back-end / Testing
- [Rafael Rodrigues](https://www.linkedin.com/in/rafael--rodrigues/) / Front-end
- [Ronilson Alves](https://linkedin.com/in/ronilsonalves) / Front-end / Back-end / Infra
- [Samuel Xavier](https://www.linkedin.com/in/samuel-xavier-60b757a9/) / Banco de Dados / Back-end
- [Vivian Sanches](https://www.linkedin.com/in/vivian-sanches/) / Front-end

## Tecnologias utilizadas
### Back-end:

- Java com Spring
    - Autenticação com Spring Security
    - API Rest
- MySQL

### Front-end

- React
- Bootstrap
- Saas

### Testing

- Spring Boot Test
- JUnit

### Infra

- Deploy em containers Docker na AWS
- S3 para armazenamento de arquivos estáticos
- Cloudfront consumindo do S3
- Amazon RDS rodando em MySQL

## Funcionalidades

- Cadastro & Login de usuário
- Filtrar produtos por datas, categorias e cidades disponíveis
- Cadastro e consulta de Reserva de produtos
- Painel Administrativo para cadastro de novos produtos

## Captura de tela
![Digital Booking](https://cdn.ronilsonalves.com/sitepessoal/projetos/digitalbooking.png "Digital Booking")

## O que podemos melhorar?
> Destaco aqui pontos de melhoria em nosso projeto

- Back-end
  - Documentar a API usando o Swagger
  - Implementar verificação de usuário [Envio de e-mail de confirmação e só liberar o acesso do usuário após isso]
  - Implementar páginação nos endpoints de consulta da API Rest
- Testing
  - Realizar testes automatizados na aplicação Front-end
- Infra
  - Deploy automático utilizando ferramentas de CI/CD (Terraform, Ansible, Jenkings, por exemplo)
