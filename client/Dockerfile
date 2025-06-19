# # שלב 1: נשתמש רק אם אין dist מוכן
# FROM node:18 AS build

# WORKDIR /app

# # העתקת קבצי package
# COPY package*.json ./

# # התקנת תלויות - כולל הכל כדי להימנע מבאגים
# RUN npm install

# # העתקת שאר קבצי הפרויקט
# COPY . .

# # רק אם dist לא קיים, נבנה
# RUN [ -d dist ] || npm run build


# # שלב 2: nginx
# FROM nginx:alpine

# # אם היה שלב בנייה – נשתמש בתוצאה שלו, ואם לא – פשוט ניקח את מה שקיים בפרויקט
# COPY --from=build /app/dist /usr/share/nginx/html

# # הוספת קובץ קונפיגורציה מותאם אישית (לא חובה)
# # COPY nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

# שלב בנייה
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm cache clean --force
RUN npm config set strict-ssl false
RUN apt-get update && apt-get install -y ca-certificates
RUN update-ca-certificates
RUN npm install
COPY . .
RUN npm run build

# שלב הפצה
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
