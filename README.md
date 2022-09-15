[![Tests](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд



## Настройка бейджей статуса тестов
Перед началом работы над проектом рекомендуется исправить бейджи, отражающие статус прохождения тестов.
Для этого замените разметку бейджей на следующий фрагмент, подставив вместо `${имя_пользователя}` и `${имя_репозитория}` соответствующие значения.

```
[![Tests for sprint 13](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-13-sprint.yml) 

[![Tests for sprint 14](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-14-sprint.yml)
```


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
