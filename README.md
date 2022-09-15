[![Tests for sprint 13]https://github.com/artem-liamichev/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)]https://github.com/artem-liamichev/express-mesto-gha/actions/workflows/tests-13-sprint.yml) 
# Проект Mesto фронтенд + бэкенд


## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

## Описание методов

| Метод  | Роут                 | Описание                                  |
|--------|----------------------|-------------------------------------------|
| GET    | /users               | Возвращает всех пользователей             |
| GET    | /users/:userID       | Возвращает пользователя по идентификатору |
| POST   | /users               | Создает пользователя                      |
| PATCH  | users/me             | Обвляет профиль                           |
| PATCH  | users/me/avatar      | Обновляет аватар                          |
| GET    | /cards               | Возвращает все карточки                   |
| POST   | /cards               | Создает карточку                          |
| DELETE | /cards/:cardId       | удаляет карточку по идентификатору        |
| PUT    | /cards/:cardId/likes | поставить лайк                            |
| DELETE | /cards/:cardId/likes | убрать лайк с карточки                    |
