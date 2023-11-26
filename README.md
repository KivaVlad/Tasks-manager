## `Приложение «Планировщик задач»`	

Необходимо разработать веб-приложение, помогающее пользователям управлять своим временем.

__Основные функции:__

1. Создание новых задач, с указанием следующей информации:
  - название 
  - описание (опционально)
  - срок выполнения (дата и время)

2. Просмотр существующих задач с возможностью сортировки по дате создания или сроку выполнения.

3. Управление задачами:
  - пометка задач как выполненных
  - изменение задачи
  - удаление задачи

4. Уведомления о задачах, срок выполнения которых приближается (например, в браузере или через e-mail).


__Технические требования:__

 - Фронтенд: Pure JavaScript или любой современный фреймворк (React, Vue, Angular и т.д.).

- Хранение данных: используйте хранилище браузера (localStorage, sessionStorage и т.д.).

- Уведомления: для уведомлений в браузере можно использовать Service Workers или сторонние библиотеки. 


__Дополнительно:__

- Аутентификация: возможность регистрации и авторизации пользователей (JWT). Сымитируйте ответ от сервера: вызывайте какой-нибудь метод а-ля makeAuthRequest, возвращающий токены. Далее проверяйте эти токены при каждом действии.


## `Разработка`

Стек: React.js

API: JSON Server


__Основной сценарий работы:__

- Создавать и видеть задачи может только авторизованный пользователь;

- Есть возможность авторизации и регистрации с помощью JSON Server Auth. В ответ приходит access_token;

- После успешной авторизации у пользователя есть возможность создавать/редактировать/удалять задачи. Все задачи хранятся на фейковом тестовом сервере. (файл db.json);

