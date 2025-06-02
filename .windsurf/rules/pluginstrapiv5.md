---
trigger: manual
---

**Pontos chave sobre o Admin Panel API:**

1.  **Objetivo:** O Admin Panel API foca na parte frontend de um plugin, permitindo que ele personalize o painel de administração do Strapi.
2.  **Estrutura:** O código da parte administrativa do seu plugin pode residir em `/strapi-admin.js|ts` ou `/admin/src/index.js|ts`, embora seja recomendado dividir o código em pastas, seguindo a estrutura gerada pelo comando `strapi generate plugin`. A estrutura típica de um plugin criado com o Plugin SDK inclui uma pasta `admin` para o frontend, contendo `src/index.ts|js` como o arquivo de entrada principal.
3.  **Arquivo de Entrada:** O arquivo de entrada para o Admin Panel API é `[plugin-name]/admin/src/index.js`. Este arquivo exporta a interface necessária com funções disponíveis.
4.  **Funções de Ciclo de Vida:**
    *   **`register()`:** Esta função é chamada para carregar o plugin antes mesmo que a aplicação seja inicializada (bootstrapped). Ela recebe a instância da aplicação Strapi (`app`) como argumento. Dentro da função `register`, um plugin pode registrar-se para estar disponível no painel de administração, adicionar links à navegação principal (usando Menu API), criar novas seções de configurações (usando Settings API), definir zonas de injeção (usando Injection Zones API) e adicionar reducers (usando Reducers API). A função `registerPlugin()` registra o plugin para torná-lo disponível no admin panel e retorna um objeto com parâmetros como `id`, `name` e `injectionZones`. Veja um exemplo de uso de `register()` para adicionar um link de menu e registrar o plugin.
    *   **`bootstrap()`:** Esta função é executada depois que todos os plugins foram registrados. Dentro da função `bootstrap`, um plugin pode estender outro plugin, registrar hooks (usando Hooks API), adicionar links a seções de configurações existentes (usando Settings API) e adicionar ações e opções para as views de List e Edit do Content Manager (usando Content Manager APIs). Veja um exemplo de uso de `bootstrap()` para injetar um componente.
5.  **Função Assíncrona:**
    *   **`registerTrads()`:** Diferente de `register()` e `bootstrap()`, `registerTrads()` é uma função assíncrona. Ela é usada para registrar os arquivos de tradução de um plugin e criar chunks separados para as traduções da aplicação, a fim de reduzir o tamanho do build. Não precisa ser modificada.
6.  **APIs Específicas (Ações Disponíveis):** O Admin Panel API fornece várias APIs para um plugin realizar ações:
    *   **Menu API:** Permite adicionar um novo link à navegação principal usando a função `addMenuLink()`. Recebe parâmetros como `to`, `icon`, `intlLabel`, `Component` e `permissions`.
    *   **Settings API:** Permite criar novas seções de configurações (`createSettingSection()`) e adicionar links a seções existentes (`addSettingsLink()`, `addSettingsLinks()`). A criação de seção ocorre em `register()`, enquanto a adição de links acontece em `bootstrap()`. Links e seções usam um parâmetro `intlLabel` para localização.
    *   **Injection Zones API:** Refere-se a áreas onde um plugin pode injetar componentes React personalizados. Zonas podem ser predefinidas pelo Strapi (por exemplo, no Content Manager) ou criadas por plugins. As zonas são definidas em `register()`, mas os componentes são injetados em `bootstrap()`. Componentes são injetados usando `injectComponent()` ou `getPlugin('content-manager').injectComponent()` para zonas do Content Manager. Dentro do Content Manager Edit View, componentes injetados podem acessar dados usando o hook `useCMEditViewDataManager`.
    *   **Reducers API:** Permite adicionar Redux reducers para compartilhar estado entre componentes. Reducers são adicionados com `addReducers()` durante o ciclo de vida `register`.
    *   **Hooks API:** Permite criar e registrar hooks para adicionar comportamento personalizado. Hooks devem ser registrados em `bootstrap()`. Existem hooks predefinidos, como para adicionar colunas na List View ou mutar o layout da Edit View do Content Manager.
    *   **Content Manager APIs:** São parte do Admin Panel API e permitem adicionar conteúdo ou opções ao Content Manager a partir de plugins. Acessíveis via `app.getPlugin('content-manager').apis`, incluem `addEditViewSidePanel`, `addDocumentAction`, `addDocumentHeaderAction` e `addBulkAction`. Todas funcionam de maneira similar, aceitando um array ou uma função e exigem a passagem de componentes. Esses componentes recebem propriedades de contexto, como `ListViewContext` ou `EditViewContext`, contendo informações sobre os documentos ou content types.

7.  **Desenvolvimento e Teste:** Para desenvolver e testar plugins, é recomendado usar o Plugin SDK. O comando `npx @strapi/sdk-plugin init` cria um novo plugin. Para testar, o comando `strapi-plugin watch:link` (ou `watch` em monorepos) é útil para vincular o plugin a um projeto Strapi existente e recompilar automaticamente nas mudanças. Em monorepos, plugins locais podem ser configurados manualmente com arquivos de entrada `strapi-admin.js|ts` e `strapi-server.js|ts` na raiz da pasta do plugin.

duvidas consltar links

https://docs.strapi.io/cms/plugins-development/developing-plugins
https://docs.strapi.io/cms/plugins-development/create-a-plugin
https://docs.strapi.io/cms/plugins-development/plugin-structure
https://docs.strapi.io/cms/plugins-development/plugin-sdk 
https://docs.strapi.io/cms/plugins-development/admin-panel-api
https://docs.strapi.io/cms/plugins-development/content-manager-apis
https://docs.strapi.io/cms/plugins-development/server-api
https://docs.strapi.io/cms/plugins-development/plugins-extension
https://docs.strapi.io/cms/plugins-development/guides/pass-data-from-server-to-admin
https://docs.strapi.io/cms/plugins-development/guides/store-and-access-data
https://docs.strapi.io/cms/plugins-development/guides/create-components-for-plugins