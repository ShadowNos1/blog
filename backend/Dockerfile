FROM php:8.4-fpm

# Установка системных зависимостей
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    curl

# Очистка кэша
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Установка расширений PHP
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Установка Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# --- ДОБАВЛЕННЫЕ КОМАНДЫ ---

# Копируем содержимое приложения (если оно уже есть)
COPY . .

# Устанавливаем владельца папки /var/www на пользователя www-data (стандарт для веб-сервера)
RUN chown -R www-data:www-data /var/www

# Выставляем права: 755 для папок и 644 для файлов (стандарт безопасности), 
# но для storage и cache разрешаем запись
RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Возвращаем пользователя по умолчанию
USER www-data