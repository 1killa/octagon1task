# Как загрузить проект на GitHub (через Git Bash)

## 1. Распакуйте архив
Распакуйте `octagon-server.zip` в удобную папку, например `C:\projects\octagon-server`.

## 2. Откройте Git Bash в этой папке
Зайдите в папку проекта, кликните правой кнопкой → "Git Bash Here".

## 3. Установите зависимости
```bash
npm install
```

## 4. Проверьте, что сервер работает
```bash
npm run dev
```
Откройте в браузере http://localhost:3000/ — должно появиться "Привет, Октагон!".
Остановите сервер: Ctrl + C.

## 5. Создайте репозиторий на GitHub
1. Зайдите на https://github.com → New repository.
2. Название, например: `octagon-server`.
3. Видимость: **Public** (обязательно открытый репозиторий).
4. НЕ добавляйте README, .gitignore или лицензию (они уже есть в проекте) — просто нажмите "Create repository".
5. Скопируйте ссылку вида `https://github.com/ВАШ_ЛОГИН/octagon-server.git`.

## 6. Загрузите проект через Git Bash
В папке проекта по очереди выполните:
```bash
git init
git add .
git commit -m "Initial commit: basic Express server with Nodemon"
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГИН/octagon-server.git
git push -u origin main
```

Если Git Bash попросит логин/пароль — используйте свой GitHub-логин и Personal Access Token (не обычный пароль, GitHub их больше не принимает напрямую).

## 7. Проверьте на GitHub
Зайдите по ссылке репозитория и убедитесь, что:
- папки `node_modules` там НЕТ (она в .gitignore),
- файлы `index.js`, `package.json`, `package-lock.json`, `.gitignore` загружены.

## 8. Пришлите мне ссылку
Когда репозиторий будет готов, пришлите мне ссылку на него — я запишу её в `.txt` файл для сдачи задания.
