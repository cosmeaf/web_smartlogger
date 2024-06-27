# Passo a Passo para Clonar Projeto ReactJS na Pasta `/var/www/`

## Pré-requisitos

- Acesso ao terminal do seu servidor ou máquina local
- Permissões de administrador para criar e modificar a pasta `/var/www/`
- Git instalado
- Node.js e npm instalados

## Passos

### 1. Acesse o Terminal

Abra o terminal no seu servidor ou máquina local.

### 2. Navegue até a Pasta `/var/www/`

Você precisará de permissões de administrador para acessar e modificar esta pasta. Use o comando `cd` para navegar até a pasta `/var/www/`.

```bash
cd /var/www/
```

### 3. Clone o Repositório do GitHub

Clone o repositório do projeto ReactJS usando o comando `git clone`. Isso copiará todos os arquivos do repositório para a pasta `/var/www/`.

```bash
sudo git clone https://github.com/cosmeaf/web_smartlogger.git
```

### 4. Navegue até a Pasta do Projeto Clonado

Após clonar o repositório, entre na pasta do projeto clonado.

```bash
cd web_smartlogger
```

### 5. Instale as Dependências

Use o `npm` para instalar todas as dependências necessárias do projeto.

```bash
sudo npm install
```

### 6. Inicie o Projeto

Após instalar todas as dependências, você pode iniciar o projeto ReactJS.

```bash
sudo npm start
```

### 7. Acesse o Projeto no Navegador

Abra seu navegador e acesse `http://localhost:3000` (ou a porta configurada para o projeto) para ver o projeto em execução.

### Conclusão

Agora você tem o projeto ReactJS clonado e em execução na pasta `/var/www/`. Você pode modificar o código conforme necessário e o projeto estará disponível através do seu servidor web.
